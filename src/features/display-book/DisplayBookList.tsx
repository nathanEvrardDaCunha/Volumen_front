import { useLocation } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
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
                        <h3>{book.volumeInfo.authors}</h3>
                    )}
                    {book.volumeInfo.categories && (
                        <p>{book.volumeInfo.categories}</p>
                    )}
                    {book.volumeInfo.language && (
                        <p>{book.volumeInfo.language}</p>
                    )}
                    {book.volumeInfo.description && (
                        <p>{book.volumeInfo.description}</p>
                    )}
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
