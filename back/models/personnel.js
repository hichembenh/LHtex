import mongoose from "mongoose";

const {Schema} = mongoose
const personnelSchema = new Schema({
    id: {type: Number},
    nomPersonnel: {
        type: String,
        required: true
    },
    numTelPersonnel: {
        type: Number,
        required: true
    },
    adressePersonnel: {
        type: String,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    salaire: {
        type: Number,
        required: false
    },
    img:{
        type:String,
        required:false
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps: true})
const Personnel = mongoose.model('personnel',personnelSchema)
export default Personnel