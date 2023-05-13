import { useQuery, useMutation } from '@tanstack/react-query';
import useUserAuthentication from '../hooks/useUserAuthentication';
import usePagination from '../hooks/usePagination';
import { getApiClient } from './apiClient';

export const registerUser = async ({ name, password, email }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/register", { name, password, email });
    return data;
};

export const useRegisterUser = () => {
    return useMutation(registerUser);
};

export const fetchPosts = async (page = 1, search = '') => {
    const apiClient = getApiClient();
    const { data } = await apiClient.get(`/posts?page=${page}&search=${search}`);
    return data;
};

export const useFetchPosts = (search) => {
    const isAuthenticated = useUserAuthentication();
    const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();

    const { data, isLoading, isError } = useQuery(['posts', currentPage, search], () => fetchPosts(currentPage, search), {
        enabled: isAuthenticated,
        onSuccess: (data) => {
            setTotalPages(data.totalPages);
        },
    });

    return { data, isLoading, isError, currentPage, setCurrentPage, totalPages };
};

export const useCreatePost = () => {
    const apiClient = getApiClient();
    return useMutation(formData => apiClient.post("/posts", formData));
};

export const loginUser = async ({ email, password }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/login", { email, password });
    return data;
};

export const useLoginUser = () => {
    return useMutation(loginUser);
};

export const fetchUserData = async () => {
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
