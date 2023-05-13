// src/pages/Home.js

import React, { useEffect } from 'react';
import { useFetchPosts } from '../../services/api';
import useStore from '../../store';

const Home = () => {
    const currentPage = useStore(state => state.currentPage);
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const totalPages = useStore(state => state.totalPages);
    const setTotalPages = useStore(state => state.setTotalPages);
    const flashMessage = useStore(state => state.flashMessage);
    const setFlashMessage = useStore(state => state.setFlashMessage);
    const { data, isLoading, isError } = useFetchPosts(currentPage);

    useEffect(() => {
        if (flashMessage) {
            setTimeout(() => {
                setFlashMessage('');
            }, 3000);
        }

        if (data) {
            setTotalPages(data.totalPages);
        }
    }, [flashMessage, setFlashMessage, data, setTotalPages]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Posts</h1>
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            {data && data.data.map((post) => (
                <div className='post' key={post.id}>
                    <h2>{post.title}</h2>
                    <div className='post-info'>
                        <img src={"http://localhost:8080/uploads/" + post.image} alt={post.title} />
                        <p>{post.comment}</p>
                    </div>
                </div>
            ))}
            <div className="page-info">
                {currentPage > 1 && <button onClick={handlePrevious}>Previous</button>}
                {currentPage < totalPages && <button onClick={handleNext}>Next</button>}
            </div>
        </div>
    );
};

export default Home;
