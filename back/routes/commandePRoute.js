import express from "express";
import {addCommandeP, deleteCommandeP, getCommandeP, updateCommandeP} from "../controllers/commandePController.js";

const router = express.Router()

router.get('/',getCommandeP)
router.post("/",addCommandeP)
router.delete('/:id',deleteCommandeP)
router.put('/:id',updateCommandeP)

export default router