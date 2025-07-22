import { fetchWithAuth } from '../../../../utils/auth-fetch';
import {
    UpdateUserResponseSchema,
    type UpdateUserErrorType,
    type UpdateUserFormType,
} from './update-user-schema';

export default async function updateUserAPI(formData: UpdateUserFormType) {
    try {
        const result = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/users/`,
            {
                method: 'PATCH',
                body: JSON.stringify(formData),
            }
        );

        if (!result.ok) {
            let errorData: UpdateUserErrorType;
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

        const validatedData = UpdateUserResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as UpdateUserErrorType;
        } else {
            const networkError: UpdateUserErrorType = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
