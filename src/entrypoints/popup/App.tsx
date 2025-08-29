import { Button } from "@/components/ui/button"
import { getSheetRepo } from "@/lib/db"
import { useLiveQuery } from "dexie-react-hooks";

function App() {
  const openLanding = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('/landing.html') })
  }

  // <Button onClick={openLanding}>Open Landing Page</Button>

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md border border-gray-200">
      {/* Header */}
      <h2 className="text-blue-600 font-bold text-lg mb-1">Sheetcode</h2>
      <p className="text-gray-500 text-sm mb-4">
        Keep track of all your coding problems in one place
      </p>

      {/* Current Problem & Goal */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Current Problem</p>
          <p className="text-base font-semibold text-red-500">Two Sum</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Goal</p>
          <p className="text-base font-semibold text-orange-500">
            Summer Sprint
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-2">
          Today&apos;s Progress (4/24)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all"
            style={{ width: `${(4 / 24) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default App