import Spinner from "@/components/layout/Spinner";
import { getUserRepo } from "@/lib/db";
import { tsToString } from "@/lib/utils";
import UserDetailsModal from "@/entrypoints/landing/pages/Home/UserDetailsModal";

const UserProfile = () => {
    const { data, isLoading } = useFetch({
        fetcher: useCallback(() => getUserRepo().getUser(), [])
    });

    const profileUrl = data?.avatar ? URL.createObjectURL(data?.avatar) : null;

    return isLoading ? (
        <Spinner size="sm" />
    ) : (
        <div className="flex gap-4">
            <img
                className="h-20 w-20 rounded-sm"
                src={profileUrl || "avatar.png"}
                alt="Profile Image"
            />
            <div className="flex flex-col justify-between">
                <div>
                    <span className="text-sm font-semibold text-black mb-2">{data?.name || "Coder"}</span>
                    <p className="text-[10px] text-gray-500">Joined on {tsToString(data.joinedAt)}</p>
                    <span className="text-[10px] text-blue-400 hover:text-blue:500 hover:underline cursor-pointer">
                        Edit
                    </span>
                </div>
            </div>
            <UserDetailsModal />
        </div>
    )
}

export default UserProfile