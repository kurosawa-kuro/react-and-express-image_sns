// src/hooks/useLoginUser.js
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/api';

export const useLoginUser = () => {
    return useMutation(loginUser);
};