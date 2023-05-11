// Path: backend/src/app/controllers/userController.js

import asyncHandler from "express-async-handler";
import { createUser, getUserByEmail } from "../models/userModel.js";

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, password, email, isAdmin } = req.body;

    if (!name || !password || !email) {
        res.status(400).json({ error: "Name, password, and email are required" });
        return;
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        await createUser({ name, password, email, isAdmin });
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
