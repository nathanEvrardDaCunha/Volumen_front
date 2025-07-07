import { useQuery } from '@tanstack/react-query';
import type { FetchUserError, FetchUserResponse } from './dashboard-schema';
import { fetchUserAPI } from './dashboard-api';
import { useEffect, useState } from 'react';

const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

export function useFetchUser() {
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const query = useQuery<FetchUserResponse, FetchUserError>({
        queryKey: ['fetchUser', accessToken],
        queryFn: async () => {
            return fetchUserAPI(accessToken);
        },
        enabled: Boolean(accessToken),
        refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    });

    return query;
}
