import { useQuery } from '@tanstack/react-query';
import type { FetchUserError, FetchUserResponse } from './dashboard-schema';
import { fetchUserAPI } from './dashboard-api';

const FIVE_MINUTES_IN_MILLISECONDS = 1 * 60 * 1000;

export function useFetchUser() {
    const query = useQuery<FetchUserResponse, FetchUserError>({
        queryKey: ['fetchUser'],
        queryFn: async () => {
            return fetchUserAPI();
        },
        enabled: !!localStorage.getItem('accessToken'),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return query;
}
