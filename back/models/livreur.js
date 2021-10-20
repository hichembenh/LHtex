import mongoose from "mongoose";

const {Schema} = mongoose

const livreurSchema = new Schema({
    id: {type: Number},
    emailLivreur:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },

    nomLivreur: {
        type: String,
        required: true
    },
    numTelLivreur: {
        type: Number,
        required: true
    },
    adresseLivreur: {
        type: String,
        required: true
    },
    img:{
        type:String,
        required:false
    },
    commandes:{
        remarque:String,
        commandeU:{
            type:Schema.Types.ObjectId,
            ref:'commandeU',
            required:false
        },
        commandeP:{
            type:Schema.Types.ObjectId,
            ref:'commandeP',
            required:false
        },
        tentative:[{
            note:String,
            date:Date
        }]

    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps: true})

const Livreur = mongoose.model('livreur', livreurSchema)
export default Livreur