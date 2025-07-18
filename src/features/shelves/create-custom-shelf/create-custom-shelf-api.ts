import { fetchWithAuth } from '../../../utils/auth-fetch';
import {
    CreateCustomShelfResponseSchema,
    type CreateCustomShelfError,
    type CreateCustomShelfFormType,
} from './create-custom-shelf-schema';

export default async function createCustomShelfAPI(
    formData: CreateCustomShelfFormType
) {
    try {
        const result = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/shelves/`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
            }
        );

        if (!result.ok) {
            let errorData: CreateCustomShelfError;
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

        const validatedData =
            CreateCustomShelfResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as CreateCustomShelfError;
        } else {
            const networkError: CreateCustomShelfError = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
