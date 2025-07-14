import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import DashboardDisplay from './DashboardDisplay';
import useFetchUser from './useFetchUser';
import DeleteUser from '../delete-user/DeleteUser';
import FetchAvatar from '../fetch-avatar/Avatar';
import UpdateAvatar from '../fetch-avatar/update-avatar/UpdateAvatar';
import BookSearchBar from '../fetch-book/BookSearchBar';

export default function Dashboard() {
    const query = useFetchUser();

    return (
        <>
            <Header />

            <BookSearchBar />

            <section>
                <main>
                    <Link to={'/dashboard/update-user'}>
                        <button type="button">Update Profile</button>
                    </Link>

                    <DeleteUser />

                    <FetchAvatar />

                    <UpdateAvatar />

                    <DashboardDisplay query={query} />
                </main>
            </section>

            <Footer />
        </>
    );
}
