import { useCallback, useEffect, useState } from "react";

interface UseLoadDataInterface<T> {
    fetcher: () => Promise<T>;
    transformer?: (data: T) => T;
}

type UseLoadDataReturnType<T> = [T, boolean, String | undefined, () => void];

function useLoadData<T>({ fetcher, transformer }: UseLoadDataInterface<T>): UseLoadDataReturnType<T> {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedData, setLoadedData] = useState<T>(undefined as T);
    const [error, setError] = useState<String | undefined>(undefined);

    const load = useCallback(() => {
        setIsLoading(true);
        fetcher()
            .then(
                (res: T) => {
                    setLoadedData(transformer ? transformer(res) : res);
                },
                (err) => {
                    console.log(`ERROR: ${err}`);
                    setError(err instanceof Error ? err.message : "Error while fetching data");
                }
            )
            .finally(() => setIsLoading(false));
    }, [fetcher, transformer]);

    useEffect(() => {
        load();
    }, [load]);

    return [loadedData, isLoading, error, load];
}

export default useLoadData;