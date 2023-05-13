// src/hooks/useCreatePost.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useCreatePost = (setTitle, setImage, setComment, setError) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation(createPost, {
        onSuccess: () => {
            // Clear form data
            setTitle('');
            setImage(null);
            setComment('');
            setError('');
            queryClient.invalidateQueries(['posts']);
            navigate('/');  // 投稿成功時にホームページへ遷移
        },
        onError: (error) => {
            // サーバーからのエラーメッセージを取り出して設定
            setError(error.response.data.error);
        }
    });
};
