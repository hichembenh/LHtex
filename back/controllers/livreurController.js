import Livreur from "../models/livreur.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addLivreur =async (req,res)=>{
    try{
        const newLivreur = new Livreur(req.body)
        newLivreur.password = await bcrypt.hash(newLivreur.password,12)
        await newLivreur.save()
        res.status(201).json(newLivreur)
    }catch (e) {
        console.log(e.message)
        console.log('creating livreur failed')
    }
}
export const loginLivreur = async (req, res) => {
    const {emailLivreur, password} = req.body;
    try {
        const oldLivreur = await Livreur.findOne({emailLivreur});

        if (!oldLivreur) return res.status(404).json({message: "Livreur doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, oldLivreur.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: oldLivreur.emailLivreur, id: oldLivreur._id}, process.env.TOKEN, {expiresIn: "1h"});

        res.status(200).json({result: oldLivreur, token});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}


export const getLivreurs = async (req,res)=>{
    try{
        const livreurs = await Livreur.find().populate({
            path:'commandes',
            select:'commandeU'
        }).populate({
            path:'commandes',
            select:'commandeP'
        }).populate({
            path:'commandes',
            select:'tentative'
        })
        res.status(200).json(livreurs)
    }catch (e) {
        console.log(e.message)
        console.log('fetching livreurs failed')
    }
}

export const updateLivreur = async (req,res)=>{
    try{
        await Livreur.findByIdAndUpdate(req.body._id,req.body)
        res.json({message:'livreur updated'})
    }catch (e) {
        console.log(e.message)
        console.log('updating Livreur failed')
    }
}

export const deleteLivreur = async (req,res)=>{
    const {id} = req.params
    try{
        await Livreur.findByIdAndDelete(id)
        res.json({message:'Livreur deleted'})
    }catch (e) {
        console.log(e.message)
        console.log('deleting livreur failed')
    }
}