// src/hooks/useFetchPosts.js
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../services/api';

export const useCreatePost = () => {
    return useMutation(createPost);
};