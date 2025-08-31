import { Link } from "react-router"
import { ChevronRight } from "lucide-react"
import { useCallback } from "react";
import useFetch from "@/hooks/useFetch";

import Submission from "@/components/shared/Submission";
import Spinner from "@/components/layout/Spinner";
import { getSubmissionRepo } from "@/lib/db";

const TodaysSubmissions = () => {
    const todayFilter = (date: number) => {
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        return date > todayStart;
    };

    const { data, isLoading } = useFetch({
        fetcher: useCallback(() => getSubmissionRepo().getRecentSubmissions({ filterFn: (sub) => todayFilter(sub.submittedAt) }), [])
    });

    return isLoading ? (
        <Spinner size="sm" />
    ) : (
        <div className="flex flex-col space-y-4 w-full">
            <div className="bg-white border w-full p-4 rounded-sm">
                <div className="flex items-center justify-between">
                    <span className="text-sm tracking-wide">Today's Submissions</span>
                    <Link to={"/submissions"} className="flex items-center text-[10px] font-semibold text-gray-400 cursor-pointer group hover:text-gray-500">
                        <span className="inline-block">View All</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-all ease-in-out" />
                    </Link>
                </div>
                <div className="mt-2 rounded-sm">
                    {data && data.submissions && data.submissions.map(submission => <Submission submission={submission} type="home" />)}
                    <p className="first:block hidden text-xs text-muted-foreground italic py-2">No Submissions</p>
                </div>
            </div>
        </div>
    )
}

export default TodaysSubmissions