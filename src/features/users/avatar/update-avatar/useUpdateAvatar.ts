import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import updateAvatarAPI from './update-avatar-api';
import type { UpdateAvatarErrorType } from './update-avatar-schema';

interface UseUpdateAvatarProps {
    setError: UseFormSetError<{
        avatar_id: string;
    }>;
}

export default function useUpdateAvatar({ setError }: UseUpdateAvatarProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['updateAvatar'],
        mutationFn: updateAvatarAPI,
        onError: (error: UpdateAvatarErrorType) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchAvatar'] });
        },
    });

    return mutation;
}
