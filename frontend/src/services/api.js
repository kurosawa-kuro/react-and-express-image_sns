// Path: full-stack-basic\react-and-express-image_sns\frontend\src\pages\Register.js

import axios from "axios";
import { useQuery, useMutation } from '@tanstack/react-query';
import useUserAuthentication from '../hooks/useUserAuthentication'; // import the hook


const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const registerUser = async ({ name, password, email }) => {
    const { data } = await apiClient.post("/register", { name, password, email });
    return data;
};

export const useRegisterUser = () => {
    return useMutation(registerUser);
};

export const fetchPosts = async (page = 1, search = '') => {
    const { data } = await apiClient.get(`/posts?page=${page}&search=${search}`);
    return data;
};

export const useFetchPosts = (currentPage, search) => { // remove isAuthenticated from parameters
    const isAuthenticated = useUserAuthentication(); // get isAuthenticated inside the hook

    return useQuery(['posts', currentPage, search], () => fetchPosts(currentPage, search), {
        enabled: isAuthenticated,  // ログインしている場合のみフックが動作する
    });
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