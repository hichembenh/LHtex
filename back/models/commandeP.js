import mongoose from "mongoose";

const {Schema} = mongoose
const commandePSchema = new Schema({
    id: String,
    reference: {
        type: String,
        required: true
    },
    montantTotal: {
        type: Number,
        required: true
    },
    avance: {
        type: Number,
        required: true
    },
    numMondat: {
        type: String
    },
    nomClient: {
        type: String,
        required: true
    },
    adresseClient: {
        type: String,
        required: true
    },
    numTelClient: {
        type: Number,
        required: true
    },

    // 0:Confirmée
    // 1:En cours
    // 2:Envoyée
    // 3:Livré
    // 4:Annulée
    etat: {
        type: Number,
        default:0
    },
    numColis: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    dateLiv: {
        type: Date,
        required: true
    },
    img: {
        type: String
    }
}, {timestamps: true})

const CommandeP = mongoose.model('commandeP', commandePSchema)
export default CommandeP