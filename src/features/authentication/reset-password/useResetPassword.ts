import { useNavigate } from 'react-router-dom';
import type { ResetPasswordErrorType } from './reset-password-schema';
import { useMutation } from '@tanstack/react-query';
import resetPasswordAPI from './reset-password-api';
import type { UseFormSetError } from 'react-hook-form';

interface UseResetPasswordProps {
    setError: UseFormSetError<{
        email: string;
    }>;
}

export default function useResetPassword({ setError }: UseResetPasswordProps) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['resetPassword'],
        mutationFn: resetPasswordAPI,
        onError: (error: ResetPasswordErrorType) => {
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
