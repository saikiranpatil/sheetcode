export * from "./sheets";

export const chromeEvents = {
    SAVE_SUBMISSION: "SAVE_SUBMISSION",
    URL_CHANGED: "URL_CHANGED"
}

export const difficultyColor = {
    'Easy': 'text-green-600 bg-green-50',
    'Medium': 'text-yellow-600 bg-yellow-50',
    'Hard': 'text-red-600 bg-red-50'
};

export const sheetHeroStyles: Record<any, { body: string, icon: string }> = {
    "red": {
        body: "from-red-300 via-red-100 to-red-200",
        icon: 'text-red-400'
    },
    "yellow": {
        body: "from-yellow-300 via-yellow-100 to-yellow-200",
        icon: 'text-yellow-400'
    },
    "green": {
        body: "from-green-300 via-green-100 to-green-200",
        icon: 'text-green-400'
    },
    "default": {
        body: "from-gray-300 via-gray-100 to-gray-200",
        icon: 'text-gray-400'
    },
}

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const steps: {
    title: string;
    description: string;
    imgUrl?: string;
}[] = [{
    title: "Welcome to SheetCode 🎉",
    description: "Say goodbye to manual tracking! SheetCode automatically records your progress and keeps your practice organized.",
},
{
    title: "Your Dashboard 📊",
    description: "Click 'Show More' in the popup to open the landing page. Select a sheet like NeetCode 75 and start solving right away.",
    imgUrl: "demo/step1.png"
},
{
    title: "Pick a Problem ✅",
    description: "Open any problem from your chosen sheet and hit 'Solve'. We'll track your session instantly in the background.",
    imgUrl: "demo/step2.png"
},
{
    title: "Auto Tracking 🔍",
    description: "Look for the green checkmark—it means your coding session is being tracked automatically.",
    imgUrl: "demo/step3.png"
},
{
    title: "Effortless Progress 📁",
    description: "Every submission is saved, progress updates in real-time, and everything stays neatly organized for you.",
    imgUrl: "demo/step4.png"
}];