interface UseFetchOptions<T, R = T> {
    fetcher: () => Promise<T>;
    transformer?: (data: T) => R;
    initialData?: R;
    onError?: (error: Error) => void;
}

type UseFetchReturnType<T> = {
    data: T;
    isLoading: boolean;
    error: string | undefined;
    reload: () => Promise<void>;
};

/**
 * Custom hook to fetch, transform, and manage data state.
 * 
 * @template T - The type of the raw data returned by the fetcher
 * @template R - The type of the transformed data (defaults to T if no transformer provided)
 * @param {UseFetchOptions<T, R>} options - Configuration options
 * @returns {UseFetchReturnType<R>} An object containing data, loading state, error, and reload function
 */
function useFetch<T, R = T>({
    fetcher,
    transformer,
    initialData,
    onError,
}: UseFetchOptions<T, R>): UseFetchReturnType<R> {
    const [state, setState] = useState<{
        data: R;
        isLoading: boolean;
        error: string | undefined;
    }>({
        data: initialData as R,
        isLoading: true,
        error: undefined,
    });

    const reload = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: undefined }));
            const response = await fetcher();
            const transformedData = transformer ? transformer(response) : (response as unknown as R);
            setState(prev => ({ ...prev, data: transformedData }));
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            const errorMessage = error.message || 'Error while fetching data';

            setState(prev => ({ ...prev, error: errorMessage }));
            onError?.(error);
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [fetcher, transformer, onError]);

    useEffect(() => {
        reload();
    }, [reload]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        reload,
    };
}

export default useFetch;