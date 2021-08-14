import express from "express";
import {addCategories, getCategories} from "../controllers/categorieController.js";

const router = express.Router()

router.get('/',getCategories)
router.post('/',addCategories)

export default router