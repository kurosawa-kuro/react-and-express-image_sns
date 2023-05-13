import { getApiClient } from './apiClient';

export const registerUser = async ({ name, password, email }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/register", { name, password, email });
    return data;
};

export const loginUser = async ({ email, password }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/login", { email, password });
    return data;
};

export const fetchUser = async () => {
    const token = localStorage.getItem('token');
    const apiClient = getApiClient();

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

export const createPost = async (formData) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/posts", formData);
    return data;
};

export const fetchPosts = async (page = 1, search = '') => {
    const apiClient = getApiClient();
    const { data } = await apiClient.get(`/posts?page=${page}&search=${search}`);
    return data;
};