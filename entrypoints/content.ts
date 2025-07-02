import { chromeEvents } from "../shared/constants";

export default defineContentScript({
  matches: ['*://*.leetcode.com/*'],
  main() {
    console.log('Hello content.');

    const buttons = Array.from(document.querySelectorAll("button"));
    const submitButton = buttons.find(button => button.textContent?.toLocaleLowerCase().includes("submit"));

    submitButton?.addEventListener("click", () => {
      console.log("Submit button clicked");
      trackSubmissions();
    });

    const trackSubmissions = () => {
      createMutation(document.body, 'span[data-e2e-locator="submission-result"]', () => {
        createSubmission();
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
      }, 10000);
    }

    const createSubmission = async () => {
      console.log("Creating submissions");

      chrome.runtime.sendMessage({
        type: chromeEvents.SAVE_SUBMISSION,
      }, (response) => {
        console.log("Submission added successfully:", response);
      });
    };
  },
});