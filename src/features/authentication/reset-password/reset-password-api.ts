import {
    ResetPasswordResponseSchema,
    type ResetPasswordErrorType,
    type ResetPasswordType,
} from './reset-password-schema';

export default async function resetPasswordAPI(formData: ResetPasswordType) {
    try {
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/reset-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            }
        );

        if (!result.ok) {
            let errorData: ResetPasswordErrorType;
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

        const validatedData = ResetPasswordResponseSchema.parse(jsonResponse);
        return validatedData;
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'name' in error &&
            'cause' in error
        ) {
            throw error as ResetPasswordErrorType;
        } else {
            const networkError: ResetPasswordErrorType = {
                name: 'Network Error',
                cause: 'Could not connect to the server.',
                hint: 'Try checking your network connection.',
                stack: error instanceof Error ? error.stack || '' : '',
            };
            throw networkError;
        }
    }
}
