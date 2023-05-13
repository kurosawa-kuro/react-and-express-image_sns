// path: full-stack-basic\react-and-express-image_sns\frontend\src\hooks\useApiClient.js

import axios from "axios";

export const getApiClient = () => {
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

    return apiClient;
};
