import { getCurrentProblem } from "../../../utils/getCurrentProblem";
import { DB_STORES } from "../../../shared/constants";
import { Submission } from "../../../shared/types";
import { addToStore } from "../../../utils/idbHelpers";

const buttons = Array.from(document.querySelectorAll("button"));
const submitButton = buttons.find(button => button.innerText.toLocaleLowerCase().includes("submit"));

submitButton?.addEventListener("click", () => {
    console.log("Submit button clicked");
    trackSubmissions();
})

const trackSubmissions = () => {
    createMutation(document.body, 'div.mx-auto.flex.w-full.max-w-\\[700px\\].flex-col.gap-4', () => {
        createMutation(document.body, 'span[data-e2e-locator="submission-result"]', () => {
            createSubmission();
        })
    })
}

const createMutation = (element: Element, targetSelector: string, callback?: () => void) => {
    console.log("Mutation observer started for selector: ", targetSelector);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        const targetElement: HTMLElement | null = (node as HTMLElement).querySelector(targetSelector);

                        if (targetElement) {
                            console.log("Mutation found at", node, " for ", targetSelector);

                            callback?.();
                            observer.disconnect();
                        }

                    }
                });
            }
        }
    })

    observer.observe(element, { childList: true, subtree: true })

    setTimeout(() => {
        console.log("Observer Closed");
        observer.disconnect();
    }, 5000);
}

const createSubmission = async () => {
    try {
        const { currentProblem, currentSheet } = await getCurrentProblem();

        if (currentProblem && currentSheet) {
            const newSubmission: Submission = {
                problem: currentProblem,
                sheet: currentSheet,
                submittedAt: new Date().getTime(),
            };
            await addToStore(DB_STORES.SUBMISSIONS, newSubmission);
            console.log("Submission added successfully:", newSubmission);
        }
    } catch (error) {
        console.error("Failed to create submission:", error);
    }
};