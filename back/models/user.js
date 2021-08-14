import mongoose from "mongoose";

const {Schema} = mongoose
const userSchema = new Schema({
    id: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    numTel: {type: Number, required: true},
    img: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    isCom: {type: Boolean, default: false},
    isInv: {type: Boolean, default: false},
    isRH: {type: Boolean, default: false},
    commandeU:[{
        type:Schema.Types.ObjectId,
        ref:'commandeU',
        required:false
    }],
    commandeP:[{
        type:Schema.Types.ObjectId,
        ref:'commandeP',
        required:false
    }],
    articles:[{
        type:Schema.Types.ObjectId,
        ref:'article',
        required:false
    }],
    personnels:[{
        type:Schema.Types.ObjectId,
        ref:'personnels',
        required:false
    }]
}, {timestamps: true})

const User = mongoose.model('user', userSchema)
export default User
