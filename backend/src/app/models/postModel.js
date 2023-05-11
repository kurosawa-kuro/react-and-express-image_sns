// Path: backend/src/app/models/postModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const getAllPosts = async () => {
    const posts = await db.post.findMany();
    return posts;
};

export const createNewPost = async (postData) => {
    const newPost = await db.post.create({
        data: {
            ...postData,
            userId: parseInt(postData.userId),
        }
    });
    return newPost;
};
