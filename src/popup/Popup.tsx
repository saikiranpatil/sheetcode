import { Loader } from "lucide-react";
import useGetSubmissions from "../hooks/useGetSubmissions";
import { useEffect, useState } from "react";
import { Problem, ProblemSheet } from "../shared/types";
import { getCurrentProblem } from "../utils/getCurrentProblem";

function Popup() {
    const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
    const [currentSheet, setCurrentSheet] = useState<ProblemSheet | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { isLoading: isSubmissionsLoading, submissions } = useGetSubmissions("today");

    console.log("values", isLoading, currentProblem, currentSheet);

    useEffect(() => {
        const fetchCurrentProblem = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const { currentProblem, currentSheet } = await getCurrentProblem();
                setCurrentProblem(currentProblem);
                setCurrentSheet(currentSheet);
            } catch (err) {
                console.error("Error fetching current problem:", err);
                setError(err instanceof Error ? err.message : "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentProblem();
    }, []);

    if (isLoading) return <div className="flex"> <Loader className="animate-spin" /></div>
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <div className="flex">
                <div>
                    <span>Sheet</span>
                    <span>{currentSheet?.name || "-"}</span>
                </div>
                <div>
                    <span>Problem</span>
                    <span>{currentProblem?.name || "-"}</span>
                </div>
            </div>
            <div>
                <h2>Submissions</h2>
                <div className="flex">
                    {isSubmissionsLoading ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <ul>
                            {submissions?.map((submission, index) => (
                                <li key={submission.problem.link + index}>{submission.problem.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Popup
