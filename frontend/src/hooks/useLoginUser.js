// src/hooks/useLoginUser.js
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';// ルーティングライブラリを適切にインポートしてください

export const useLoginUser = (setUser, setEmail, setPassword, setError, setFlashMessage) => {
    const navigate = useNavigate();

    return useMutation(loginUser, {
        onSuccess: (data) => {
            if (data.user && data.user.name) {
                setUser({ name: data.user.name, email: data.email });
                localStorage.setItem('user', JSON.stringify({ name: data.user.name, email: data.email }));
                setEmail('');
                setPassword('');
                setError('');
                setFlashMessage('Logged in successfully!');
                localStorage.setItem('token', data.token);
                navigate('/');
            }
        },
        onError: (error) => {
            setError(error.response ? error.response.data.error : 'Login failed');
        },
    });
};
