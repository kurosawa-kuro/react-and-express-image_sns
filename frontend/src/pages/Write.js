// Path: frontend/src/pages/Write.js

import React, { useState } from 'react';
import { useCreatePost } from '../services/api';

const Write = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState('');
    const createPost = useCreatePost();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('comment', comment);

        // userIdはログインシステムに基づいて変更してください
        formData.append('userId', 1);
        createPost.mutate(formData, {
            onSuccess: () => {
                // 投稿が成功したらホーム画面にリダイレクト
                window.location.replace("/");
            },
            onError: () => {
                console.error("Post creation failed");
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Write;
