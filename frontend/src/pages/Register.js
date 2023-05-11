// Path: frontend/src/pages/Register.js

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const mutation = useMutation(registerUser, {
        onSuccess: () => {
            // Clear form data
            setName('');
            setEmail('');
            setPassword('');
            setError('');
            navigate('/');  // 登録成功時にホームページへ遷移
        },
        onError: (error) => {
            // サーバーからのエラーメッセージを取り出して設定
            setError(error.response.data.error);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill out all fields');
        } else {
            mutation.mutate({ name, email, password });
        }
    };

    return (
        <div className="container">
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
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
            {mutation.isSuccess && <div>User successfully registered!</div>}
        </div>
    );
};

export default Registration;
