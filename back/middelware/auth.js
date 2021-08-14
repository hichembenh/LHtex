import jwt from 'jsonwebtoken';

const auth = async  (req,res,next)=>{
    try{
        const token = req.headers['authorization'];
        console.log(req)
        const isCostumAuth = token.length <= 500;
        let decodeData
        if (token && isCostumAuth){
            decodeData=jwt.verify(token,process.env.TOKEN)
            req.userId = decodeData?.id;
        }else {
            decodeData=jwt.decode(token);
            req.userId = decodeData?.sub;
        }
        next()
    }catch (error){
        console.log(error);
    }
}
export default auth;