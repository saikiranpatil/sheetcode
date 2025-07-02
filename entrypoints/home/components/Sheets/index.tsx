import { db } from "@/lib/db/MyDB"
import SheetsCard from "./SheetsCard"

const Sheets = () => {
  const { data: sheets } = useRepository(db.sheetRepo);
  if (!sheets) return <>Loading</>;
  const ongoingSheets = sheets.filter(s => s.isOngoing);
  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-sm space-y-8">
        <div>
          <h1 className="text-sm tracking-wide">Ongoing Sheets</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            {ongoingSheets.map((sheet, idx) =>
              <SheetsCard
                sheetName={sheet.name}
                sheetColor={(sheet?.sheetColor || "blue")}
                completionCount={sheet.completionCount}
                problemsCount={sheet.problemsCount}
                id={sheet.id!}
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
                sheetColor={(sheet.sheetColor || "blue")}
                completionCount={sheet.completionCount}
                problemsCount={sheet.problemsCount}
                id={sheet.id!}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sheets