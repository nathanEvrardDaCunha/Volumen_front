import Footer from '../../../layouts/Footer';
import Header from '../../../layouts/Header';
import CreateCustomShelf from '../create-custom-shelf/CreateCustomShelf';
import FetchShelveDisplay from './FetchShelvesDisplay';
import useFetchShelves from './useFetchShelves';

// Create a Dashboard Page ?
// Create a Shelves Page ?
// page regrouping all the relevant features ?

export default function FetchShelves() {
    const query = useFetchShelves();

    return (
        <>
            <Header />

            <section>
                <main>
                    <FetchShelveDisplay query={query} />

                    <CreateCustomShelf />
                </main>
            </section>

            <Footer />
        </>
    );
}
