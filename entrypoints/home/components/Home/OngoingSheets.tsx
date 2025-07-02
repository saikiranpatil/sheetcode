import { ChevronRight, NotebookText, Play } from "lucide-react"
import { Link } from "react-router";
import { CircularProgress } from "../CircularProgress";
import { db } from "@/lib/db/MyDB";

const OngoingSheets = () => {
    const { data: ongoingSheets } = useRepository(db.sheetRepo, (sheet) => sheet.isOngoing);
    if(!ongoingSheets) return <>Loading</>;
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-sm tracking-wide">Ongoing Sheets</h1>
                <Link to={"/sheets"} className="flex text-[10px] font-semibold text-gray-400 items-center cursor-pointer group hover:text-gray-500">
                    View All
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-all ease-in-out" />
                </Link>
            </div>
            <div className="mt-2 flex flex-col gap-1">
                {ongoingSheets.map((sheet, idx) =>
                    <Link
                        to={"/sheets/" + idx}
                        key={["sheet", idx, sheet.name].join("-")}
                        className="rounded-sm overflow-hidden w-full px-2 py-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors group">
                        <div className="relative">
                            <CircularProgress percentage={(sheet.completionCount / sheet.problemsCount) * 100} radius={15} stroke={2} />
                            <div className="absolute left-0 top-0 h-[30px] w-[30px] text-gray-500 flex items-center justify-center">
                                <NotebookText className="group-hover:hidden h-4 w-4 text-[10px] font-semibold" />
                                <Play className="hidden group-hover:block h-8 w-8 p-2 rounded-full shadow shadow-gray-100" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <span className="text-xs text-black/60 font-semibold">Striver Sheet</span>
                            <span className="text-[10px] text-gray-400 mt-0.5">
                                <span className="font-semibold text-black/50">{sheet.completionCount}/{sheet.problemsCount}</span>
                                {" "} problems solved
                            </span>
                        </div>
                    </Link>
                )}
                <p className="not-first:hidden text-[10px] text-gray-400">Start Sheets to show here</p>
            </div>
        </div>
    )
}

export default OngoingSheets