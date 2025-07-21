import type { UseQueryResult } from '@tanstack/react-query';
import type { FetchBooksOnUserShelvesErrorType } from './fetch-books-on-shelves-schema';
import type { BookType } from '../../books/book-schema';

interface FetchBooksOnUserShelvesDisplayProps {
    query: UseQueryResult<
        {
            success: boolean;
            name: string;
            message: string;
            httpCode: number;
            data: {
                data: {
                    shelf: {
                        name: string;
                        isPublic: boolean;
                        isCustom: boolean;
                    };
                    books: BookType[] | false;
                }[];
            };
        },
        FetchBooksOnUserShelvesErrorType
    >;
}

export default function FetchBooksOnUserShelvesDisplay({
    query,
}: FetchBooksOnUserShelvesDisplayProps) {
    function displayBooksOnUserShelves() {
        const shelves = query.data?.data;

        if (!shelves || shelves.data.length === 0) {
            return <p>No shelves found.</p>;
        }

        return (
            <article>
                {shelves.data.map((shelfData, index) => (
                    <section
                        key={`${shelfData.shelf.name}-${index}`}
                        style={{
                            border: '2px solid black',
                            margin: '16px 0',
                            padding: '16px',
                        }}
                    >
                        <h3>{shelfData.shelf.name}</h3>
                        <div>
                            <p>
                                Visibility:{' '}
                                {shelfData.shelf.isPublic ? (
                                    <span>Public</span>
                                ) : (
                                    <span>Private</span>
                                )}
                            </p>
                            <p>
                                Type:{' '}
                                {shelfData.shelf.isCustom ? (
                                    <span>Custom</span>
                                ) : (
                                    <span>Standard</span>
                                )}
                            </p>
                        </div>

                        <div>
                            <h4>Books:</h4>
                            {shelfData.books === false ? (
                                <p>No books found on this shelf.</p>
                            ) : shelfData.books.length === 0 ? (
                                <p>This shelf is empty.</p>
                            ) : (
                                <div style={{ display: 'grid', gap: '12px' }}>
                                    {shelfData.books.map((book, bookIndex) => (
                                        <article
                                            key={`${book.id}-${bookIndex}`}
                                            style={{
                                                border: '2px solid red',
                                                padding: '12px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <h5>
                                                {book.volumeInfo.title ||
                                                    'Untitled'}
                                            </h5>
                                            {book.volumeInfo.authors &&
                                                book.volumeInfo.authors.length >
                                                    0 && (
                                                    <p>
                                                        <strong>
                                                            Authors:
                                                        </strong>{' '}
                                                        {book.volumeInfo.authors.join(
                                                            ', '
                                                        )}
                                                    </p>
                                                )}
                                            {book.volumeInfo.subtitle && (
                                                <p>
                                                    <strong>Subtitle:</strong>{' '}
                                                    {book.volumeInfo.subtitle}
                                                </p>
                                            )}
                                            {book.volumeInfo.publisher && (
                                                <p>
                                                    <strong>Publisher:</strong>{' '}
                                                    {book.volumeInfo.publisher}
                                                </p>
                                            )}
                                            {book.volumeInfo.publishedDate && (
                                                <p>
                                                    <strong>Published:</strong>{' '}
                                                    {
                                                        book.volumeInfo
                                                            .publishedDate
                                                    }
                                                </p>
                                            )}
                                            {book.volumeInfo.pageCount && (
                                                <p>
                                                    <strong>Pages:</strong>{' '}
                                                    {book.volumeInfo.pageCount}
                                                </p>
                                            )}
                                            {book.volumeInfo.description && (
                                                <p>
                                                    <strong>
                                                        Description:
                                                    </strong>{' '}
                                                    {book.volumeInfo.description
                                                        .length > 200
                                                        ? `${book.volumeInfo.description.substring(
                                                              0,
                                                              200
                                                          )}...`
                                                        : book.volumeInfo
                                                              .description}
                                                </p>
                                            )}
                                            {book.volumeInfo.categories &&
                                                book.volumeInfo.categories
                                                    .length > 0 && (
                                                    <p>
                                                        <strong>
                                                            Categories:
                                                        </strong>{' '}
                                                        {book.volumeInfo.categories.join(
                                                            ', '
                                                        )}
                                                    </p>
                                                )}
                                            {book.volumeInfo.infoLink && (
                                                <p>
                                                    <a
                                                        href={
                                                            book.volumeInfo
                                                                .infoLink
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        More Info
                                                    </a>
                                                </p>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
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
                <section>{displayBooksOnUserShelves()}</section>
            )}
        </>
    );
}
