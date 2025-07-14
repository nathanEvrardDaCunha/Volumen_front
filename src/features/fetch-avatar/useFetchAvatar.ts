import { useQuery } from '@tanstack/react-query';
import type {
    FetchAvatarError,
    FetchAvatarResponse,
} from './fetch-avatar-schema';
import fetchAvatarAPI from './fetch-avatar-api';

const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

// Avatar and Dashboard fetch every few seconds instead of each 5 minutes => fix this

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
