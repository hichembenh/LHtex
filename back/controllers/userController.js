import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
    const {
        email, password, firstName, lastName, img, numTel, isCom, isInv, isRH
    } = req.body;

    console.log(req.body)
    try {
        const oldUser = await User.findOne({email});

        if (oldUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, firstName, lastName, img, numTel, isCom, isInv, isRH});

        const token = jwt.sign({email: result.email, id: result._id}, process.env.TOKEN, {expiresIn: 3600});

        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});

        console.log(error.message);
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const oldUser = await User.findOne({email});

        if (!oldUser) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, process.env.TOKEN, {expiresIn: "1h"});

        res.status(200).json({result: oldUser, token});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}
export const logout = async (req, res) => {

}
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, numTel, img, email, password, isCom, isInv, isRH} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {firstName, lastName, numTel, img, email, password: hashedPassword, _id: id, isCom, isInv, isRH}
    console.log(updatedUser)
    console.log('updated')
    try {
        await User.findByIdAndUpdate(id, updatedUser, {new: true});

        res.json(updatedUser);
    } catch (e) {
        console.log(e.message)
        console.log('updating error')
    }
}
export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (e) {
        console.log(e.message)
        console.log('fetching users fail')
    }
}
export const deleteUser = async (req, res) => {
    const {id} = req.params
    console.log(req.params)
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
        await User.findByIdAndDelete(id)
        res.json({message: "User deleted successfully."});
        console.log('user deleted')
    } catch (e) {
        console.log(e.message)
        console.log('deleting user failed')
    }
}