import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"

const Submissions = () => {
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-sm space-y-4 w-full p-4">
        <h1 className="text-sm tracking-wide">All Submissions</h1>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 text-[10px] text-gray-500">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-2 px-4 border-b border-gray-300">Time Submitted</th>
                <th className="py-2 px-4 border-b border-gray-300">Question</th>
                <th className="py-2 px-4 border-b border-gray-300">Platform</th>
                <th className="py-2 px-4 border-b border-gray-300">Sheet</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="py-2 px-4 border-b border-gray-300">1 day, 12 hours ago</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-600 hover:text-blue-700 cursor-pointer">
                  <Link to={"/"}>
                    Determine if Two Strings Are Close</Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-300">Leetcode</td>
                <td className="py-2 px-4 border-b border-gray-300">Striver Sheet</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">1 day, 12 hours ago</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-600 cursor-pointer">Unique Number of Occurrences</td>
                <td className="py-2 px-4 border-b border-gray-300">GFG</td>
                <td className="py-2 px-4 border-b border-gray-300">Neetcode Sheet</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-4 border-b border-gray-300">1 day, 12 hours ago</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-600 cursor-pointer">Find the Difference of Two Arrays</td>
                <td className="py-2 px-4 border-b border-gray-300">CSES</td>
                <td className="py-2 px-4 border-b border-gray-300">Love Babbar Sheet</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">1 day, 12 hours ago</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-600 cursor-pointer">Find Pivot Index</td>
                <td className="py-2 px-4 border-b border-gray-300">Leetcode</td>
                <td className="py-2 px-4 border-b border-gray-300">Striver Sheet</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-4 border-b border-gray-300">1 day, 12 hours ago</td>
                <td className="py-2 px-4 border-b border-gray-300 text-blue-600 cursor-pointer">Find the Highest Altitude</td>
                <td className="py-2 px-4 border-b border-gray-300">Codechef</td>
                <td className="py-2 px-4 border-b border-gray-300">Love Babbar Sheet</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          <button disabled className="flex text-[10px] font-semibold disabled:text-gray-300 text-gray-400 items-center group hover:text-gray-500">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 group-disabled:group-hover:translate-x-0 transition-all ease-in-out" />
            Prev
          </button>
          <button className="flex text-[10px] font-semibold text-blue-500 items-center group hover:text-blue-600">
            Next
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-all ease-in-out" />
          </button>
        </div>
      </div>
    </div>

  )
}

export default Submissions