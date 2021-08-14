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
import auth from "./middelware/auth.js";
import personnelRoute from "./routes/personnelRoute.js";


dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/',userRoutes)
app.use('/articles',articleRoute)
app.use('/categories',categorieRoute)
app.use('/commandeU',commandeURoute)
app.use('/commandeP',commandePRoute)
app.use('/personnel',personnelRoute)


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
