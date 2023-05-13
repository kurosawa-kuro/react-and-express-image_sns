// src/hooks/useRegisterUser.js
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/api';

export const useRegisterUser = () => {
    return useMutation(registerUser);
};
