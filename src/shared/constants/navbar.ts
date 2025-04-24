import Home from "../../pages/Home";
import Sheets from "../../pages/Sheets";
import SheetsDetails from "../../pages/Sheets/SheetsDetails";
import Submissions from "../../pages/Submissions";

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