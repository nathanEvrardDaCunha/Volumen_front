import { useQuery } from '@tanstack/react-query';
import type {
    FetchShelveErrorType,
    FetchShelvesResponseType,
} from './fetch-shelves-schema';
import fetchShelvesAPI from './fetch-shelves-api';

const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

export default function useFetchShelves() {
    const query = useQuery<FetchShelvesResponseType, FetchShelveErrorType>({
        queryKey: ['fetchShelves'],
        queryFn: async () => {
            return fetchShelvesAPI();
        },
        enabled: !!localStorage.getItem('accessToken'),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return query;
}
