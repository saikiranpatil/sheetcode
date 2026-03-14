import { getSubmissionRepo } from "@/lib/db";
import Submission from "@/components/shared/Submission";
import Spinner from "@/components/layout/Spinner";
import React, { useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import ArrowButton from "@/components/shared/ArrowButton";

const Submissions = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetch({
    fetcher: useCallback(() => getSubmissionRepo().getRecentSubmissions({ page }), [page])
  });

  console.log(data);

  return isLoading ? (
    <Spinner size="sm" />
  ) : (
    <div className="w-full p-4">
      <div className="bg-white border rounded-sm space-y-4 w-full p-4">
        <div className="text-sm tracking-wide">All Submissions</div>
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
              {data && data.submissions && data.submissions.map(submission => <Submission submission={submission} type="submissions" />)}
              <p className="first:block hidden text-xs text-muted-foreground italic py-3 px-6">No Submissions</p>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <ArrowButton
            arrowDirection="left"
            disabled={page < 2}
            onClick={() => setPage(pg => pg - 1)}
          >
            Prev
          </ArrowButton>
          {data && data.submissions && data.submissions.length > 0 && (
            <span className="text-[10px] text-gray-400">
              Page {data.page} of {data.totalPages} (Showing {data.submissions.length} of {data.total} items)
            </span>
          )}
          <ArrowButton
            arrowDirection="right"
            disabled={page + 1 > data.totalPages}
            onClick={() => setPage(pg => pg + 1)}
          >
            Next
          </ArrowButton>
        </div>
      </div>
    </div>
  )
}
export default Submissions