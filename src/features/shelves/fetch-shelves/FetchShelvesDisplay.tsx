import type { UseQueryResult } from '@tanstack/react-query';
import type { FetchShelveErrorType } from './fetch-shelves-schema';

interface FetchShelveDisplayProps {
    query: UseQueryResult<
        {
            name: string;
            message: string;
            success: boolean;
            httpCode: number;
            data: {
                data: {
                    name: string;
                    isPublic: boolean;
                    isCustom: boolean;
                }[];
            };
        },
        FetchShelveErrorType
    >;
}

// Replace all the <div> by relevant <article> or <section>

export default function FetchShelveDisplay({ query }: FetchShelveDisplayProps) {
    function displayShelves() {
        const shelves = query.data?.data;

        if (!shelves || shelves.data.length === 0) {
            return <p>No shelves found.</p>;
        }

        return (
            <article>
                {shelves.data.map((shelf) => (
                    <div key={shelf.name}>
                        <h3>{shelf.name}</h3>
                        <div>
                            <p>
                                Visibility:
                                {shelf.isPublic ? (
                                    <span>Public</span>
                                ) : (
                                    <span>Private</span>
                                )}
                            </p>
                            <p>
                                Type:
                                {shelf.isCustom ? (
                                    <span>Custom</span>
                                ) : (
                                    <span>Standard</span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </article>
        );
    }

    return (
        <>
            {query.isLoading && (
                <div>
                    <div></div>
                    <h2>Loading Shelves Data...</h2>
                </div>
            )}

            {query.isError && (
                <div>
                    <h2>Error: {query.error.name}</h2>
                    <p>Cause: {query.error.cause}</p>
                    {query.error.hint && <p>Hint: {query.error.hint}</p>}
                </div>
            )}

            {query.isSuccess && query.data && (
                <section>{displayShelves()}</section>
            )}
        </>
    );
}
