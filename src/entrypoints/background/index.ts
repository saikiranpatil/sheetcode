import { ProblemMatchResult, Submission } from "@/types";
import { chromeEvents, sheetIdParamsTitle, sheetsData } from "@/constants";
import { getSheetRepo, getSubmissionRepo } from "@/lib/db";

export default defineBackground(() => {
    chrome.runtime.onInstalled.addListener(async () => {
        try {
            const existingSheetsCount = await getSheetRepo().count();
            if (existingSheetsCount === 0) {
                await getSheetRepo().bulkAdd(sheetsData);
            }
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
        // Check if the URL has changed
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
                    16: "icon/checked/16X16.png",
                    32: "icon/checked/32X32.png",
                    192: "icon/checked/192X192.png",
                    180: "icon/checked/180X180.png"
                }
            });
        }).catch((error) => {
            console.log(error);

            chrome.action.setTitle({ title: "Sheetcode: Visit valid problem page to track submissions" });
            chrome.action.setIcon({
                path: {
                    16: "icon/16X16.png",
                    32: "icon/32X32.png",
                    192: "icon/192X192.png",
                    180: "icon/180X180.png"
                }
            });
        })
    }

    async function getProblemInSheet(): Promise<ProblemMatchResult> {
        const tab = await getCurrentActiveTab();
        const tabUrl = tab?.url;

        if (!tabUrl) {
            throw new Error("Unable to retrieve current tab URL");
        }

        const url = new URL(tabUrl);
        const sheetId = url.searchParams.get(sheetIdParamsTitle);

        if (!sheetId || isNaN(Number(sheetId))) {
            throw new Error("Invalid or missing Sheet ID in URL");
        }

        const numericSheetId = Number(sheetId);
        const sheet = await getSheetRepo().getById(numericSheetId);

        if (!sheet) {
            throw new Error(`Sheet with ID ${numericSheetId} not found`);
        }

        const currentUrl = tabUrl.toLowerCase().replace(/\/$/, '');

        for (let topicIndex = 0; topicIndex < sheet.topics.length; topicIndex++) {
            const topic = sheet.topics[topicIndex];

            for (let problemIndex = 0; problemIndex < topic.problems.length; problemIndex++) {
                const problem = topic.problems[problemIndex];
                const problemUrl = problem.link.toLowerCase().replace(/\/$/, '');

                if (currentUrl.startsWith(problemUrl)) {
                    return { sheet, problem, topicIndex, problemIndex };
                }
            }
        }

        throw new Error("Problem not found. Make sure you're on correct problem page.");
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




        // const tab = await getCurrentActiveTab();
        // const tabUrl = tab?.url;

        // if (!tabUrl) {
        //     throw new Error("Unable to retrieve current tab URL");
        // }

        // const url = new URL(tabUrl);
        // const sheetId = url.searchParams.get(sheetIdParamsTitle);

        // if (!sheetId || isNaN(Number(sheetId))) {
        //     throw new Error("Invalid or missing Sheet ID in URL");
        // }

        // const numericSheetId = Number(sheetId);
        // const sheet = await getSheetRepo().getById(numericSheetId);

        // if (!sheet) {
        //     throw new Error(`Sheet with ID ${numericSheetId} not found`);
        // }

        // // Normalize URLs for more reliable matching
        // const currentUrl = url.href.toLowerCase().replace(/\/$/, '');

        // for (const topic of sheet.topics) {
        //     const problem = topic.problems.find(p => {
        //         const problemUrl = p.link.toLowerCase().replace(/\/$/, '');
        //         return currentUrl.startsWith(problemUrl);
        //     });

        //     if (problem) {
        //         const submission: Submission = {
        //             problemId: problem.id,
        //             sheetId: sheet.id!,
        //             submittedAt: Date.now(),
        //         };

        //         try {
        //             const result = await getSubmissionRepo().add(submission);

        //             if (!problem.isSolved) {
        //                 let updatedTopics = sheet.topics.map(topic => ({
        //                     ...topic,
        //                     problems: topic.problems.map(p =>
        //                         p.id === problem.id
        //                             ? { ...p, isSolved: true, solvedAt: Date.now() }
        //                             : p
        //                     ),
        //                 }));

        //                 updatedTopics = updatedTopics.map(topic => ({
        //                     ...topic,
        //                     solvedCount: topic.problems.reduce((sum, problem) => sum + (problem.isSolved ? 1 : 0), 0)
        //                 }));

        //                 await getSheetRepo().update(sheet?.id!, { topics: updatedTopics });
        //             }

        //             return { success: true, id: result, problemName: problem.name };

        //         } catch (error) {
        //             throw new Error(`Failed to save submission`);
        //         }
        //     }
        // }

        // throw new Error("Problem not found in the current sheet. Make sure you're on a problem page from this sheet.");
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