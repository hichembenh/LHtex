import express from "express";
import {addLivreur, deleteLivreur, getLivreurs, loginLivreur, updateLivreur} from "../controllers/livreurController.js";

const router = express.Router()

router.post("/connexion",loginLivreur);
router.post("/signup", addLivreur);
router.patch("/user/:id",updateLivreur);
router.get("/user",getLivreurs);
router.delete("/user/:id",deleteLivreur)

export default router