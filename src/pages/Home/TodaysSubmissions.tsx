import { ChevronRight } from "lucide-react"
import { Link } from "react-router"

const TodaysSubmissions = () => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="w-full">
                <div className="bg-white w-full p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                        <h1 className="text-sm tracking-wide">Today's Submissions</h1>
                        <Link to={"/submissions"} className="flex text-[10px] font-semibold text-gray-400 items-center cursor-pointer group hover:text-gray-500">
                            View All
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-all ease-in-out" />
                        </Link>
                    </div>
                    <div className="mt-2 rounded-sm">
                        <div className="bg-gray-100 overflow-hidden w-full p-2 rounded-sm flex items-center justify-between m-0">
                            <span className="text-xs text-black/60 font-semibold">Substring with Maximum sum</span>
                            <div className="flex gap-4 text-[10px]">
                                <span className="text-gray-400">now</span>
                                <span className="text-gray-400">
                                    <div className="min-w-10 text-right">
                                        Leetcode
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="bg-white h-0.5 rounded-sm"></div>
                        <div className="bg-gray-100 overflow-hidden w-full p-2 rounded-sm flex items-center justify-between">
                            <span className="text-xs text-black/60 font-semibold">2 Sum</span>
                            <div className="flex gap-4 text-[10px]">
                                <span className="text-gray-400">4 hours ago</span>
                                <span className="text-gray-400">
                                    <div className="min-w-10 text-right">
                                        Leetcode
                                    </div>
                                </span>
                            </div>
                        </div>
                        <p className="not-first:hidden text-[10px] text-gray-400">Make Submissions to show here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaysSubmissions