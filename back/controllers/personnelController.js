import Personnel from "../models/personnel.js";
import mongoose from "mongoose";

export const getPersonnels = async (req, res) => {
    try {
        const personnels = await Personnel.find()
        res.status(200).json(personnels)
    } catch (e) {
        console.log(e.message)
        console.log('fetching personnel failed')
    }
}

export const addPersonnel = async (req, res) => {
    const newPersonnel = new Personnel(req.body)
    try {
        await newPersonnel.save()
        res.status(201).json(newPersonnel)
        console.log(newPersonnel)
    } catch (e) {
        console.log(e.message)
        console.log('creating personnel failed')
    }
}

export const deletePersonnel = async (req, res) => {
    const {id} = req.params
    try {
        await Personnel.findByIdAndDelete(id)
        res.status(200).json({message: 'personnel deleted'})
    } catch (e) {
        console.log(e.message)
        console.log('deleting personnel failed')
    }
}

export const updatePersonnel = async (req, res) => {
    const {id} = req.params
    const {
        nomPersonnel,
        numTelPersonnel,
        adressePersonnel,
        poste,
        salaire,
    } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No personnel with id: ${id}`);
    const updatedPersonnel = {
        nomPersonnel,
        numTelPersonnel,
        adressePersonnel,
        poste,
        salaire,
        _id: id
    };
    try {
        await Personnel.findByIdAndUpdate(id,updatedPersonnel,{new:true});
        res.status(200).json({message:'personnel updated'})
    }catch (e) {
        console.log(e.message)
        console.log('updating personnel failed')
    }
}