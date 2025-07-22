import { useMutation } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import fetchBookAPI from './fetch-book-api';
import { useNavigate } from 'react-router-dom';
import type {
    FetchBookErrorType,
    FetchBookResponseType,
} from './fetch-book-schema';

interface UseFetchBookProps {
    setError: UseFormSetError<{
        query: string;
    }>;
}

export default function useFetchBook({ setError }: UseFetchBookProps) {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['fetchBook'],
        mutationFn: fetchBookAPI,
        onError: (error: FetchBookErrorType) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: (result: FetchBookResponseType) => {
            navigate('/books', { state: result });
        },
    });

    return mutation;
}
