import { useQuery } from '@tanstack/react-query';
import type {
    FetchUserErrorType,
    FetchUserResponseType,
} from './dashboard-schema';
import fetchUserAPI from './dashboard-api';

const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

export default function useFetchUser() {
    const query = useQuery<FetchUserResponseType, FetchUserErrorType>({
        queryKey: ['fetchUser'],
        queryFn: async () => {
            return fetchUserAPI();
        },
        enabled: !!localStorage.getItem('accessToken'),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return query;
}
