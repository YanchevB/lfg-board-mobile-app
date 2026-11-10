import { useCallback, useEffect, useState } from 'react';

// fetcher must be stable (a module function or wrapped in useCallback), a new fetcher means a new load
export default function useFetch(fetcher) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loadedFetcher, setLoadedFetcher] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        let ignore = false;

        fetcher()
            .then((result) => {
                if (ignore) return;

                setData(result);
                setError(null);
            })
            .catch((err) => {
                if (!ignore) setError(err.message);
            })
            .finally(() => {
                // Wrapped in a function, otherwise React would call fetcher as a state updater
                if (!ignore) setLoadedFetcher(() => fetcher);
            });

        return () => {
            ignore = true;
        };
    }, [fetcher]);

    // Reloads in the background, for pull-to-refresh and "Try again"
    const refresh = useCallback(async () => {
        setIsRefreshing(true);

        try {
            setData(await fetcher());
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsRefreshing(false);
        }
    }, [fetcher]);

    return { data, error, isLoading: loadedFetcher !== fetcher, isRefreshing, refresh };
}
