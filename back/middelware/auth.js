import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

const auth = asyncHandler(async (req, res, next) => {
    // console.log(req.headers)
    // next()

    let token

    if (req.headers) {
        try {
            token = req.headers['authorization'].split(' ')[1];
            // token && console.log(token)
            const isCostumAuth = token.length <= 500;
            let decodeData
            if (token && isCostumAuth) {
                decodeData = jwt.verify(token, process.env.TOKEN)
                req.userId = decodeData?.id;
            } else {
                decodeData = jwt.decode(token);
                req.userId = decodeData?.sub;
            }
            next()
        } catch (error) {
            console.log(error);
        }
    }
    if (!req.headers.authorization) {
        res.status(401)
        throw new Error('Not authorized')
    }

})
export default auth;