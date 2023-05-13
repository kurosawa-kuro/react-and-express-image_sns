// src/hooks/useLoginUser.js
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import useStore from '../../state/store'

export const useLoginUser = (setEmail, setPassword, setError) => {
    const setUser = useStore(state => state.setUser)
    const setFlashMessage = useStore((state) => state.setFlashMessage);
    const navigate = useNavigate();

    return useMutation(loginUser, {
        onSuccess: (data) => {
            if (data.user && data.user.name) {
                setUser({ name: data.user.name, email: setEmail });
                localStorage.setItem('user', JSON.stringify({ name: data.user.name, email: setEmail }));
            }
            setEmail('');
            setPassword('');
            setError('');
            setFlashMessage('Logged in successfully!');
            localStorage.setItem('token', data.token);
            navigate('/');
        },
        onError: (error) => {
            setError(error.response ? error.response.data.error : 'Login failed');
        },
    });
};
