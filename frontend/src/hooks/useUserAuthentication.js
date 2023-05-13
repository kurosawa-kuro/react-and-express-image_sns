// src/hooks/useUserAuthentication.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserAuthentication = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
};

export default useUserAuthentication;
