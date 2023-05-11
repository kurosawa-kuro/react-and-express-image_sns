// Path: full-stack-basic\react-and-express-image_sns\frontend\src\pages\Register.js

import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

export const createItem = async (name) => {
    try {
        const response = await apiClient.post("/items", { name });
        return response.data;
    } catch (error) {
        console.error("Error creating item:", error);
        throw error;
    }
};

export const fetchItems = async () => {
    console.log("hhhhhhhhhhhhhh fetchItems");
    try {
        const response = await apiClient.get("/items");
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export async function registerUser({ name, password, email }) {
    const response = await apiClient.post('/register', { name, password, email });
    return response.data;
}

export const fetchPosts = async () => {
    try {
        const response = await apiClient.get("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const formData = new FormData();
        for (const key in postData) {
            formData.append(key, postData[key]);
        }
        const response = await apiClient.post("/posts", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};