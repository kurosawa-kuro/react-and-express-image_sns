// Path: backend/src/app/routes/usersRoute.js

import asyncHandler from "express-async-handler";
import { registerUserController } from "../controllers/userController.js";

const userRoutes = (app) => {
    // Register a new user
    app.post("/register", asyncHandler(registerUserController));
};

export default userRoutes;
