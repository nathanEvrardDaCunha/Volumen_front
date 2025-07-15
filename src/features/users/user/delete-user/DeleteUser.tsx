import useDeleteUser from './useDeleteUser';
import type { MouseEventHandler } from 'react';

export default function DeleteUser() {
    const mutation = useDeleteUser();

    const onClick: MouseEventHandler<HTMLButtonElement> = async () => {
        mutation.mutate();
    };

    // Make the button red
    return (
        <button type="button" onClick={onClick}>
            Delete Account
        </button>
    );
}
