import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { getUserRepo } from "@/lib/db";
import { addUserIfNotPresent } from "@/lib/utils";
import { steps } from "@/constants";

interface QuickGuideProps {
    reloadUser?: () => void;
};

export default function QuickGuide({ reloadUser }: QuickGuideProps) {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    const next = () => setCurrent((prev) => (prev + 1) % steps.length);
    const prev = () => setCurrent((prev) => (prev - 1 + steps.length) % steps.length);

    const handleClose = async () => {
        console.log("Clicked");
        const userRepo = getUserRepo();

        await addUserIfNotPresent();
        const user = await userRepo.getUser();
        await getUserRepo().update(user?.id!, { hasCompletedGuide: true });
        if (reloadUser) reloadUser();
        navigate("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto shadow-xl rounded-3xl bg-white border-0 overflow-hidden">
                <CardContent className="p-0">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">{steps[current].title}</h2>
                        <div className="text-blue-100 text-sm">
                            Step {current + 1} of {steps.length}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                        {/* Image Section */}
                        {steps[current].imgUrl ? (
                            <div className="mb-6 flex justify-center">
                                <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <img
                                        className="max-w-full max-h-full object-contain rounded-lg"
                                        src={steps[current].imgUrl}
                                        alt={`Step ${current + 1} illustration`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML = '<div class="text-gray-400 text-sm">Image preview</div>';
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6 flex justify-center">
                                <div className="w-64 h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                                    <div className="text-6xl">🚀</div>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="mb-8">
                            <p className="text-gray-700 text-base leading-relaxed">
                                {steps[current].description}
                            </p>
                        </div>

                        {/* Step indicators */}
                        <div className="flex justify-center gap-2 mb-8">
                            {steps.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${idx === current
                                        ? "bg-blue-500 w-8"
                                        : "bg-gray-300 w-3 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={prev}
                                disabled={current === 0}
                                className="flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} /> Back
                            </Button>

                            {current !== steps.length - 1 && (
                                <Button
                                    onClick={handleClose}
                                    variant="ghost"
                                    className="text-gray-500 hover:text-gray-700 px-4 py-2"
                                >
                                    Skip Tour
                                </Button>
                            )}

                            {current === steps.length - 1 ? (
                                <Button
                                    onClick={handleClose}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 px-6 py-2 font-semibold">
                                    Get Started
                                </Button>
                            ) : (
                                <Button
                                    onClick={next}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 px-4 py-2"
                                >
                                    Next <ChevronRight size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}