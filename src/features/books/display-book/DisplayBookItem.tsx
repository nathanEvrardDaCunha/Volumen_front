import { useLocation } from 'react-router-dom';
import { BookSchema } from '../book-schema';
import SaveBookButton from '../save-book/SaveBookButton';

export default function DisplayBookItem() {
    const { state } = useLocation();
    console.log(state);

    function displayBooks() {
        const book = BookSchema.parse(state.state);

        return (
            <article
                key={book.id}
                style={{ fontFamily: 'sans-serif', lineHeight: 1.6 }}
            >
                <section>
                    <h2>Volume Information</h2>
                    {book.volumeInfo.title && <h1>{book.volumeInfo.title}</h1>}
                    {book.volumeInfo.subtitle && (
                        <h2 style={{ fontStyle: 'italic', color: '#555' }}>
                            {book.volumeInfo.subtitle}
                        </h2>
                    )}
                    {book.volumeInfo.authors && (
                        <h3>By: {book.volumeInfo.authors.join(', ')}</h3>
                    )}
                    {book.volumeInfo.description && (
                        <p>{book.volumeInfo.description}</p>
                    )}
                    {book.volumeInfo.publisher && (
                        <p>
                            <strong>Publisher:</strong>{' '}
                            {book.volumeInfo.publisher}
                        </p>
                    )}
                    {book.volumeInfo.publishedDate && (
                        <p>
                            <strong>Published Date:</strong>{' '}
                            {book.volumeInfo.publishedDate}
                        </p>
                    )}
                    {book.volumeInfo.pageCount && (
                        <p>
                            <strong>Pages:</strong> {book.volumeInfo.pageCount}
                        </p>
                    )}
                    {book.volumeInfo.language && (
                        <p>
                            <strong>Language:</strong>{' '}
                            {book.volumeInfo.language}
                        </p>
                    )}
                    {book.volumeInfo.categories &&
                        book.volumeInfo.categories.length > 0 && (
                            <p>
                                <strong>Categories:</strong>{' '}
                                {book.volumeInfo.categories.join(' | ')}
                            </p>
                        )}
                    {book.volumeInfo.maturityRating && (
                        <p>
                            <strong>Maturity Rating:</strong>{' '}
                            {book.volumeInfo.maturityRating}
                        </p>
                    )}
                    {book.volumeInfo.dimensions && (
                        <div>
                            <strong>Dimensions:</strong>
                            <ul>
                                {book.volumeInfo.dimensions.height && (
                                    <li>
                                        Height:{' '}
                                        {book.volumeInfo.dimensions.height}
                                    </li>
                                )}
                                {book.volumeInfo.dimensions.width && (
                                    <li>
                                        Width:{' '}
                                        {book.volumeInfo.dimensions.width}
                                    </li>
                                )}
                                {book.volumeInfo.dimensions.thickness && (
                                    <li>
                                        Thickness:{' '}
                                        {book.volumeInfo.dimensions.thickness}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    {book.volumeInfo.industryIdentifiers &&
                        book.volumeInfo.industryIdentifiers.length > 0 && (
                            <div>
                                <strong>Industry Identifiers:</strong>
                                <ul>
                                    {book.volumeInfo.industryIdentifiers.map(
                                        (id) => (
                                            <li key={id.identifier}>
                                                {id.type}: {id.identifier}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                </section>

                <hr />

                <section>
                    <h2>Sale Information</h2>
                    {book.saleInfo.country && (
                        <p>
                            <strong>Country:</strong> {book.saleInfo.country}
                        </p>
                    )}
                    {book.saleInfo.saleability && (
                        <p>
                            <strong>Saleability:</strong>{' '}
                            {book.saleInfo.saleability}
                        </p>
                    )}
                    {book.saleInfo.isEbook !== undefined && (
                        <p>
                            <strong>E-book available:</strong>{' '}
                            {book.saleInfo.isEbook ? 'Yes' : 'No'}
                        </p>
                    )}
                    {book.saleInfo.listPrice && (
                        <p>
                            <strong>List Price:</strong> $
                            {book.saleInfo.listPrice.amount}{' '}
                            {book.saleInfo.listPrice.currencyCode}
                        </p>
                    )}
                    {book.saleInfo.retailPrice && (
                        <p>
                            <strong>Retail Price:</strong> $
                            {book.saleInfo.retailPrice.amount}{' '}
                            {book.saleInfo.retailPrice.currencyCode}
                        </p>
                    )}
                </section>

                <hr />

                <section>
                    <h2>Links & Identifiers</h2>
                    <p>
                        <strong>Book ID:</strong> {book.id}
                    </p>
                    {book.volumeInfo.previewLink && (
                        <p>
                            <a
                                href={book.volumeInfo.previewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Preview on Google Books
                            </a>
                        </p>
                    )}
                    {book.volumeInfo.infoLink && (
                        <p>
                            <a
                                href={book.volumeInfo.infoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                More Information
                            </a>
                        </p>
                    )}
                </section>

                <SaveBookButton book={book} />
            </article>
        );
    }

    return <>{displayBooks()}</>;
}
