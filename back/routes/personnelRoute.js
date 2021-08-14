import express from "express";
import {addPersonnel, deletePersonnel, getPersonnels, updatePersonnel} from "../controllers/personnelController.js";

const router = express.Router()

router.get('/',getPersonnels)
router.post('/',addPersonnel)
router.put('/:id',updatePersonnel)
router.delete('/:id',deletePersonnel)

export default router