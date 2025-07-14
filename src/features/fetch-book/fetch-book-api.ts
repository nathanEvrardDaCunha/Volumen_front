import { fetchWithAuth } from '../../utils/auth-fetch';
import {
    FetchBookResponseSchema,
    type FetchBookError,
    type FetchBookFormType,
} from './fetch-book-schema';

export default async function fetchBookAPI(formData: FetchBookFormType) {
    try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/books/`);
        url.searchParams.append('book', formData.query);
        console.log(url);

        const result = await fetchWithAuth(url.toString(), {
            method: 'GET',
        });

        if (!result.ok) {
            let errorData: FetchBookError;
            try {
                errorData = await result.json();
            } catch (parseError) {
                errorData = {
                    name: 'Server Error',
                    cause: `Server responded with status: ${result.status}.`,
                    hint: '',
                    stack: '',
                };
            }
            throw errorData;
        }

        const jsonResponse = await result.json();

        const validatedData = FetchBookResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as FetchBookError;
        } else {
            const networkError: FetchBookError = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
