import { trackSubmissions } from "@/entrypoints/content/leetcode";

export default defineContentScript({
    matches: ['*://*.leetcode.com/*'],
    main() {
        trackSubmissions();
    },
});