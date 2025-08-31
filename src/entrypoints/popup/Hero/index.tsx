import Spinner from "@/components/layout/Spinner";
import { Button } from "@/components/ui/button";
import Submissions from "@/entrypoints/popup/Submissions";
import { getProblemInSheet } from "@/lib/utils";

function Hero() {
    const { data, isLoading } = useFetch({
        fetcher: useCallback(() => getProblemInSheet(), [])
    });

    const openLanding = () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('/landing.html') })
    };

    return isLoading ? (
        <Spinner size="sm" />
    ) : (
        <div className="flex flex-col justify-between w-full px-2 py-4 gap-4">
            <div className="flex gap-4">
                <div className="w-1/2 bg-white border rounded-sm p-4" title={data?.problem?.name}>
                    <span className="text-[10px] text-gray-500">Current Problem</span>
                    <p className="w-full overflow-hidden text-nowrap text-ellipsis font-semibold text-orange-500">{data?.problem?.name || '-'}</p>
                </div>
                <div className="w-1/2 bg-white border rounded-sm p-4" title={data?.sheet?.name}>
                    <span className="text-[10px] text-gray-500">Current Sheet</span>
                    <p className="w-full overflow-hidden text-nowrap text-ellipsis font-semibold text-blue-500">{data?.sheet?.name || '-'}</p>
                </div>
            </div>
            <Submissions problemId={data?.problem?.id || ''} />
            <Button onClick={openLanding}>Show more</Button>
        </div>
    );
}

export default Hero