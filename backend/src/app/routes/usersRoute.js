// Path: backend/src/app/routes/usersRoute.js

import asyncHandler from "express-async-handler";
import { registerUserController, loginUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = (app) => {
    // Register a new user
    app.post("/register", asyncHandler(registerUserController));

    // Login a user
    app.post("/login", asyncHandler(loginUserController));

    // Example of a protected route
    // This route will be accessible only if the user is authenticated
    app.get("/protected", authMiddleware, (req, res) => {
        console.log(req.user);
        res.json({ message: "You are authenticated" });
    });
};

export default userRoutes;
