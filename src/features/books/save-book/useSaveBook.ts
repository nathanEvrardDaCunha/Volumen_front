import { useMutation } from '@tanstack/react-query';
import saveBookAPI from './save-book-api';
import type { SaveBookErrorType } from './save-book-schema';

export default function useSaveBook() {
    const mutation = useMutation({
        mutationKey: ['saveBook'],
        mutationFn: saveBookAPI,
        onError: (error: SaveBookErrorType) => {
            // Create a "modal error message" for everything other than in-form-validation
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            // Create a "modal error message" for everything other than in-form-validation
        },
    });

    return mutation;
}
