import { useMutation } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { RegisterError } from './register-schema';
import registerUserAPI from './register-api';

interface UseRegisterProps {
    setError: UseFormSetError<{
        email: string;
        password: string;
    }>;
}

export default function useRegister({ setError }: UseRegisterProps) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: registerUserAPI,
        onError: (error: RegisterError) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            navigate('/login');
        },
    });

    return mutation;
}
