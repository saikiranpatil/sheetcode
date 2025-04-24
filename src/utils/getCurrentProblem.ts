import { DB_STORES } from "../shared/constants";
import { sheetIdParamsTitle } from "../shared/constants/sheets";
import { ProblemSheet } from "../shared/types";
import { getCurrentTabUrl } from "./getCurrentTabUrl";
import { getAllFromStore } from "./idbHelpers";

export const getCurrentProblem = async () => {
    const tabUrl = await getCurrentTabUrl();
    console.log("tabUrl", tabUrl);

    if (!tabUrl) {
        throw new Error("Unable to retrieve the current tab URL.");
    }

    const url = new URL(tabUrl);
    const sheetId = url.searchParams.get(sheetIdParamsTitle);
    console.log("url, sheetId ", url, sheetId);
    if (!sheetId) {
        throw new Error("Sheet ID not found in the URL.");
    }

    const sheets: ProblemSheet[] = await getAllFromStore(DB_STORES.SHEETS);
    const sheet = sheets.find(sheet => sheet.id === sheetId);
    console.log("sheets, sheet", sheets, sheet);
    if (!sheet) {
        throw new Error("Sheet not found in the database.");
    }

    const problemsListIdx = sheet.problemsList.findIndex(({ problems }) =>
        problems.some(problem => url.href.startsWith(problem.link))
    );
    if (problemsListIdx === -1) {
        throw new Error("Problem list not found in the sheet.");
    }

    const problemIdx = sheet.problemsList[problemsListIdx].problems.findIndex(problem =>
        url.href.startsWith(problem.link)
    );
    if (problemIdx === -1) {
        throw new Error("Problem not found in the problem list.");
    }

    const problem = sheet.problemsList[problemsListIdx].problems[problemIdx];

    return { currentProblem: problem, currentSheet: sheet };
};