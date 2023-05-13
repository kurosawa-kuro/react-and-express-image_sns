// src/hooks/useFetchPosts.js
import { useQuery } from '@tanstack/react-query';
import useUserAuthentication from './useUserAuthentication';
import usePagination from './usePagination';
import { fetchPosts } from '../services/api';

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
