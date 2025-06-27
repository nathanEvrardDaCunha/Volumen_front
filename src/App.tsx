import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from './features/register/Register';

const queryClient = new QueryClient();

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
