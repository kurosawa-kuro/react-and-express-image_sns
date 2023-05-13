// Path: backend/src/app/models/postModel.js

import { db } from "../../database/prisma/prismaClient.js";

export const POSTS_PER_PAGE = 3;  // adjust this as needed

export const getPaginatedPosts = async (page) => {
    const posts = await db.post.findMany({
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        orderBy: {
            createdAt: 'desc',  // assuming you have a createdAt field
        },
    });
    return posts;
};

export const getTotalPosts = async () => {
    const totalPosts = await db.post.count();
    return totalPosts;
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
