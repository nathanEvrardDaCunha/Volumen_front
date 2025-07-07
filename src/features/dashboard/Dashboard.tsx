import { DashboardDisplay } from './DashboardDisplay';
import { useFetchUser } from './useFetchUser';

export default function Dashboard() {
    const query = useFetchUser();

    return (
        <>
            <header>
                <h3>User Dashboard</h3>
            </header>

            <section>
                <main>
                    <DashboardDisplay query={query} />
                </main>
            </section>

            <footer>
                <h3>© 2025 Volumen. All rights reserved.</h3>
            </footer>
        </>
    );
}
