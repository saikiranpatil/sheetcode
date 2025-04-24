
export type TailwindColor =
    | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
    | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green'
    | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo'
    | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

export type GradientDirection = 't' | 'tr' | 'r' | 'br' | 'b' | 'bl' | 'l' | 'tl';

export type ProblemSheet = {
    id: string;
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
    name: string;
    platform: string;
    difficulty: string;
    isSolved: boolean;
    link: string;
};

export interface Submission {
    problem: {
        name: string;
        platform: string;
        link: string;
        difficulty: string;
    },
    sheet: {
        id: string;
        name: string;
    },
    submittedAt: number
}
