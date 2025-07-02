import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from './features/register/Register';
import Login from './features/login/Login';
import Dashboard from './features/dashboard/Dashboard';

const queryClient = new QueryClient();

// Implement Logout

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
        path: '/dashboard/home',
        element: <Dashboard />,
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
