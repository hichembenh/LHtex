import express from "express";
import Categorie from "../models/categorie.js";

const router = express.Router()

export const getCategories = async (req,res)=>{
    try{
        const categories = await Categorie.find().populate('articles')
        res.status(200).json(categories)
    }catch (e){
        console.log(e.message)
        console.log('fetching categories failed')
    }
}

export const addCategories = async (req,res)=>{
    try {
        const categorie = new Categorie(req.body)
        await categorie.save()
        res.status(201).json(categorie)
    }catch (e) {
        console.log(e.message)
        console.log('creating categorie failed')
    }
}

export default router