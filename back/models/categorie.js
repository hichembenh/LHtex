import mongoose from "mongoose";

const {Schema} = mongoose

const categorieSchema = new Schema({
    id:{
        type:String
    },
    titre:{
        type:String,
        required:true
    },
    articles:[{
        type:mongoose.Types.ObjectId,
        ref:"article",
        required:false
    }]
},{timestamps: true})
const Categorie = mongoose.model('categorie',categorieSchema)
export default Categorie