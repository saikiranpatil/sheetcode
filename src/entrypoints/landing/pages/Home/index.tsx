import UserProfile from "@/entrypoints/landing/pages/Home/UserProfile"
import UserStats from "@/entrypoints/landing/pages/Home/UserStats"
import OngoingSheets from "@/entrypoints/landing/pages/Home/OngoingSheets"
import TodaysSubmissions from "@/entrypoints/landing/pages/Home/TodaysSubmissions"

const Home = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[250px_auto] p-4 gap-4">
            <div className="bg-white border rounded-sm p-4 w-full ">
                <UserProfile />
                <div className="w-full h-0.5 rounded-4xl bg-gray-100 mt-4 mb-3"></div>
                <UserStats />
                <OngoingSheets />
            </div>
            <TodaysSubmissions />
        </div>
    )
}

export default Home