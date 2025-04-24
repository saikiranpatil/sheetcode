import { useEffect, useState } from "react";
import { getAllFromStore } from "../utils/idbHelpers";
import { DB_STORES } from "../shared/constants";
import { Submission } from "../shared/types";

const useGetSubmissions = (filter: "all" | "today" = "all") => {
    const [submissions, setsubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const load = async () => {
        try {
            setIsLoading(true);
            const res: Submission[] = await getAllFromStore(DB_STORES.SUBMISSIONS);
            const filteredRes = filter === "today"
                ? res.filter(res => (new Date().getTime() - res.submittedAt) <= 1000 * 60 * 60 * 24)
                : res;
            setsubmissions(filteredRes);
        } catch (error) {
            console.error("Failed to load submissions:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [filter])

    return { submissions, isLoading };
}

export default useGetSubmissions