import express from "express";
import CommandeU from "../models/commandeU.js";
import Article from "../models/article.js";

const router = express.Router()

export const getCommandeU = async (req, res) => {
    try {
        const commandes = await CommandeU.find().populate({
            path: 'articles',
            populate: {
                path: 'article'
            }
        }).sort({createdAt: -1})
        res.status(200).json(commandes)
    } catch (e) {
        console.log(e.message)
        console.log('fetching commande unitaired failed')
    }
}

export const addCommandeU = async (req, res) => {
    try {
        console.log(req.body)

        const newCommande = new CommandeU(req.body)
        await newCommande.save()
        res.status(201).json(newCommande)
    } catch (e) {
        console.log(e.message)
        console.log('creating commande unitaire failed')
    }
}

export const deleteCommandeU = async (req, res) => {
    try {
        await CommandeU.deleteOne({_id:req.params.id})
        res.json({message: "commande unitaire deleted"})
    } catch (e) {
        console.log(e.message)
        console.log('deleting commande unitaire failed')
    }
}

export const updateCommandeU = async (req, res) => {
    try {
        const {id}=req.params
        const commande = await CommandeU.findById(id)
        const updatedCommande = new CommandeU(req.body)
        if (commande.etat === 2) {
            if (updatedCommande.etat === 4) {
                updateStock(updatedCommande, 1)
            }
        }
        if (updatedCommande.etat === 2 && commande.etat!==2) {
            updateStock(updatedCommande, 0)
            console.log('stock updated')
        }
        // console.log(updatedCommande.articles)
        await CommandeU.updateOne({_id:id}, updatedCommande)
        res.json({message: 'commande unitaire updated'})
    } catch (e) {
        console.log(e.message)
        console.log('updating commande unitaire failed')
    }
}

const updateStock = (commande, operation) => {
    const articlesCommande = commande.articles
    articlesCommande.map(async article => {
        const updatedArticle = await Article.findById(article.article._id)
        const specifications = updatedArticle.specification.map(spec => spec)
        updatedArticle.specification = specifications.map(spec => {
            if (spec.taille === article.taille) {
                if (operation === 1) {
                    spec.quantite += article.quantite
                }
                if (operation === 0) {
                    spec.quantite -= article.quantite
                }
            }
            return spec
        })
        await Article.findOneAndUpdate({_id: updatedArticle._id}, updatedArticle)
    })
}

export default router