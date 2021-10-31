import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";

import userRoutes from './routes/userRoute.js'
import articleRoute from "./routes/articleRoute.js";
import categorieRoute from "./routes/categorieRoute.js";
import commandeURoute from "./routes/commandeURoute.js"
import commandePRoute from "./routes/commandePRoute.js"
import personnelRoute from "./routes/personnelRoute.js";
import livreurRoute from "./routes/livreurRoute.js";
import authRoute from  './routes/authRoute.js'
import auth from "./middelware/auth.js";

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/',authRoute)
app.use('/user',userRoutes)
app.use('/articles',auth,articleRoute)
app.use('/categories',auth,categorieRoute)
app.use('/commandeU',auth,commandeURoute)
app.use('/commandeP',auth,commandePRoute)
app.use('/personnel',auth,personnelRoute)
app.use('/livreur',auth,livreurRoute)


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
