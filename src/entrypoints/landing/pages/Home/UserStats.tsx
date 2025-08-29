import Spinner from "@/components/layout/Spinner";
import { getSubmissionRepo } from "@/lib/db";
import { extractStats } from "@/lib/utils"
import { CircleCheck, Flame, Target } from "lucide-react"

const UserStats = () => {
    const { data: submissions, isLoading } = useFetch({
        fetcher: useCallback(() => getSubmissionRepo().getAll(), [])
    });
    const userStats = extractStats(submissions);

    return isLoading ? (
        <Spinner size="sm" />
    ) : (
        <div>
            <h3 className="text-sm tracking-wide">Your Stats</h3>
            <div className="space-y-2 mt-2">
                <div className="flex gap-3">
                    <div>
                        <div className="bg-green-100 p-1 rounded-sm">
                            <Flame fill="#00c951" className="h-4 w-4 text-green-500" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-600/50">
                            Current Streak
                        </span>
                        <span className="text-xs text-gray-500">{userStats.currentStreak} days</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div>
                        <div className="bg-blue-100 p-1 rounded-sm">
                            <Target fill="#dbeafe" className="h-4 w-4 text-blue-500" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-600/50">
                            Problems Solved Today
                        </span>
                        <span className="text-xs text-gray-500">{userStats.solvedToday}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div>
                        <div className="bg-orange-100 p-0.5 rounded-sm">
                            <CircleCheck fill="#ff6900" className="h-5 w-5 text-orange-100" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-600/50">
                            Total Problems Solved
                        </span>
                        <span className="text-xs text-gray-500">{userStats.totalSolved}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStats