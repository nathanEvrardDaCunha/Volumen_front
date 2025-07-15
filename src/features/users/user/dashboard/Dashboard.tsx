import { Link } from 'react-router-dom';
import DashboardDisplay from './DashboardDisplay';
import useFetchUser from './useFetchUser';
import DeleteUser from '../delete-user/DeleteUser';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import BookSearchBar from '../../../books/fetch-book/BookSearchBar';
import FetchAvatar from '../../avatar/fetch-avatar/Avatar';
import UpdateAvatar from '../../avatar/update-avatar/UpdateAvatar';

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
