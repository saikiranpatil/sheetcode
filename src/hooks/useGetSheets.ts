import { useCallback, useEffect, useState } from "react"
import { ProblemSheet } from "../shared/types"
import { getAllFromStore } from "../utils/idbHelpers";
import { DB_STORES } from "../shared/constants";

const useGetSheets = () => {
    const [sheets, setSheets] = useState<ProblemSheet[]>([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        const allSheets = await getAllFromStore(DB_STORES.SHEETS) as ProblemSheet[];
        setSheets(allSheets);
        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [])

    return {loading, sheets};
}

export default useGetSheets