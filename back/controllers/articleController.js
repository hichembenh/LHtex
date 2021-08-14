import express from "express";
import Article from "../models/article.js";
import Categorie from "../models/categorie.js";

const router = express.Router()

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('categorie')
        // const specifications = articles.map(article=>{return article.specification.find(x=>x.taille === "s")})
        // const specifications = articles.map(article=>{return article.specification})
        // res.status(200).json(articles)
        res.status(200).json(articles)
    } catch (e) {
        console.log(e.message)
        console.log('fetching articles failed')
    }
}

export const addArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body)
        console.log(newArticle)
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
        const article = await Article.findById(id)
        await Article.findOneAndDelete(id)
        console.log(id)
        console.log('Article deleted')
        res.json({message: "article deleted"})
    } catch (e) {
        console.log(e.message)
        console.log('deleting article failed')
    }
}

export const updateArticle = async (req, res) => {
    try {
        await Article.findOneAndUpdate(req.params, new Article(req.body))
        console.log('article updated')
        res.json({message: 'article updated'})
    } catch (e) {
        console.log(e.message)
        console.log('updating article failed')
    }
}

export default router