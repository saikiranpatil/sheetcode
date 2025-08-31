import { MS_PER_DAY, sheetHeroStyles, sheetIdParamsTitle } from "@/constants";
import { ProblemMatchResult, Sheet, Submission } from "@/types";
import { getSheetRepo, getUserRepo } from "@/lib/db";

export const getSheetDetails = (sheet?: Sheet) => {
    const completionCount = sheet?.topics?.reduce((s, pl) => s + pl.problems.reduce((sum, problem) => sum + (problem.isSolved ? 1 : 0), 0), 0) || 0;
    const problemCount = sheet?.topics?.reduce((s, pl) => s + pl.problems.length, 0) || 0;
    const completionRatio = completionCount && problemCount && problemCount > 0 ? completionCount / problemCount : 0;
    const completionRate = Math.ceil(completionRatio * 100);
    return {
        completionCount,
        problemCount,
        completionRatio,
        completionRate
    };
};

export const extractStats = (submissions: Submission[]): {
    currentStreak: number;
    totalSolved: number;
    solvedToday: number;
} => {
    if (!submissions || submissions.length === 0) {
        return {
            currentStreak: 0,
            totalSolved: 0,
            solvedToday: 0,
        };
    }

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    const datesSet = new Set<number>();

    submissions.forEach((s) => {
        const day = new Date(s.submittedAt);
        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
        datesSet.add(dayStart);
    });

    const allDays = Array.from(datesSet).sort((a, b) => b - a);

    let currentStreak = 0;
    let dayPointer = todayStart;

    for (let i = 0; i < allDays.length; i++) {
        if (allDays[i] === dayPointer) {
            currentStreak++;
            dayPointer -= MS_PER_DAY;
        } else if (allDays[i] < dayPointer) {
            break;
        }
    }

    const solvedToday = datesSet.has(todayStart) ? submissions.filter(s => {
        const subDay = new Date(s.submittedAt);
        const subDayStart = new Date(subDay.getFullYear(), subDay.getMonth(), subDay.getDate()).getTime();
        return subDayStart === todayStart;
    }).length : 0;

    return {
        currentStreak,
        totalSolved: submissions.length,
        solvedToday,
    };
};

export const getTimeAgo = (time: number, wordsCount: number = 1) => {
    const msAgo = Date.now() - time;
    let remaining = Math.floor(msAgo / 1000);

    const result = [];
    const units = [
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
        const value = Math.floor(remaining / unit.seconds);
        if (value > 0) {
            result.push(`${value} ${unit.label}${value !== 1 ? 's' : ''}`);
            remaining %= unit.seconds;
        }

        if (result.length === wordsCount) break;
    }

    return result.length ? result.join(', ') + ' ago' : 'just now';
}

export const tsToString = (timestamp: number): string => {
    let dateStr = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        .format(timestamp);
    return dateStr;
}

export const getUrlWithSheetId = (urlString: string, sheetId: string) => {
    const url = new URL(urlString);
    url.searchParams.set(sheetIdParamsTitle, sheetId);
    return url.href;
};

export const getSheetHeroIconStyle = (color?: string) => {
    return color && sheetHeroStyles[color] ? sheetHeroStyles[color] : sheetHeroStyles["default"];
};

export async function getProblemInSheet(): Promise<ProblemMatchResult> {
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

export function getCurrentActiveTab(): Promise<chrome.tabs.Tab> {
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

export async function addUserIfNotPresent() {
    const existingUsersCount = await getUserRepo().count();
    if (existingUsersCount === 0) {
        const defaultUserData = await getDefaultUserData();
        await getUserRepo().add(defaultUserData);
    }
}

async function getDefaultUserData() {
    let imageBlob = new Blob();

    const response = await fetch('/avatar.png');
    if (response.ok) {
        imageBlob = await response.blob();
    }

    return ({
        joinedAt: Date.now(),
        name: "Coder",
        avatar: imageBlob,
        hasCompletedProfile: false,
        hasCompletedGuide: false
    });
}