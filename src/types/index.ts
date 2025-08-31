export type Sheet = {
    id?: number;
    name: string;
    description: string;
    topics: Topics[];
    sheetColor?: string;
    isActive: boolean;
};

export type Topics = {
    name: string;
    solvedCount?: number;
    problems: Problem[];
}

export type Problem = {
    id: string;
    name: string;
    platform: string;
    difficulty: string;
    isSolved: boolean;
    link: string;
};

export interface Submission {
    id?: number;
    problemId: string;
    sheetId: number;
    submittedAt: number
}

export interface User {
    id?: number;
    name: string;
    joinedAt: number;
    avatar: Blob;
    hasCompletedProfile: boolean;
    hasCompletedGuide: boolean;
}

export type ProblemMatchResult = {
    sheet: Sheet;
    problem: Problem;
    topicIndex: number;
    problemIndex: number;
};