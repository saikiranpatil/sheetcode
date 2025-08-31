import { getUserRepo } from "@/lib/db";
import { addUserIfNotPresent } from "@/lib/utils";
import { User } from "@/types";
import { Loader, UserIcon } from "lucide-react";

interface UserDetailsModalProps {
    type?: 'welcome' | 'edit';
    isModalOpen: boolean;
    closeModal: () => void;
    user: User;
};

function UserDetailsModal({ type = "edit", user, isModalOpen, closeModal }: UserDetailsModalProps) {
    const [displayName, setDisplayName] = useState(user?.name || '');
    const [file, setFile] = useState<Blob | null>(user?.avatar || null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const previewUrl = useMemo(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            return url;
        }
    }, [file]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsLoading(true);
        await addUserIfNotPresent();
        
        const userRepo = getUserRepo();
        const userDetails = await userRepo.getUser();
        const userData = { avatar: file!, name: displayName, hasCompletedProfile: true };
        await userRepo.update(userDetails?.id || 1, userData);

        closeModal();
        setIsLoading(false);
    };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={
            type === "edit" ? (
                <div className="flex flex-col">
                    <h1 className="text-xl">Edit Profile</h1>
                    <span className="text-[10px] text-gray-400 font-normal">Fill the details below to edit your details</span>
                </div>
            ) : (
                <div className="flex flex-col">
                    <h1 className="text-xl">Welcome to Sheetcode</h1>
                    <span className="text-[10px] text-gray-400 font-normal">Fill the details below to get started</span>
                </div>
            )
        }>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div className="mb-4">
                    <label htmlFor="displayName" className="block text-[10px] font-semibold text-gray-700 mb-2">
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="'Coder' by default"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-[10px] font-semibold text-gray-700 mb-2">
                        Avatar
                    </label>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded bg-blue-100 text-blue-600">
                            {previewUrl ? (
                                <div>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-10 w-10 rounded border border-gray-300"
                                    />
                                </div>
                            ) : (
                                <UserIcon size={20} />
                            )}
                        </div>
                        <label
                            htmlFor="avatarUpload"
                            className="cursor-pointer px-3 py-1 rounded-md bg-gray-200 text-xs text-gray-700 hover:bg-gray-300"
                        >
                            Choose Picture
                        </label>
                        <input
                            type="file"
                            id="avatarUpload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className="text-right flex gap-2">
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded-md transition">
                            {isLoading ? (
                                <Loader className="h-4 animate-spin" />
                            ) : (
                                <span> {type === "edit" ? "Update" : "Get Started"} </span>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default UserDetailsModal