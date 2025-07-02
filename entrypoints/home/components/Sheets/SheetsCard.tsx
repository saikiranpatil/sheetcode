import { NotepadText } from "lucide-react"
import { Link } from "react-router"

interface SheetsCardProps {
    id: number;
    sheetName: string;
    sheetColor: string;
    completionCount: number;
    problemsCount: number;
}

const SheetsCard = ({
    id,
    sheetName,
    sheetColor,
    completionCount,
    problemsCount,
}: SheetsCardProps) => {
    return (<Link
        to={"/sheets/" + id}
        className={`cursor-pointer rounded-sm overflow-hidden items-center w-[200px] px-2 py-2 flex gap-3 bg-gray-100 hover:bg-gray-50 border border-gray-200 transition-colors`}>
        <div className={`flex aspect-square p-2 bg-gradient-to-b from-${sheetColor}-500 from-5% via-${sheetColor}-700 via-[percentage:10%_70%] to-${sheetColor}-900 to-100% rounded-sm items-center justify-center`}>
            <NotepadText className="w-7 h-7 text-blue-200" />
        </div>
        <div className="flex flex-col w-full justify-around gap-1">
            <span className="text-xs font-semibold text-black/60">{sheetName}</span>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div
                    className={`bg-gradient-to-r from-blue-400 to-blue-500 h-1 rounded-full`}
                    // className={`${getTailwindGradientClasses({ from: sheetColor, to: sheetColor, fromShade: 400, toShade: 500 })} h-1 rounded-full`}
                    style={{ width: `${(completionCount / problemsCount) * 100}%` }}
                ></div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Total Progress</span>
                <div className="text-[10px] font-semibold text-black/50">{completionCount} / {problemsCount}</div>
            </div>
        </div>
    </Link>)
}

export default SheetsCard