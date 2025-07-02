import { navItems } from "@/shared/constants"
import { NavLink } from "react-router"

const Navbar = () => {
    return (
        <div className="bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="px-4 py-2 flex items-center justify-between gap-2">
                    <h1 className="font-bold text-blue-500 tracking-wide">
                        📝Sheetcode
                    </h1>
                    <div className="flex gap-4 font-semibold">
                        {navItems.filter(item => item.isNavItem).map((navItem, idx) =>
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