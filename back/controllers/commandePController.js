import express from "express";
import CommandeP from "../models/commandeP.js";
import mongoose from "mongoose";
import User from "../models/user.js";

const router = express.Router()

export const getCommandeP = async (req, res) => {
    try {
        const commandes = await CommandeP.find()
        res.status(200).json(commandes)
    } catch (e) {
        console.log(e.message)
        console.log('fetching commande personnalisee failed')
    }
}

export const addCommandeP = async (req, res) => {
    try {
        const newCommande = new CommandeP(req.body)
        const userId = req.body.creator
        const user = await User.findById(userId)
        await newCommande.save()
        user.commandeP.push()
        await user.save()
        res.status(201).json(newCommande)
        console.log(newCommande)
    } catch (e) {
        console.log(e.message)
        console.log('creating commande personnalisee failed')
    }
}

export const deleteCommandeP = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        await CommandeP.findByIdAndDelete(id)
        res.json({message: "commande personnalisee deleted"})
    } catch (e) {
        console.log(e.message)
        console.log('deleting commande personnalisee failed')
    }
}

export const updateCommandeP = async (req, res) => {
    const {id} = req.params;
    const {
        nomClient,
        adresseClient,
        numTelClient,
        montantTotal,
        avance,
        numMondat,
        numColis,
        etat,
        reference,
        img,
        description
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No commande personnalisee with id: ${id}`);
    const updatedCommandeP = {
        nomClient,
        adresseClient,
        numTelClient,
        montantTotal,
        avance,
        numMondat,
        numColis,
        etat,
        reference,
        img,
        description,
        _id: id
    };
    try {
        await CommandeP.findByIdAndUpdate(id, updatedCommandeP, {new: true});
        res.json({message: 'commande personnalisee updated'})
    } catch (e) {
        console.log(e.message)
        console.log('updating commande personnalisee failed')
    }
}

export default router