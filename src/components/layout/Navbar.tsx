import { navItems } from "@/constants/navbar"
import { NavLink } from "react-router"

const Navbar = () => {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-3xl md:max-w-[80vw] mx-auto">
                <div className="px-4 py-2 flex items-center justify-between gap-2">
                    <div className="flex justify-center items-center gap-1">
                        <img src="sheetcode.svg" className="h-6 w-auto " />
                        <span className="text-xl font-bold text-blue-500 tracking-wide">
                            Sheet
                            <span className="text-xl font-bold text-orange-500 tracking-wide">
                                Code
                            </span>
                        </span>
                    </div>
                    <div className="flex gap-4 font-semibold">
                        {navItems.map((navItem, idx) =>
                            <NavLink
                                to={navItem.url}
                                key={"nav-item-" + idx + "-" + navItem.title}
                                className={({ isActive }) => "text-xs " + (isActive ? "text-black" : "text-black/50 hover:text-gray-500")}
                            >
                                {navItem.title}
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar