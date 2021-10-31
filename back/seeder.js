import connectDB from "./connectDB.js";
import dotenv from 'dotenv'
import Adresse from "./models/adresse.js";
import {states} from './data/adresses.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        console.log(states)
        await Adresse.insertMany(states)
        console.log('data inserted')
    } catch (e) {
        console.log(e.message)
        console.log('inserting data failed')
    }
}

const destroyData = async () => {
    try{
        await Adresse.deleteMany()
        console.log("data destroyed")
    }catch (e) {
        console.log(e.message)
        console.log('destroying data failed')
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}