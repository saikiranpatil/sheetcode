import { CheckCircle, ChevronLeft, ChevronRight, Circle, ExternalLink, Play, Target } from "lucide-react"
import { Link, useParams } from "react-router"
import { useCallback } from "react";
import { getSheetDetails, getSheetHeroIconStyle, getUrlWithSheetId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/layout/Spinner";
import ErrorPage from "@/components/layout/ErrorPage";
import { difficultyColor } from "@/constants";
import { getSheetRepo } from "@/lib/db";

const SheetsDetails = () => {
    const { id } = useParams();

    const { data: sheet, isLoading } = useFetch({
        fetcher: useCallback(() => getSheetRepo().getById(Number(id || '')), [])
    });

    const { completionCount, completionRatio, problemCount } = getSheetDetails(sheet);

    return !sheet ? (
        <ErrorPage title={"Sheet not found"} />
    ) : isLoading ? (
        <Spinner size="md" />
    ) : (
        <div className="p-4 flex flex-col space-y-4">
            <div className="flex justify-between">
                <Link
                    to={"/sheets"}
                    className="bg-white border rounded-sm p-1 my-auto">
                    <ChevronLeft className="h-4 w-4 text-gray-500" />
                </Link>
                {/* <Button className="bg-white border rounded-sm p-1">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </Button> */}
            </div>
            <div className="grid sm:grid-cols-[250px_auto] gap-10 p-4">
                <div className={`hidden sm:flex aspect-square p-4 bg-gradient-to-tr from-5% via-[percentage:10%_70%] to-100% rounded-sm items-center justify-center ${getSheetHeroIconStyle(sheet?.sheetColor).body}`}>
                    <Target className={`w-full h-full ${getSheetHeroIconStyle(sheet?.sheetColor).icon}`} />
                </div>
                <div className="my-auto">
                    <h1 className="text-2xl font-bold">{sheet.name}</h1>
                    <p className="text-xs text-gray-600 w-full">{sheet.description}</p>
                    <div className="w-full space-y-4 mt-4">
                        {sheet.isActive ?
                            <div className="space-y-1">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-300 to-blue-500 h-2 rounded-full"
                                        style={{ width: `${completionRatio * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex text-sm justify-between">
                                    <span className="text-gray-500">Problems Solved</span>
                                    <span className="text-black/50"> <span className="font-semibold text-black">{completionCount}</span> /{problemCount}</span>
                                </div>
                            </div>
                            :
                            <Button className="flex justify-center items-center bg-black/90 text-white px-3 py-2 rounded-full gap-2 text-sm shadow-md shadow-gray-500 cursor-pointer hover:bg-black/80">
                                <Play className="h-4 w-4" />
                                Start
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-sm space-y-4 p-4">
                {sheet.topics.map((topic, topicIndex) => (
                    <details key={[id, topic, topicIndex].join("-")} className="min-w-full rounded-sm bg-white border border-gray-200 text-xs text-gray-500 group">
                        <summary className="flex justify-between bg-gray-100 text-left text-gray-600 p-2 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 group-open:rotate-90" />
                                <span className="font-medium text-sm">{topic.name}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                                {topic?.solvedCount || 0}/{topic.problems.length} solved
                            </div>
                        </summary>
                        {topic.problems.map((problem, index) => (
                            <div
                                key={[id, topic, problem.name, index].join("-")}
                                className="bg-white px-4 py-2 border-b border-gray-300 flex justify-between rounded-sm"
                            >
                                <div className="flex items-center gap-2">
                                    {problem.isSolved ?
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        :
                                        <Circle className="h-4 w-4 text-gray-300" />
                                    }
                                    <div className="text-sm">{problem.name}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor[problem.difficulty as 'Easy' | 'Medium' | 'Hard'] || ''}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className={"text-xs px-2 py-1 rounded-full font-medium"}>
                                        {problem.platform}
                                    </span>
                                    <Link
                                        to={getUrlWithSheetId(problem.link, (sheet?.id || '') as string)}
                                        className="flex bg-blue-500 hover:bg-blue-500/90 text-white rounded-full px-2 py-1 gap-1 text-[10px]"
                                        target="_blank"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        <span>Solve</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </details>
                ))}
            </div>
        </div>
    )
}

export default SheetsDetails