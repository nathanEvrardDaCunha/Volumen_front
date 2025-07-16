import { Link, useLocation } from 'react-router-dom';
import Header from '../../../layouts/Header';
import Footer from '../../../layouts/Footer';
import { FetchBookResponseSchema } from '../fetch-book/fetch-book-schema';

export default function DisplayBookList() {
    const { state } = useLocation();
    console.log(state);

    function displayBooks() {
        const data = FetchBookResponseSchema.parse(state);
        const books = data.data.books.map((book) => {
            return (
                <article key={book.id}>
                    {book.volumeInfo.title && <h1>{book.volumeInfo.title}</h1>}

                    {book.volumeInfo.authors && (
                        <h3>{book.volumeInfo.authors.join(', ')}</h3>
                    )}

                    {book.volumeInfo.categories && (
                        <p>{book.volumeInfo.categories.join(' | ')}</p>
                    )}

                    {book.volumeInfo.language && (
                        <p>{book.volumeInfo.language}</p>
                    )}

                    {book.volumeInfo.description && (
                        <p>{book.volumeInfo.description}</p>
                    )}

                    <Link to={`/books/${book.id}`} state={{ state: book }}>
                        <button>More</button>
                    </Link>
                </article>
            );
        });
        return books;
    }

    return (
        <>
            <Header />

            <h1>Display Book</h1>

            {displayBooks()}

            <Footer />
        </>
    );
}
