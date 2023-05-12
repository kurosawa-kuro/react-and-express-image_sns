// src/pages/Home.js

import React from 'react';
import { useFetchPosts } from '../../services/api';

const Home = () => {
    const { data: posts, isLoading, isError } = useFetchPosts();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div className='post' key={post.id}>
                    <h2>{post.title}</h2>
                    <div className='post-info'>
                        <img src={"http://localhost:8080/uploads/" + post.image} alt={post.title} />
                        <p>{post.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
