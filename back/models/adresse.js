import mongoose from "mongoose";

const {Schema} = mongoose

const adresseSchema = new Schema({
    type: {
        type: String
    },
    properties: {
        state: {
            type: String
        },
        C_DELEG: {
            type: Number
        },
        C_GOUV: {
            type: Number
        },
        NAME_EN: {
            type: String
        },
        chairs: {
            type: String
        },
        area: {
            type: String
        },
        NAME_EN_AR: {
            type: String
        },
        POP: {
            type: Number
        },
        gouv_name: {
            type: String
        },
        gouv_name_ar: {
            type: String
        }
    },
    geometry: {
        type: {
            type: String
        },
        coordinates: {
            type: Array
        }
    }
})

const Adresse = mongoose.model('adresse', adresseSchema)
export default Adresse