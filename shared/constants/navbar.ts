import Home from "@/entrypoints/home/components/Home";
import Sheets from "@/entrypoints/home/components/Sheets";
import SheetsDetails from "@/entrypoints/home/components/Sheets/SheetsDetails";
import Submissions from "@/entrypoints/home/components/Submissions";

export const navItems = [
    {
        title: "Home",
        url: "",
        isNavItem: true,
        element: Home
    },
    {
        title: "Submissions",
        url: "submissions",
        isNavItem: true,
        element: Submissions
    },
    {
        title: "Sheets",
        url: "sheets",
        isNavItem: true,
        element: Sheets
    },
    {
        title: "Sheet Details",
        url: "sheets/:id",
        isNavItem: false,
        element: SheetsDetails
    },
]