import neetcode75 from "@/shared/data/sheets/Neetcode75.json";
import { Sheet } from "../types";

export const sheetsData: Omit<Sheet, 'id'>[] = [
    neetcode75
];

export const sheetIdParamsTitle = "sheetcodeSheetId";