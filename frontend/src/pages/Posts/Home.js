// src/pages/Home.js

import React, { useEffect } from 'react';
import { useFetchPosts } from '../../services/api';
import useStore from '../../store'; // ストアをimport

const Home = () => {
    const { data: posts, isLoading, isError } = useFetchPosts();
    const flashMessage = useStore(state => state.flashMessage); // フラッシュメッセージを取得
    const setFlashMessage = useStore(state => state.setFlashMessage); // フラッシュメッセージを設定する関数を取得

    useEffect(() => {
        if (flashMessage) { // フラッシュメッセージがある場合、数秒後にクリア
            setTimeout(() => {
                setFlashMessage('');
            }, 3000);
        }
    }, [flashMessage, setFlashMessage]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Posts</h1>
            {flashMessage && <div className="flash-message">{flashMessage}</div>} {/* フラッシュメッセージを表示 */}
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
