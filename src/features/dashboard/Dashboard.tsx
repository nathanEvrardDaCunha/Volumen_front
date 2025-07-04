import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import z from 'zod';

export const UserSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    avatar_id: z.string().min(5),
    bio: z.string().nullable(),
    created_at: z.string(),
});

const APIResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: UserSchema,
});

type APIResponse = z.infer<typeof APIResponseSchema>;

type APIError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};

const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

export default function Dashboard() {
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const query = useQuery<APIResponse, APIError>({
        queryKey: ['fetchUser', accessToken],
        queryFn: async () => {
            try {
                const result = await fetch(
                    `${import.meta.env.VITE_API_URL}/users/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        credentials: 'include',
                    }
                );

                if (!result.ok) {
                    let errorData: APIError;
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

                const validatedData = APIResponseSchema.parse(jsonResponse);
                return validatedData;
            } catch (error) {
                console.error('Error in fetchUser:', error);

                if (error instanceof z.ZodError) {
                    const zodError: APIError = {
                        name: 'Data Validation Error',
                        cause: 'The data received from the server does not match the expected format.',
                        hint: `Validation details: ${error.errors
                            .map(
                                (err) => `${err.path.join('.')}: ${err.message}`
                            )
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
                    throw error as APIError;
                } else {
                    const networkError: APIError = {
                        name: 'Network Error',
                        cause: 'Could not connect to the server or an unexpected error occurred.',
                        hint: 'Try checking your network connection or contact support.',
                        stack: error instanceof Error ? error.stack || '' : '',
                    };
                    throw networkError;
                }
            }
        },
        enabled: Boolean(accessToken),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return (
        <>
            <header>
                <h3>User Dashboard</h3>
            </header>

            <section>
                <main>
                    {query.isLoading && (
                        <div>
                            <div></div>
                            <h2>Loading User Data...</h2>
                        </div>
                    )}

                    {query.isError && (
                        <div>
                            <h2>Error: {query.error.name}</h2>
                            <p>Cause: {query.error.cause}</p>
                            {query.error.hint && (
                                <p>Hint: {query.error.hint}</p>
                            )}
                        </div>
                    )}

                    {/* Implement feature to display proper predefined avatar */}
                    {query.isSuccess && query.data && (
                        <div>
                            <h2>Welcome, {query.data.data.username}!</h2>
                            <p>
                                Email: <span>{query.data.data.email}</span>
                            </p>
                            {query.data.data.bio && (
                                <p>
                                    Bio: <span>{query.data.data.bio}</span>
                                </p>
                            )}
                            <p>
                                Member since:{' '}
                                {new Date(
                                    query.data.data.created_at
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </main>
            </section>

            <footer>
                <h3>© 2025 Volumen. All rights reserved.</h3>
            </footer>
        </>
    );
}
