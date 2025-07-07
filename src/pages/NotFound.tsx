import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export default function NotFound() {
    return (
        <>
            <Header />

            <section>
                <main>
                    <h1>Not Found page.</h1>
                    <p>
                        This page doesn't exist. To go back either click on the
                        back arrow button of your browser or go to the home page
                        by clicking the button below.
                    </p>
                    <Link to={'/'}>
                        <button type="button">Go Home</button>
                    </Link>
                </main>
            </section>

            <Footer />
        </>
    );
}
