// Path: frontend/src/pages/Write.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCreatePost } from '../services/api';

const Write = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const createPost = useCreatePost();
    const queryClient = useQueryClient();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('comment', comment);

        // userIdはログインシステムに基づいて変更してください
        formData.append('userId', 1);

        createPost.mutate(formData, {
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

    return (
        <div>
            <h1>Write</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={createPost.isLoading}>Submit</button>
            </form>
            {createPost.isSuccess && <div>Post successfully created!</div>}
        </div>
    );
};

export default Write;
