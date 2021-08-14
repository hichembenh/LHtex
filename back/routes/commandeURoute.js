import express from "express";
import {addCommandeU, deleteCommandeU, getCommandeU, updateCommandeU} from "../controllers/commandeUController.js";

const router = express.Router()

router.get('/',getCommandeU)
router.post("/",addCommandeU)
router.delete('/:id',deleteCommandeU)
router.put('/:id',updateCommandeU)

export default router