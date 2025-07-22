import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteUserAPI from './delete-user-api';
import type { DeleteUserErrorType } from './delete-user-schema';

export default function useDeleteUser() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['deleteUser'],
        mutationFn: deleteUserAPI,
        onError: (error: DeleteUserErrorType) => {
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
