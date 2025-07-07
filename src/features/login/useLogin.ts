import { useMutation } from '@tanstack/react-query';
import { loginUserAPI } from './login-api';
import type { LoginError, LoginResponse } from './login-schema';
import { useNavigate } from 'react-router-dom';
import type { UseFormSetError } from 'react-hook-form';

interface UseLoginProps {
    setError: UseFormSetError<{
        email: string;
        password: string;
    }>;
}

export function useLogin({ setError }: UseLoginProps) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUserAPI,
        onError: (error: LoginError) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: (response: LoginResponse) => {
            if (response && response.data && response.data['accessToken']) {
                localStorage.setItem(
                    'accessToken',
                    response.data['accessToken']
                );
                navigate('/dashboard/home');
            } else {
                console.error(
                    'Login successful, but accessToken not found in the response.',
                    response
                );
            }
        },
    });

    return mutation;
}
