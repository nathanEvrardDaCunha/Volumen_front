import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LogoutUserErrorType } from './logout-schema';
import logoutUserAPI from './logout-api';

export default function useLogoutUser() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: logoutUserAPI,
        onError: (error: LogoutUserErrorType) => {
            // Replace by a modal ?
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
