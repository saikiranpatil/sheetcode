import { Link } from "react-router";

import { getSheetRepo } from "@/lib/db";
import { getTimeAgo } from "@/lib/utils";
import { Submission } from "@/types";

interface SubmissionProps {
    submission: Submission;
    type: "home" | "submissions";
}

const Submission = ({ submission, type }: SubmissionProps) => {
    const { data: sheet, isLoading } = useFetch({ fetcher: useCallback(() => getSheetRepo().getById(submission.sheetId), []) });
    const problem = useMemo(() => {
        if (sheet && sheet.topics) {
            return sheet?.topics?.flatMap(topic => topic.problems).find(p => p.id === submission.problemId);
        }

        return null;
    }, [sheet]);

    if (isLoading || !sheet || !problem) return null;

    return type === "home" ? (
        <div className="odd:bg-gray-100 overflow-hidden w-full px-2 py-3 rounded-sm flex items-center justify-between m-0">
            <span className="text-xs text-black/60 font-semibold">
                <Link
                    to={problem.link || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {problem.name}
                </Link>
            </span>
            <div className="flex gap-4 text-[10px]">
                <span className="text-gray-400">{getTimeAgo(submission.submittedAt, 1)}</span>
                <span className="text-gray-500">
                    <div className="min-w-10 text-right">
                        {problem.platform}
                    </div>
                </span>
            </div>
        </div>
    ) : (
        <tr className="bg-white">
            <td className="py-2 px-4 border-b border-gray-300">{getTimeAgo(submission.submittedAt)}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-blue-600 hover:text-blue-700 cursor-pointer">
                <Link
                    to={problem.link || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {problem.name}
                </Link>
            </td>
            <td className="py-2 px-4 border-b border-gray-300">{problem.platform}</td>
            <td className="py-2 px-4 border-b border-gray-300">
                <Link
                    to={`/sheets/${sheet?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {sheet.name}
                </Link>
            </td>
        </tr>
    )
}

export default Submission