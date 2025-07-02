export type Sheet = {
    id?: number;
    name: string;
    description: string;
    problemsCount: number;
    completionCount: number;
    problemsList: ProblemsObj[];
    sheetColor?: string;
    isOngoing: boolean;
};

export type ProblemsObj = {
    topic: string;
    problems: Problem[];
    problemsCount: number;
    completionCount: number;
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