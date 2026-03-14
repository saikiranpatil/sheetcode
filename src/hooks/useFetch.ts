interface UseFetchOptions<T, R = T> {
    fetcher: () => Promise<T>;
    transformer?: (data: T) => R;
    onError?: (error: Error) => void;
};

type UseFetchReturnType<T> = {
    data: T;
    isLoading: boolean;
    error: string | undefined;
    reload: () => Promise<void>;
};

function useFetch<T, R = T>({
    fetcher,
    transformer,
    onError,
}: UseFetchOptions<T, R>): UseFetchReturnType<R> {
    const [data, setData] = useState(undefined as R);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const load = useCallback(async () => {
        fetcher()
        .then((response: T) => {
            setData(transformer ? transformer(response) : (response as unknown as R));
        }, (err) => {
            console.error("Error", err);
            const error = err instanceof Error ? err : new Error(String(err));
            const errorMessage = error.message || "Error while fetching data";

            setError(errorMessage);
            onError?.(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
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