import UserProfile from "./UserProfile"
import UserStats from "./UserStats"
import OngoingSheets from "./OngoingSheets"
import TodaysSubmissions from "./TodaysSubmissions"

const Home = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[250px_auto] p-4 gap-4">
            <div>
                <div className="bg-white rounded-sm p-4 w-full ">
                    <UserProfile />
                    <div className="w-full h-0.5 rounded-4xl bg-gray-100 mt-4 mb-3"></div>
                    <UserStats />
                    <OngoingSheets />
                </div>
            </div>
            <TodaysSubmissions />
        </div>
    )
}

export default Home