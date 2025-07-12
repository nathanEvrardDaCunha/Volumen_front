import { useQuery } from '@tanstack/react-query';
import type {
    FetchAvatarError,
    FetchAvatarResponse,
} from './update-avatar-schema';
import fetchAvatarAPI from './update-avatar-api';

const FIVE_MINUTES_IN_MILLISECONDS = 1 * 60 * 1000;

export default function useFetchAvatar() {
    const query = useQuery<FetchAvatarResponse, FetchAvatarError>({
        queryKey: ['fetchAvatar'],
        queryFn: async () => {
            return fetchAvatarAPI();
        },
        enabled: !!localStorage.getItem('accessToken'),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return query;
}
