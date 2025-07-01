// export default defineContentScript({
//   matches: ['*://*.google.com/*'],
//   main() {
//     console.log('Hello content.');
//   },
// });

import { db } from "@/lib/db/MyDB";


export default defineContentScript({
  matches: ['*://*.leetcode.com/*'],
  main() {
    console.log('Hello content.');

    const buttons = Array.from(document.querySelectorAll("button"));
    const submitButton = buttons.find(button => button.textContent?.toLocaleLowerCase().includes("submit"));

    submitButton?.addEventListener("click", () => {
      console.log("Submit button clicked");
      createSubmission();
      // trackSubmissions();
    })
  },
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
  console.log("Creating submissions")
  const newSubmission = {
    sheetId: "8e6c7f15-e20f-44de-9d41-926e92cdee12",
    problemId: "climbing-stairs",
    submittedAt: new Date().getTime()
  };

  const result = await db.submissionRepo.add(newSubmission);
  console.log('Submission added:', result);
  // try {
  //   const { currentProblem, currentSheet } = await getCurrentProblem();

  //   if (currentProblem && currentSheet) {
  //     const newSubmission: Submission = {
  //       problem: currentProblem,
  //       sheet: currentSheet,
  //       submittedAt: new Date().getTime(),
  //     };
  //     await addToStore(DB_STORES.SUBMISSIONS, newSubmission);
  //     console.log("Submission added successfully:", newSubmission);
  //   }
  // } catch (error) {
  //   console.error("Failed to create submission:", error);
  // }
};