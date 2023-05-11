// src/pages/Home.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:8080/posts');
    return data;
};

const Home = () => {
    const { data: posts, isLoading, isError } = useQuery(['posts'], fetchPosts);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <img src={post.image} alt={post.title} />
                    <p>{post.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
