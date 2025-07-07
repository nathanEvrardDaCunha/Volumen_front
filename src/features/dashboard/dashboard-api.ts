import z from 'zod';
import {
    FetchUserResponseSchema,
    type FetchUserError,
} from './dashboard-schema';
import { fetchWithAuth } from '../../utils/auth-fetch';

export default async function fetchUserAPI() {
    try {
        const result = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/users/`,
            {
                method: 'GET',
                credentials: 'include',
            }
        );

        if (!result.ok) {
            let errorData: FetchUserError;
            try {
                errorData = await result.json();
            } catch (parseError) {
                errorData = {
                    name: 'Server Error',
                    cause: `Server responded with status: ${result.status}.`,
                    hint: 'Could not parse error response from server.',
                    stack: '',
                };
            }
            throw errorData;
        }

        const jsonResponse = await result.json();

        const validatedData = FetchUserResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (error instanceof z.ZodError) {
            const zodError: FetchUserError = {
                name: 'Data Validation Error',
                cause: 'The data received from the server does not match the expected format.',
                hint: `Validation details: ${error.errors
                    .map((err) => `${err.path.join('.')}: ${err.message}`)
                    .join(', ')}`,
                stack: error.stack || '',
            };
            throw zodError;
        } else if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as FetchUserError;
        } else {
            const networkError: FetchUserError = {
                name: 'Network Error',
                cause: 'Could not connect to the server or an unexpected error occurred.',
                hint: 'Try checking your network connection or contact support.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
