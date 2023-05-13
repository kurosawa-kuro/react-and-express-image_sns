// Path: full-stack-basic\react-and-express-image_sns\frontend\src\pages\Register.js

import axios from "axios";
import { useQuery, useMutation } from '@tanstack/react-query';

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

export const registerUser = async ({ name, password, email }) => {
    const { data } = await apiClient.post("/register", { name, password, email });
    return data;
};

export const useRegisterUser = () => {
    return useMutation(registerUser);
};

export const fetchPosts = async (page = 1) => {
    const { data } = await apiClient.get(`/posts?page=${page}`);
    return data;
};

export const useFetchPosts = (page) => {
    return useQuery(['posts', page], () => fetchPosts(page));
};

export const useCreatePost = () => {
    return useMutation(formData => apiClient.post("/posts", formData));
};

export const loginUser = async ({ email, password }) => {
    const { data } = await apiClient.post("/login", { email, password });
    return data;
};

export const useLoginUser = () => {
    return useMutation(loginUser);
};

// ユーザーデータを取得する関数
export const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await apiClient.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
};