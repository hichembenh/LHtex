import express from "express";
import {addArticle, deleteArticle, getArticles, updateArticle} from "../controllers/articleController.js";

const router = express.Router()

router.get('/',getArticles)
router.post('/',addArticle)
router.delete('/:id',deleteArticle)
router.put('/:id',updateArticle)

export default router