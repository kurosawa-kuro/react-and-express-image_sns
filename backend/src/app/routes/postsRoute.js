// Path: backend/src/app/routes/postsRoute.js

import asyncHandler from "express-async-handler";
import upload from "../middlewares/uploadMiddelware.js";
import { getAllPostsController, createNewPostController } from "../controllers/postController.js";

const postRoutes = (app) => {
    // Get all posts
    app.get("/posts", asyncHandler(getAllPostsController));

    // Create a new post
    app.post("/posts", upload.single('image'), asyncHandler(createNewPostController));
};

export default postRoutes;
