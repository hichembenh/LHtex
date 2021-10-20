import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URL
    ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
        console.log(`Mongo connected: ${conn.connection.host}`)
    }catch (e){
        console.error(`Error ${e.message}`)
    }
}

export default connectDB