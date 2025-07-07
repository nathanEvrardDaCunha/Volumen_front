import useLogoutUser from './useLogoutUser';

export default function Logout() {
    const mutation = useLogoutUser();

    function handleOnLogoutClick(): void {
        mutation.mutate();
    }

    return (
        <button type="button" onClick={handleOnLogoutClick}>
            Logout
        </button>
    );
}
