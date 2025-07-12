import { fetchWithAuth } from '../../../utils/auth-fetch';
import {
    UpdateAvatarResponseSchema,
    type UpdateAvatarError,
    type UpdateAvatarType,
} from './update-avatar-schema';

export default async function updateAvatarAPI(formData: UpdateAvatarType) {
    try {
        const result = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/users/avatar`,
            {
                method: 'PATCH',
                body: JSON.stringify(formData),
            }
        );

        if (!result.ok) {
            let errorData: UpdateAvatarError;
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

        const validatedData = UpdateAvatarResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as UpdateAvatarError;
        } else {
            const networkError: UpdateAvatarError = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
