import mongoose from "mongoose";

const {Schema} = mongoose
const articleSchema = new Schema({
    id: {
        type: String
    },
    nom: {
        type: String
    },
    couleur: {
        type: String
    },
    img: {
        type: String
    },
    prix: {
        type: Number
    },

    specification: [{
        quantite: {type: Number, default: 0},
        taille: {type: String, require: true},
    }],
    description: {
        type: String,
        required: false
    },
    categorie: {
        type: mongoose.Types.ObjectId,
        ref: "categorie"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false
    }
}, {timestamps: true})

const Article = mongoose.model('article', articleSchema)
export default Article