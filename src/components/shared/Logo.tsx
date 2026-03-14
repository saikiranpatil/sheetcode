function Logo() {
    return (
        <div className="flex justify-center items-center gap-1">
            <img src="svg/sheetcode.svg" className="h-6 w-auto " />
            <span className="text-xl font-bold text-blue-500 tracking-wide">
                Sheet
                <span className="text-xl font-bold text-orange-500 tracking-wide">
                    Code
                </span>
            </span>
        </div>
    )
}

export default Logo