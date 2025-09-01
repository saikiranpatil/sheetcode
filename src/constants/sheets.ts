import neetcode150 from "@/assets/sheets/Neetcode150.json";
import blind75 from "@/assets/sheets/Blind75.json";
import { Sheet } from "../types";

export const sheetsData: Omit<Sheet, 'id'>[] = [
    neetcode150,
    blind75
];

export const sheetIdParamsTitle = "sheetcodeSheetId";