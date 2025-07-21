import { useQuery } from '@tanstack/react-query';
import type {
    FetchBooksOnUserShelvesErrorType,
    FetchBooksOnUserShelvesResponseType,
} from './fetch-books-on-shelves-schema';
import fetchBooksOnUserShelvesAPI from './fetch-books-on-shelves-api';

const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

export default function useFetchBooksOnUserShelves() {
    const query = useQuery<
        FetchBooksOnUserShelvesResponseType,
        FetchBooksOnUserShelvesErrorType
    >({
        queryKey: ['fetchBooksOnUserShelves'],
        queryFn: async () => {
            return fetchBooksOnUserShelvesAPI();
        },
        enabled: !!localStorage.getItem('accessToken'),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return query;
}
