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
                    <DashboardDisplay query={query} />
                </main>
            </section>

            <Footer />
        </>
    );
}
