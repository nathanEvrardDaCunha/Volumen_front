import Footer from '../../../layouts/Footer';
import Header from '../../../layouts/Header';
import CreateCustomShelf from '../../shelves/create-custom-shelf/CreateCustomShelf';
import FetchBooksOnUserShelvesDisplay from './FetchBooksOnUserShelvesDisplay';
import useFetchBooksOnUserShelves from './useFetchBooksOnUserShelves';

// Create a Dashboard Page ?
// Create a Shelves Page ?
// page regrouping all the relevant features ?

export default function FetchBooksOnUserShelves() {
    const query = useFetchBooksOnUserShelves();

    return (
        <>
            <Header />

            <section>
                <main>
                    <FetchBooksOnUserShelvesDisplay query={query} />

                    <CreateCustomShelf />
                </main>
            </section>

            <Footer />
        </>
    );
}
