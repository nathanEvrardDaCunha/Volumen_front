import { fetchWithAuth } from '../../../utils/auth-fetch';
import {
    LogoutUserResponseSchema,
    type LogoutUserErrorType,
} from './logout-schema';

export default async function logoutUserAPI() {
    try {
        const result = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/users/logout`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );

        if (!result.ok) {
            let errorData: LogoutUserErrorType;
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

        const validatedData = LogoutUserResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as LogoutUserErrorType;
        } else {
            const networkError: LogoutUserErrorType = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
