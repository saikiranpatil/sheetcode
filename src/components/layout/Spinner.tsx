import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    fullScreen?: boolean;
}

const Spinner = ({
    size = 'md',
    className,
    fullScreen = false,
    ...props
}: SpinnerProps) => {
    const sizeClass = (sz: SpinnerProps["size"]) => {
        switch (sz) {
            case "sm":
                return "h-6 w-6";
                break;

            case "lg":
                return "h-12 w-12";
                break;

            case "md":
            default:
                return "h-8 w-8";
                break;
        }
    }

    return (
        <div className={`flex justify-center items-center ${fullScreen ? 'h-100vh' : ''}`}>
            <LoaderCircle className={cn("animate-spin", className, sizeClass(size))} {...props} />
        </div>
    )
};

export default Spinner;