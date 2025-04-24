import useGetSheets from "../../hooks/useGetSheets";
import { TailwindColor } from "../../shared/types";
import SheetsCard from "./SheetsCard"

const Sheets = () => {
  const { loading, sheets } = useGetSheets();
  const ongoingSheets = sheets.filter(sheet => sheet.isOngoing);

  if (loading) return (<>Loading</>);

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-sm space-y-8">
        <div>
          <h1 className="text-sm tracking-wide">Ongoing Sheets</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            {ongoingSheets.map(sheet =>
              <SheetsCard
                sheetName={sheet.name}
                sheetColor={(sheet?.sheetColor || "blue") as TailwindColor}
                completionCount={sheet.completionCount}
                problemsCount={sheet.problemsCount}
                id={sheet.id}
              />
            )}
          </div>
        </div>
        <div>
          <h1 className="text-sm tracking-wide">All Sheets</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            {sheets.map(sheet =>
              <SheetsCard
                sheetName={sheet.name}
                sheetColor={(sheet.sheetColor || "blue") as TailwindColor}
                completionCount={sheet.completionCount}
                problemsCount={sheet.problemsCount}
                id={sheet.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sheets