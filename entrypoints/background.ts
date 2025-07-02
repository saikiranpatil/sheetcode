import { db } from "@/lib/db/MyDB";
import { chromeEvents } from "@/shared/constants";
import { sheetIdParamsTitle } from "@/shared/constants/sheets";
import { Submission } from "@/shared/types";

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === chromeEvents.SAVE_SUBMISSION) {
      handleSaveSubmission().then(sendResponse).catch(error => {
        console.error("Error saving submission:", error);
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }
    return false;
  });

  async function handleSaveSubmission() {
    const tab = await getCurrentActiveTab();
    const tabUrl = tab?.url;
    if (!tabUrl) throw new Error("Unable to retrieve current tab URL");

    const url = new URL(tabUrl);
    const sheetIdStr = url.searchParams.get(sheetIdParamsTitle);
    const sheetId = Number(sheetIdStr);

    if (!sheetIdStr || isNaN(sheetId)) {
      throw new Error("Invalid or missing Sheet ID in URL");
    }

    const sheet = await db.sheetRepo.getById(sheetId);
    if (!sheet) throw new Error("Sheet not found");

    for (const problemList of sheet.problemsList) {
      const problem = problemList.problems.find(p => url.href.startsWith(p.link));
      if (problem) {
        const submission: Submission = {
          problemId: problem.id,
          sheetId: sheet.id!,
          submittedAt: Date.now(),
        };

        const result = await db.submissionRepo.add(submission);
        return { success: true, id: result };
      }
    }

    throw new Error("Problem not matched in the current sheet");
  }

  function getCurrentActiveTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        if (!tabs.length) {
          return reject(new Error("No active tab found"));
        }
        resolve(tabs[0]);
      });
    });
  }
});