import { CircleCheck, Flame, Target } from "lucide-react"

const UserStats = () => {
    return (
        <div>
            <h1 className="text-sm tracking-wide">Your Stats</h1>
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
                        <span className="text-xs text-gray-500">4 days</span>
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
                        <span className="text-xs text-gray-500">58</span>
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
                        <span className="text-xs text-gray-500">1</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStats