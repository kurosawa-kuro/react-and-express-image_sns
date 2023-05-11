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

export const fetchPosts = async () => {
    const { data } = await apiClient.get("/posts");
    return data;
};

export const useFetchPosts = () => {
    return useQuery(['posts'], fetchPosts);
};

export const useCreatePost = () => {
    return useMutation(formData => apiClient.post("/posts", formData));
};