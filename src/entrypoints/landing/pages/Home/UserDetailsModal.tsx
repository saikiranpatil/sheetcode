import { CircleUserRound, User } from "lucide-react";

function UserDetailsModal() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Display Name:", displayName);
        console.log("Selected File:", file);
        // handle upload logic here
    };

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={
            <>
                <div className="flex flex-col">
                    <h1 className="text-xl">Welcome to Sheetcode</h1>
                    <span className="text-[10px] text-gray-400 font-normal">Fill the details below to get started</span>
                </div>
            </>
        }>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {previewUrl && (
                    <div className="mb-4">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-24 rounded border border-gray-300"
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="displayName" className="block text-[10px] font-semibold text-gray-700">
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">
                        Avatar
                    </label>
                    <div>
                        <label
                            htmlFor="fileUpload"
                            className="cursor-pointer inline-block p-2 border border-blue-500 text-blue-500 text-sm font-medium rounded hover:bg-gray-100 hover:border-blue-600 hover:text-blue-600"
                        >
                            <div className="flex justify-center items-center">
                                <CircleUserRound className="h-4" />
                                <span className="text-[10px]">Choose Picture</span>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="fileUpload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>
            </form>
            <div className="text-right flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                    Get Started
                </button>
            </div>
        </Modal>
    )
}

export default UserDetailsModal