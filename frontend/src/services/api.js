// Path: full-stack-basic\react-and-express-image_sns\frontend\src\pages\Register.js

import axios from "axios";
import { useMutation } from '@tanstack/react-query';

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

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

export const useCreatePost = () => {
    return useMutation(formData => apiClient.post("/posts", formData));
};