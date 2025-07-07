import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LogoutUserError } from './logout-schema';
import logoutUserAPI from './logout-api';

export default function useLogoutUser() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: logoutUserAPI,
        onError: (error: LogoutUserError) => {
            // Useful ?
            alert(error.cause);

            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            localStorage.removeItem('accessToken');
            navigate('/login');
        },
    });

    return mutation;
}
