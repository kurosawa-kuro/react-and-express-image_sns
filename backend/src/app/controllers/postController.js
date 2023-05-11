// Path: backend/src/app/controllers/postController.js

import asyncHandler from "express-async-handler";
import { getAllPosts, createNewPost } from "../models/postModel.js";

export const getAllPostsController = asyncHandler(async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

export const createNewPostController = asyncHandler(async (req, res) => {

    const newPostData = {
        ...req.body,
        image: req.file.filename
    };
    const newPost = await createNewPost(newPostData);
    res.status(201).json(newPost);
});
