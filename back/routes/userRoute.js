import express from "express";
import {deleteUser, fetchUsers, login, register, updateUser} from "../controllers/userController.js";

const router = express.Router()

router.post("/connexion",login);
router.post("/signup", register);
router.patch("/user/:id",updateUser);
router.get("/user",fetchUsers);
router.delete("/user/:id",deleteUser)

export default router