import { fetchWithAuth } from '../../../utils/auth-fetch';
import type { BookType } from '../book-schema';
import {
    SaveBookResponseSchema,
    type SaveBookErrorType,
} from './save-book-schema';

export default async function saveBookAPI(book: BookType) {
    try {
        const result = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/books/`,
            {
                method: 'POST',
                body: JSON.stringify(book),
            }
        );

        if (!result.ok) {
            let errorData: SaveBookErrorType;
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

        const validatedData = SaveBookResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as SaveBookErrorType;
        } else {
            const networkError: SaveBookErrorType = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
