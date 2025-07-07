import type { LoginFormType } from '../login/login-schema';
import { RegisterResponseSchema, type RegisterError } from './register-schema';

export default async function registerUserAPI(formData: LoginFormType) {
    try {
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }
        );

        if (!result.ok) {
            let errorData: RegisterError;
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

        const validatedData = RegisterResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as RegisterError;
        } else {
            const networkError: RegisterError = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
