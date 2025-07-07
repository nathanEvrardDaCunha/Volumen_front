import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import DashboardDisplay from './DashboardDisplay';
import useFetchUser from './useFetchUser';

export default function Dashboard() {
    const query = useFetchUser();

    return (
        <>
            <Header />

            <section>
                <main>
                    <Link to={'/dashboard/update-user'}>
                        <button type="button">Update Profile</button>
                    </Link>

                    <DashboardDisplay query={query} />
                </main>
            </section>

            <Footer />
        </>
    );
}
