const UserProfile = () => {
    return (
        <div className="flex gap-4">
            <img
                className="h-20 w-20 rounded-sm"
                src="https://assets.leetcode.com/users/avatars/avatar_1672642506.png"
                alt="Profile Image"
            />
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-sm font-semibold text-black">Saikiran Patil</h1>
                    <p className="text-xs text-gray-500">saikiranpatil</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfile