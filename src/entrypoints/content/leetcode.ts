export const trackSubmissions = () => {
    // handle submit button click
    const submitButton = getSubmitButton();
    submitButton?.addEventListener("click", () => {
        console.log("Submit button clicked");
        track();
    });

    // handle 'Ctrl + Enter' click
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            console.log("Ctrl + Enter pressed");
            track();
        }
    });
}

const track = () => {
    createMutation(document.body, 'span[data-e2e-locator="submission-result"]', () => {
        createSubmission();
    })
}

const getSubmitButton = () => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const submitButton = buttons.find(button => button.textContent?.toLocaleLowerCase().includes("submit"));
    return submitButton;
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
    });

    observer.observe(element, { childList: true, subtree: true });

    setTimeout(() => {
        console.log("Observer Closed");
        observer.disconnect();
    }, 10000);
}

const createSubmission = async () => {
    console.log("Creating submissions");

    chrome.runtime.sendMessage({
        type: "SAVE_SUBMISSION",
    }, (response) => {
        console.log("Submission added successfully:", response);
    });
};