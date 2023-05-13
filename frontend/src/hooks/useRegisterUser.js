// src/hooks/useRegisterUser.js
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useRegisterUser = (setUser, setName, setEmail, setPassword, setError, setFlashMessage) => {
    const navigate = useNavigate();

    const registerUserMutation = useMutation(registerUser, {
        onSuccess: (data) => {
            if (data.user && data.user.name) {
                setUser({ name: data.user.name, email: data.user.email });
                localStorage.setItem('user', JSON.stringify({ name: data.user.name, email: data.user.email }));
            }
            setName('');
            setEmail('');
            setPassword('');
            setError('');
            setFlashMessage('Logged in successfully!');
            localStorage.setItem('token', data.token);
            navigate('/');
        },
        onError: (error) => {
            setError(error.response ? error.response.data.error : 'Registration failed');
        },
    });

    return registerUserMutation;
};
