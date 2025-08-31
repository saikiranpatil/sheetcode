import { getSubmissionRepo } from "@/lib/db";
import Spinner from "@/components/layout/Spinner";
import Submission from "@/components/shared/Submission";
import useFetch from "@/hooks/useFetch";
import { useCallback } from "react";
import { Submission as SubmissionType } from "@/types";

interface SubmissionsProps {
  problemId: string;
};

const Submissions = ({ problemId }: SubmissionsProps) => {
  const { data, isLoading } = useFetch({
    fetcher: useCallback(() => getSubmissionRepo().getRecentSubmissions({
      filterFn: (sub: SubmissionType) => {
        return problemId === sub.problemId;
      }
    }), [problemId])
  });

  return isLoading ? (
    <Spinner size="sm" />
  ) : (
    <div className="w-full">
      <div className="bg-white border rounded-sm space-y-4 w-full p-4">
        <div className="text-xs tracking-wide">Submissions of Current Problem</div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 text-[10px] text-gray-500">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-2 px-4 border-b border-gray-300">Time Submitted</th>
              </tr>
            </thead>
            <tbody>
              {data && data.submissions && data.submissions.map(submission => <Submission submission={submission} type="popup" />)}
              <p className="first:block hidden text-xs text-muted-foreground italic py-3 px-6">No Submissions</p>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Submissions