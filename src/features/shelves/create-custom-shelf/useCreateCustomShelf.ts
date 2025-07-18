import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import type { CreateCustomShelfError } from './create-custom-shelf-schema';
import createCustomShelfAPI from './create-custom-shelf-api';

interface UseCreateCustomShelfProps {
    setError: UseFormSetError<{
        name: string;
    }>;
}

export default function useCreateCustomShelf({
    setError,
}: UseCreateCustomShelfProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['createCustomShelf'],
        mutationFn: createCustomShelfAPI,
        onError: (error: CreateCustomShelfError) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            // Create a modal "success" message ?
            queryClient.invalidateQueries({ queryKey: ['fetchShelves'] });
        },
    });

    return mutation;
}
