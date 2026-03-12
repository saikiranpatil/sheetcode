# SheetCode

> A browser extension that automatically tracks your LeetCode problem submissions across curated coding sheets — so you can focus on solving, not bookkeeping.

---

## Overview

SheetCode is a Chrome extension built for developers who practice coding problems using structured sheets like **NeetCode 150** and **Blind 75**. Instead of manually marking problems as done, SheetCode monitors your LeetCode activity in the background and automatically records submissions the moment you solve a problem.

It pairs a compact **popup UI** (for quick glances) with a full **landing page dashboard** (for deeper progress tracking), all backed by a local IndexedDB database — no account, no server, no data leaving your browser.

---

## Features

- 🔍 **Auto-detection** — Detects when you're on a LeetCode problem page that belongs to an active sheet
- ✅ **Automatic submission tracking** — Listens for the Submit button click or `Ctrl+Enter` and records the result
- 🧩 **Curated sheets** — Ships with NeetCode 150 and Blind 75 built in; each sheet is broken into topics with individual problems
- 📊 **Progress dashboard** — Visualizes per-sheet progress with completion bars and circular indicators
- 🔥 **Streak tracking** — Calculates your current daily solving streak and today's solve count
- 📋 **Paginated submissions log** — Browse all past submissions with time, problem name, platform, and sheet
- 👤 **User profile** — Set a display name and avatar; stored locally in IndexedDB
- 🗺️ **Onboarding quick guide** — Step-by-step tour shown on first install
- 🔔 **Dynamic extension icon** — Icon changes to a green checkmark when you're on a tracked problem page
- 📦 **Fully local** — All data is stored in the browser via Dexie (IndexedDB); no external API calls

---

## Tech Stack

