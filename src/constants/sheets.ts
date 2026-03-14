import { blind75, neetcode150 } from "@/assets/sheets";
import { Sheet } from "../types";

export const sheetsData: Omit<Sheet, 'id'>[] = [
    neetcode150,
    blind75
];

export const sheetIdParamsTitle = "sheetcodeSheetId";