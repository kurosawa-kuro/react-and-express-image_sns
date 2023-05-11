// Path: backend/src/app/controllers/userController.js

import asyncHandler from "express-async-handler";
import { createUser, loginUser, getUserByEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";

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

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const user = await loginUser(email, password);
        if (user) {
            // Generate a JWT
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            // Save the JWT in a cookie
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "Logged in successfully", user: user, token: token });
        } else {
            res.status(400).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
