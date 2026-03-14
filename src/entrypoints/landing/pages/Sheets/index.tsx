import SheetsCard from "@/entrypoints/landing/pages/Sheets/SheetsCard"
import { Sheet } from "@/types";
import Spinner from "@/components/layout/Spinner";
import { getSheetRepo } from "@/lib/db";

const Sheets = () => {
  const { data: sheets, isLoading: isSheetsLoading } = useFetch({
    fetcher: useCallback(() => {
      return getSheetRepo().getAll();
    }, [])
  });

  const { data: ongoingSheets, isLoading: isOngoingSheetsLoading } = useFetch({
    fetcher: useCallback(() => getSheetRepo().getAll({ filterFn: (sheet: Sheet) => sheet.isActive }), [])
  });

  return isSheetsLoading || isOngoingSheetsLoading ? (
    <Spinner size="sm" />
  ) : (
    <div className="p-4">
      <div className="bg-white border p-4 rounded-sm space-y-8">
        <div>
          <div className="text-sm tracking-wide mb-2">Ongoing Sheets</div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_300px))] justify-between items-center">
            {ongoingSheets.map((sheet) => <SheetsCard key={'ongoing-sheet-' + sheet?.id} sheet={sheet} />)}
            <span className="first:block hidden text-xs italic text-muted-foreground"> Nothing to show here</span>
          </div>
        </div>
        <div>
          <div className="text-sm tracking-wide mb-2">All Sheets</div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_300px))] justify-between items-center">
            {sheets.map((sheet) => <SheetsCard key={'all-sheet-' + sheet?.id} sheet={sheet} />)}
            <span className="first:block hidden text-xs italic text-muted-foreground"> Nothing to show here</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sheets