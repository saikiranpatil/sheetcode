import UserDetailsModal from "@/entrypoints/landing/pages/Home/UserDetailsModal";

import Spinner from "@/components/layout/Spinner";

import { getUserRepo } from "@/lib/db";
import { addUserIfNotPresent, tsToString } from "@/lib/utils";

const UserProfile = () => {
    const { data, isLoading, reload } = useFetch({
        fetcher: useCallback(async () => {
            await addUserIfNotPresent();
            return getUserRepo().getUser()
        }, [])
    });
    const profileUrl = data?.avatar ? URL.createObjectURL(data?.avatar) : null;
    const [modalType, setModalType] = useState<undefined | "welcome" | "edit">(data?.hasCompletedProfile === false ? "welcome" : undefined);

    useEffect(() => {
        if (data && data.hasCompletedProfile === false) {
            setModalType("welcome");
        }
    }, [data]);

    return isLoading ? (
        <Spinner size="sm" />
    ) : (
        <div className="flex gap-4">
            <div className="border border-gray-200 rounded">
                <img
                    className="h-20 w-20 rounded-sm"
                    src={profileUrl || "avatar.png"}
                    alt="Profile Image"
                />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <span className="text-sm font-semibold text-black mb-2">{data?.name || "Coder"}</span>
                    <p className="text-[10px] text-gray-500">Joined on {tsToString(data.joinedAt)}</p>
                    <span onClick={() => setModalType("edit")} className="text-[10px] text-blue-400 hover:text-blue:500 hover:underline cursor-pointer">
                        Edit
                    </span>
                </div>
            </div>
            <UserDetailsModal
                user={data}
                type={modalType}
                isModalOpen={modalType !== undefined}
                closeModal={() => {
                    reload();
                    setModalType(undefined);
                }}
            />
        </div>
    )
}

export default UserProfile