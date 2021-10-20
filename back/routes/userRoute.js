import express from "express";
import {deleteUser, fetchUsers, login, register, updateUser} from "../controllers/userController.js";

const router = express.Router()

router.patch("/:id",updateUser);
router.get("/",fetchUsers);
router.delete("/:id",deleteUser)

export default router