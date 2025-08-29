import { trackSubmissions } from "@/entrypoints/content/leetcode";

export default defineContentScript({
    matches: ['*://*.leetcode.com/*'],
    main() {
        console.log('Hello from content.');
        trackSubmissions();
    },
});