| Category | Technology |
|---|---|
| Extension framework | [WXT](https://wxt.dev/) v0.20 |
| UI library | React 19 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Component library | shadcn/ui (New York style) |
| Icons | Lucide React |
| Local database | Dexie (IndexedDB wrapper) |
| Build tool | Vite (via WXT) |
| Language | TypeScript 5 |

---

## Project Structure

```
src/
├── assets/
│   └── sheets/             # Built-in problem sheet JSON data (Blind75, NeetCode150)
├── components/
│   ├── layout/             # Navbar, ErrorPage, Spinner
│   ├── shared/             # Reusable components (Submission, Logo, CircularProgress, ArrowButton)
│   └── ui/                 # shadcn/ui primitives (Button, Card)
├── constants/              # App-wide constants, sheet data exports, navbar config, step guides
├── entrypoints/
│   ├── background/         # Service worker — handles install, message routing, icon refresh
│   ├── content/            # Content script injected into leetcode.com — tracks submit events
│   ├── landing/            # Full dashboard SPA (Home, Sheets, Submissions, QuickGuide pages)
│   └── popup/              # Extension popup (current problem + recent submissions)
├── hooks/
│   └── useFetch.ts         # Generic async data-fetching hook with loading/error state
├── lib/
│   ├── db/                 # Dexie database setup + repositories (Sheet, Submission, User)
│   └── utils/              # Helper functions (stats, time formatting, URL parsing, tab access)
└── types/                  # Shared TypeScript types (Sheet, Problem, Submission, User)
```

### Key files

| File | Purpose |
|---|---|
| `wxt.config.ts` | WXT configuration, manifest v3 definition, Vite plugins |
| `src/entrypoints/background/index.ts` | Service worker — first-install seeding, submission saving, icon state |
| `src/entrypoints/content/leetcode.ts` | MutationObserver that watches for submission results on LeetCode |
| `src/lib/db/index.ts` | Dexie database instance + repository factory functions |
| `src/lib/utils/common.ts` | Core utilities: streak calculation, sheet stats, URL-to-problem matching |

---

## Installation

### Prerequisites

- Node.js ≥ 18
- npm, yarn, or pnpm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/sheetcode.git
cd sheetcode

# 2. Install dependencies
npm install

# 3. Prepare WXT (generates type stubs)
# This runs automatically via the postinstall script, but you can run it manually:
npx wxt prepare
```

---

## Configuration

There are **no environment variables** required. All configuration lives in:

- **`wxt.config.ts`** — Extension name, version, permissions (`activeTab`, `tabs`), and icon paths
- **`src/constants/sheets.ts`** — Imports the bundled JSON sheet data (Blind75, NeetCode150)
- **`src/constants/index.ts`** — App-wide constants such as Chrome message event names, difficulty colors, and onboarding step definitions

To add a new problem sheet, drop a JSON file into `src/assets/sheets/` following the same shape as `Neetcode150.json` and import it in `src/constants/sheets.ts`.

---

## Usage

### Development

```bash
# Start Chrome extension in watch mode
npm run dev

# Start for Firefox
npm run dev:firefox
```

WXT will open a browser with the extension loaded automatically. Any source changes trigger a hot reload.

### Loading in Chrome manually

```bash
npm run build
```

Then:
1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `.output/chrome-mv3/` directory

### Building for production

```bash
# Chrome
npm run build

# Firefox
npm run build:firefox

# Create distributable zip
npm run zip
npm run zip:firefox
```

### Type checking (no emit)

```bash
npm run compile
```

---

## How It Works

1. **First install** — The background service worker seeds the local IndexedDB with the built-in sheets (NeetCode 150, Blind 75) and creates a default user profile. It then opens the landing page dashboard.

2. **Opening a problem** — When you click **Solve** on a sheet problem, the problem link includes a `sheetcodeSheetId` query parameter. The background script reads this to know which sheet and problem you're working on, and updates the extension icon to a green checkmark.

3. **Submitting a solution** — The content script (injected on `*.leetcode.com`) listens for the Submit button click or `Ctrl+Enter`. It then uses a `MutationObserver` to watch for the submission result element to appear in the DOM. On success, it sends a `SAVE_SUBMISSION` message to the background script, which marks the problem as solved in IndexedDB and records the submission timestamp.

4. **Dashboard** — The landing page SPA (opened via "Show more" in the popup) shows your profile, daily stats, ongoing sheets, and full submission history.

---

## Development

### Adding a new sheet

1. Create a JSON file in `src/assets/sheets/` with the following shape:

```json
{
  "name": "My Sheet",
  "description": "A description of the sheet.",
  "sheetColor": "green",
  "isActive": false,
  "topics": [
    {
      "name": "Arrays",
      "problems": [
        {
          "id": "unique-id",
          "name": "Two Sum",
          "platform": "LeetCode",
          "difficulty": "Easy",
          "isSolved": false,
          "link": "https://leetcode.com/problems/two-sum/"
        }
      ]
    }
  ]
}
```

2. Import and register it in `src/constants/sheets.ts`.

### Repository pattern

Database access goes through typed repository classes in `src/lib/db/`:

```ts
import { getSheetRepo, getSubmissionRepo, getUserRepo } from '@/lib/db';

// Example
const sheets = await getSheetRepo().filterAndSort(sheet => sheet.isActive);
const submissions = await getSubmissionRepo().getRecentSubmissions({ page: 1 });
```

### `useFetch` hook

All async data fetching in components uses the custom `useFetch` hook:

```ts
const { data, isLoading, error, reload } = useFetch({
  fetcher: useCallback(() => getSheetRepo().getAll(), []),
});
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Extension icon doesn't turn green on a problem page | Make sure you opened the problem via the **Solve** button in the SheetCode dashboard — the link must include the `sheetcodeSheetId` parameter |
| Submission not recorded | Confirm you're on a LeetCode problem page and that the submission result banner appeared. The MutationObserver times out after 10 seconds |
| Data appears missing after reinstall | IndexedDB is tied to the extension origin. Uninstalling the extension deletes all local data |
| `npm run dev` doesn't open a browser | Ensure WXT is installed correctly (`npm install`) and try running `npx wxt prepare` again |
| TypeScript errors after pulling changes | Run `npx wxt prepare` to regenerate WXT type stubs |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and type-check: `npm run compile`
4. Commit with a clear message: `git commit -m "feat: add my feature"`
5. Push and open a Pull Request

Please keep PRs focused on a single concern. For large changes, open an issue first to discuss the approach.
