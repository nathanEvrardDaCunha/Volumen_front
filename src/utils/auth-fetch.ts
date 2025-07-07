async function getNewAccessToken(): Promise<string> {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/token/refresh`,
        {
            method: 'GET',
            credentials: 'include',
        }
    );

    // Might need to redirect to /login if necessary
    if (!response.ok) {
        localStorage.removeItem('accessToken');
        throw new Error('Session expired. Please log in again.');
    }

    const responseData = await response.json();
    const newAccessToken = responseData.data.accessToken;

    if (typeof newAccessToken !== 'string') {
        throw new Error('Invalid access token received from server.');
    }

    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
}

let isTokenRefreshing = false;
let tokenRefreshPromise: Promise<string> | null = null;

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    let accessToken = localStorage.getItem('accessToken');

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
    });

    if (response.status === 401) {
        if (!isTokenRefreshing) {
            isTokenRefreshing = true;
            tokenRefreshPromise = getNewAccessToken().finally(() => {
                isTokenRefreshing = false;
                tokenRefreshPromise = null;
            });
        }

        try {
            const newAccessToken = await tokenRefreshPromise;

            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });

            if (response.status === 401) {
                throw new Error(
                    'Authentication failed even after refreshing the token.'
                );
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw error;
        }
    }

    return response;
}
