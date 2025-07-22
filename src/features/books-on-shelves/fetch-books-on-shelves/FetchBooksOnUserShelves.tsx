import Footer from '../../../layouts/Footer';
import Header from '../../../layouts/Header';
import BookSearchBar from '../../books/fetch-book/BookSearchBar';
import CreateCustomShelf from '../../shelves/create-custom-shelf/CreateCustomShelf';
import FetchBooksOnUserShelvesDisplay from './FetchBooksOnUserShelvesDisplay';
import useFetchBooksOnUserShelves from './useFetchBooksOnUserShelves';

// Create new page in "page" folder and simply add the relevant feature instead of directly linking the page in "features" folder to App ?

export default function FetchBooksOnUserShelves() {
    const query = useFetchBooksOnUserShelves();

    return (
        <>
            <Header />

            <section>
                <main>
                    <BookSearchBar />

                    <FetchBooksOnUserShelvesDisplay query={query} />

                    <CreateCustomShelf />
                </main>
            </section>

            <Footer />
        </>
    );
}
