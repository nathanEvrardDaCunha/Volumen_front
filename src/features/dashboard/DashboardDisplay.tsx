import type { UseQueryResult } from '@tanstack/react-query';
import type { FetchUserError } from './dashboard-schema';

interface DashboardDisplayProps {
    query: UseQueryResult<
        {
            success: boolean;
            name: string;
            message: string;
            httpCode: number;
            data: {
                username: string;
                email: string;
                avatar_id: string;
                bio: string | null;
                created_at: string;
            };
        },
        FetchUserError
    >;
}

export function DashboardDisplay({ query }: DashboardDisplayProps) {
    return (
        <>
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
                    {query.error.hint && <p>Hint: {query.error.hint}</p>}
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
        </>
    );
}
