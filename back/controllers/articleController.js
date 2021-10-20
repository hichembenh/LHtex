import express from "express";
import Article from "../models/article.js";

const router = express.Router()

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('categorie')
        res.status(200).json(articles)
    } catch (e) {
        console.log(e.message)
        console.log('fetching articles failed')
    }
}

export const addArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body)
        await newArticle.save()
        res.status(201).json(newArticle)
    } catch (e) {
        console.log(e.message)
        console.log('creating article failed')
    }
}

export const deleteArticle = async (req, res) => {
    const {id} = req.params
    try {
        await Article.findOneAndDelete(id)
        console.log('Article deleted')
        res.json({message: "article deleted"})
    } catch (e) {
        console.log(e.message)
        console.log('deleting article failed')
    }
}

export const updateArticle = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        await Article.findByIdAndUpdate(id,req.body)
        res.json({message: 'article updated'})
    } catch (e) {
        console.log(e.message)
        console.log('updating article failed')
    }
}

export default router