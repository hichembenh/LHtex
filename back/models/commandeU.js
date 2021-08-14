import mongoose from "mongoose";

const {Schema} = mongoose

const commandeUSchema= new Schema({
    id:String,
    ref:{
        type:String
    },
    prix:{
        type:Number
    },
    nomClient:{
        type:String
    },
    adresseClient:{
        type:String
    },
    numTelClient:{
        type:Number
    },
    // 0:En attente
    // 1:Confirmée
    // 2:Envoyée
    // 3:Livré
    // 4:Annulée
    etat:{
        type:Number,
        default:0
    },
    articles:[{
        article:{
            type:mongoose.Types.ObjectId,
            ref:'article'
        },
        quantite:{
            type:Number
        },
        taille:{
            type:String
        }
    }],
    numColis:{
        type:String,
        default:''
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:false
    }
},{timestamps: true})

const CommandeU = mongoose.model('commandeU',commandeUSchema)
export default CommandeU