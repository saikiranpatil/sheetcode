import { Submission } from "@/types";
import { chromeEvents, sheetsData } from "@/constants";
import { getSheetRepo, getSubmissionRepo } from "@/lib/db";
import { addUserIfNotPresent, getProblemInSheet } from "@/lib/utils";

export default defineBackground(() => {
    chrome.runtime.onInstalled.addListener(async () => {
        try {
            await handleFirstLogin();
        } catch (error) {
            console.error('Error during first-time setup:', error);
        }

        chrome.tabs.create({
            url: chrome.runtime.getURL('landing.html')
        });
    });

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

    chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
        if (changeInfo.url) {
            refreshIcon();
        }
    });

    chrome.tabs.onActivated.addListener((activeInfo) => {
        chrome.tabs.get(activeInfo.tabId, () => {
            refreshIcon();
        });
    });

    function refreshIcon() {
        getProblemInSheet().then((res) => {
            console.log(res);

            chrome.action.setTitle({ title: "Sheetcode: Enjoy coding, problems tracking is on us" });
            chrome.action.setIcon({
                path: {
                    16: "icon/checked/16x16.png",
                    32: "icon/checked/32x32.png",
                    192: "icon/checked/192x192.png",
                    180: "icon/checked/180x180.png"
                }
            });
        }).catch((error) => {
            console.log(error);

            chrome.action.setTitle({ title: "Sheetcode: Visit valid problem page to track submissions" });
            chrome.action.setIcon({
                path: {
                    16: "icons/16x16.png",
                    32: "icons/32x32.png",
                    192: "icons/192x192.png",
                    180: "icons/180x180.png"
                }
            });
        })
    }

    async function handleSaveSubmission() {
        try {
            const { sheet, problem, problemIndex, topicIndex } = await getProblemInSheet();

            if (!problem.isSolved) {
                const updatedTopics = [...sheet.topics];
                const updatedTopic = { ...updatedTopics[topicIndex] };
                const updatedProblems = [...updatedTopic.problems];
                updatedProblems[problemIndex] = {
                    ...updatedProblems[problemIndex],
                    isSolved: true,
                };
                updatedTopic.problems = updatedProblems;
                updatedTopic.solvedCount = updatedProblems.filter(p => p.isSolved).length;
                updatedTopics[topicIndex] = updatedTopic;

                await getSheetRepo().update(sheet.id!, { topics: updatedTopics });
            }

            const submission: Submission = {
                problemId: problem.id,
                sheetId: sheet.id!,
                submittedAt: Date.now(),
            };
            const result = await getSubmissionRepo().add(submission);

            return { success: true, id: result, problemName: problem.name };
        } catch (error) {
            return { success: false };
        }
    }

    async function handleFirstLogin() {
        const existingSheetsCount = await getSheetRepo().count();
        if (existingSheetsCount === 0) {
            await getSheetRepo().bulkAdd(sheetsData);
        }

        await addUserIfNotPresent();
    }
});