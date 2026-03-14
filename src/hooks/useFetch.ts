import { useState, useCallback, useEffect } from "react";

interface UseFetchOptions<T, R = T> {
    fetcher: () => Promise<T>;
    transformer?: (data: T) => R;
    onError?: (error: Error) => void;
};

type UseFetchReturnType<R> = {
    data: R | undefined;
    isLoading: boolean;
    error: string | undefined;
    reload: () => Promise<void>;
};

function useFetch<T, R = T>({
    fetcher,
    transformer,
    onError,
}: UseFetchOptions<T, R>): UseFetchReturnType<R> {
    const [data, setData] = useState<R | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const load = useCallback(async () => {
        setIsLoading(true);
        fetcher()
            .then((response: T) => {
                setData(transformer ? transformer(response) : (response as unknown as R));
            })
            .catch((err) => {
                console.error("useFetch error:", err);
                const error = err instanceof Error ? err : new Error(String(err));
                const errorMessage = error.message || "Error while fetching data";
                setError(errorMessage);
                onError?.(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fetcher, transformer, onError]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        data,
        isLoading,
        error,
        reload: load,
    };
};

export default useFetch;