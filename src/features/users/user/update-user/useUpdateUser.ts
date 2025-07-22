import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { UpdateUserErrorType } from './update-user-schema';
import type { UseFormSetError } from 'react-hook-form';
import updateUserAPI from './update-user-api';

interface UseUpdateUserProps {
    setError: UseFormSetError<{
        username?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        bio?: string | undefined;
    }>;
}

export default function useUpdateUser({ setError }: UseUpdateUserProps) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['updateUser'],
        mutationFn: updateUserAPI,
        onError: (error: UpdateUserErrorType) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            navigate('/dashboard/home');
        },
    });

    return mutation;
}
