import useFetchAvatar from './useFetchAvatar';

export default function Avatar() {
    const query = useFetchAvatar();

    // Add a fallback image in case server fail or someone tamper with the avatar logic ?

    return <img src={`/${query.data?.data.avatar_id}`} alt="User avatar" />;
}
