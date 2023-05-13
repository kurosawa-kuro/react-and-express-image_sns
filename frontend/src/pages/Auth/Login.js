// Path: frontend/src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../state/store'
import { useLoginUser } from '../../hooks/useLoginUser';
import '../../styles/App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const setUser = useStore(state => state.setUser)
    const setFlashMessage = useStore(state => state.setFlashMessage) // フラッシュメッセージを設定する関数を取得
    const navigate = useNavigate();

    const mutation = useLoginUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill out all fields');
        } else {
            mutation.mutate({ email, password }, {
                onSuccess: (data) => {
                    if (data.user && data.user.name) {
                        setUser({ name: data.user.name, email })
                        // Save user data to localStorage
                        localStorage.setItem('user', JSON.stringify({ name: data.user.name, email }));
                    }
                    setEmail('');
                    setPassword('');
                    setError('');
                    setFlashMessage('Logged in successfully!'); // ログイン成功時にフラッシュメッセージをセット
                    localStorage.setItem('token', data.token);
                    navigate('/');
                },
                onError: (error) => {
                    setError(error.response ? error.response.data.error : 'Login failed');
                }
            });
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={mutation.isLoading}>Submit</button>
            </form>
        </div>
    );
};

export default Login;