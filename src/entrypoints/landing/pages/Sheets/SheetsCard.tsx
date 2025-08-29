import { getSheetDetails, getSheetHeroIconStyle } from "@/lib/utils";
import { Sheet } from "@/types";
import { NotepadText } from "lucide-react"
import { Link } from "react-router"

interface SheetsCardProps {
    sheet: Sheet
}

const SheetsCard = ({ sheet }: SheetsCardProps) => {
    const { id, sheetColor, name } = sheet;
    const { completionRate } = getSheetDetails(sheet);
    return (
        <Link
            to={"/sheets/" + id}
            className={`cursor-pointer rounded-sm overflow-hidden items-center w-full flex bg-gray-100 hover:bg-gray-50 border border-gray-200 transition-colors pl-2`}>
            <div className={`flex p-2 bg-gradient-to-b from-5% via-[percentage:10%_70%] to-100% rounded-sm items-center justify-center bg-white`}>
                <NotepadText className={`w-7 h-7 ${getSheetHeroIconStyle(sheetColor).icon}`} />
            </div>
            <div className="flex flex-col w-full justify-around gap-1 p-2">
                <span className="text-xs font-semibold text-black/60">{name}</span>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                        className={`bg-gradient-to-r from-blue-400 to-blue-500 h-1 rounded-full`}
                        style={{ width: `${completionRate}%` }}
                    ></div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Total Progress</span>
                    <div className="text-[10px] font-semibold text-black/50">{completionRate}%</div>
                </div>
            </div>
        </Link>
    );
}

export default SheetsCard