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
        displaySuccessModal();
    });
}

const displaySuccessModal = () => {
    const modal = document.createElement('div');
    modal.id = 'success-modal';
    modal.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]';

    const modalContent = document.createElement('div');
    modalContent.className = 'text-black p-6 text-center animate-fadeIn transition-opacity duration-300 max-w-sm w-full';

    const heading = document.createElement('h2');
    heading.id = 'modal-heading';
    heading.className = 'text-lg text-white font-semibold mb-4';
    heading.textContent = 'Submission successfully tracked on Sheetcode';

    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'flex justify-center mb-4';

    svgWrapper.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            stroke="green"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="12" cy="12" r="10" stroke="green" stroke-width="2" fill="#d4edda"/>
            <path d="M9 12l2 2 4-4" />
        </svg>
    `;

    modalContent.appendChild(svgWrapper);
    modalContent.appendChild(heading);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.remove();
    }, 1500);
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