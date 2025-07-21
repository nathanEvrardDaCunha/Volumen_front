import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './features/authentication/login/Login';
import Register from './features/authentication/register/Register';
import ResetPassword from './features/authentication/reset-password/ResetPassword';
import DisplayBookItem from './features/books/display-book/DisplayBookItem';
import DisplayBookList from './features/books/display-book/DisplayBookList';
import Dashboard from './features/users/user/dashboard/Dashboard';
import UpdateUser from './features/users/user/update-user/UpdateUser';
import FetchBooksOnUserShelves from './features/books-on-shelves/fetch-books-on-shelves/FetchBooksOnUserShelves';

const queryClient = new QueryClient();

// In HEADER, add button to navigate to /login, /register, /logout, /dashboard...

// Protect Dashboard with authentication on the client side too

// Is it a good idea to regroup the user account personal space under /dashboard
// => E.g: "/dashboard/home", "/dashboard/books"...

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
    },
    {
        path: '/dashboard/home',
        element: <Dashboard />,
    },
    {
        path: '/dashboard/update-user',
        element: <UpdateUser />,
    },
    {
        path: '/books',
        element: <DisplayBookList />,
    },
    {
        path: '/books/:id',
        element: <DisplayBookItem />,
    },
    {
        path: '/shelves',
        element: <FetchBooksOnUserShelves />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
