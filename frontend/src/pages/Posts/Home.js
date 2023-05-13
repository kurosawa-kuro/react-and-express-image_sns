// src/pages/Home.js

import React, { useEffect } from 'react';
import { useFetchPosts } from '../../services/api';
import useStore from '../../store';

const Home = () => {
    const currentPage = useStore(state => state.currentPage);  // 現在のページを取得
    const setCurrentPage = useStore(state => state.setCurrentPage);  // 現在のページを設定する関数を取得
    const totalPages = useStore(state => state.totalPages);  // 総ページ数を取得
    const setTotalPages = useStore(state => state.setTotalPages);  // 総ページ数を設定する関数を取得
    const { data, isLoading, isError } = useFetchPosts(currentPage);
    const flashMessage = useStore(state => state.flashMessage);
    const setFlashMessage = useStore(state => state.setFlashMessage);

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
        console.log("handleNext")
        console.log("currentPage: " + currentPage)
        console.log("totalPages: " + totalPages)
        if (currentPage < totalPages) {
            console.log("currentPage < totalPages")
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
                <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Home;
