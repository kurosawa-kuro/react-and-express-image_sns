// Path: frontend/src/pages/Write.js

import React, { useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost';
import useUserAuthentication from '../../hooks/useUserAuthentication';

const Write = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useUserAuthentication();
    const createPost = useCreatePost(setTitle, setImage, setComment, setError);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('comment', comment);

        // userIdはログインシステムに基づいて変更してください
        formData.append('userId', 1);

        createPost.mutate(formData);
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
