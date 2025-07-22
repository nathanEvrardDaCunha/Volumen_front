import { useMutation } from '@tanstack/react-query';
import type { LoginErrorType, LoginResponseType } from './login-schema';
import { useNavigate } from 'react-router-dom';
import type { UseFormSetError } from 'react-hook-form';
import loginUserAPI from './login-api';

interface UseLoginProps {
    setError: UseFormSetError<{
        email: string;
        password: string;
    }>;
}

export default function useLogin({ setError }: UseLoginProps) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUserAPI,
        onError: (error: LoginErrorType) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: (response: LoginResponseType) => {
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
