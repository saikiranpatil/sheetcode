import { CheckCircle, ChevronLeft, ChevronRight, Circle, ExternalLink, MoreHorizontal, Play, Target } from "lucide-react"
import { Link, useParams } from "react-router"
import { sheetIdParamsTitle } from "@/shared/constants/sheets";

const SheetsDetails = () => {
    const { id } = useParams();
    if (!id) return <>Invalid id</>

    const sheets = useGetSheets();
    if(!sheets) return <>no sheets</>;
    const sheet = sheets.find(sheet => sheet.id === id);

    if (!sheet) return <>Sheet Not found</>

    const { sheetColor } = sheet;

    const getDifficultyColor = (difficulty: any) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-600 bg-green-50';
            case 'Medium': return 'text-yellow-600 bg-yellow-50';
            case 'Hard': return 'text-red-600 bg-red-50';
        }
    };

    const getUrlWithSheetId = (urlString: string) => {
        const url = new URL(urlString);
        url.searchParams.set(sheetIdParamsTitle, sheet.id!);
        return url.href;
    }

    return (
        <div className="p-4 flex flex-col space-y-4">
            <div className="flex justify-between">
                <Link
                    to={"/sheets"}
                    className="bg-white rounded-sm p-1">
                    <ChevronLeft className="h-4 w-4 text-gray-500" />
                </Link>
                <button
                    className="bg-white rounded-sm p-1">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </button>
            </div>
            <div className="grid sm:grid-cols-[250px_auto] gap-10 p-4">
                <div className={`hidden sm:flex aspect-square p-4 bg-gradient-to-b from-${sheetColor}-500 from-5% via-${sheetColor}-700 via-[percentage:10%_70%] to-${sheetColor}-900 to-100% rounded-sm items-center justify-center`}>
                    <Target className={`w-full h-full text-${sheetColor}-200`} />
                </div>
                <div className="my-auto">
                    <h1 className="text-2xl font-bold">{sheet.name}</h1>
                    <p className="text-xs text-gray-600 w-full">{sheet.description}</p>
                    <div className="w-full space-y-4 mt-4">
                        {sheet.isOngoing ?
                            <div className="space-y-1">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-300 to-blue-500 h-2 rounded-full"
                                        style={{ width: `${(sheet.completionCount / sheet.problemsCount) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex text-sm justify-between">
                                    <span className="text-gray-500">Problems Solved</span>
                                    <span className="text-black/50"> <span className="font-semibold text-black">{sheet.completionCount}</span> /{sheet.problemsCount}</span>
                                </div>
                            </div>
                            :
                            <button className="flex justify-center items-center bg-black/90 text-white px-3 py-2 rounded-full gap-2 text-sm shadow-md shadow-gray-500 cursor-pointer hover:bg-black/80">
                                <Play className="h-4 w-4" />
                                Start
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-sm space-y-4 p-4">
                {sheet.problemsList.map((problemTopic, topicIndex) => (
                    <details key={[id, problemTopic, topicIndex].join("-")} className="min-w-full rounded-sm bg-white border border-gray-200 text-xs text-gray-500 group">
                        <summary className="flex justify-between bg-gray-100 text-left text-gray-600 p-2 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 group-open:rotate-90" />
                                <span className="font-medium text-sm">{problemTopic.topic}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                                {problemTopic.completionCount}/{problemTopic.problemsCount} solved
                            </div>
                        </summary>
                        {problemTopic.problems.map((problem, index) => (
                            <div
                                key={[id, problemTopic, problem.name, index].join("-")}
                                className="bg-white px-4 py-2 border-b border-gray-300 flex justify-between rounded-sm"
                            >
                                <div className="flex items-center gap-2">
                                    {problem.isSolved ?
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        :
                                        <Circle className="h-4 w-4 text-gray-300" />
                                    }
                                    <div className="text-sm">{problem.name}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className={"text-xs px-2 py-1 rounded-full font-medium"}>
                                        {problem.platform}
                                    </span>
                                    <Link
                                        to={getUrlWithSheetId(problem.link)}
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