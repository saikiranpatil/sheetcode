import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ArrowButtonProps = {
  to?: string;
  arrowDirection: "left" | "right";
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const ArrowButton = ({
  to,
  arrowDirection,
  children,
  className,
  iconClassName = "h-4 w-4",
  onClick,
  type = "button",
  disabled = false,
}: ArrowButtonProps) => {
  const Icon = arrowDirection === "left" ? ChevronLeft : ChevronRight;

  const content = (
    <div className="flex justify-center items-center">
      {arrowDirection === "left" && (
        <Icon
          className={cn(
            iconClassName,
            "transition-all ease-in-out group-hover:-translate-x-1"
          )}
        />
      )}
      <span>{children}</span>
      {arrowDirection === "right" && (
        <Icon
          className={cn(
            iconClassName,
            "transition-all ease-in-out group-hover:translate-x-1"
          )}
        />
      )}
    </div>
  );

  const baseClass = cn(
    "text-xs flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semi-bold transition-colors",
    disabled
      ? "border border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed"
      : "border border-gray-200 bg-white text-gray-500 shadow-sm cursor-pointer group hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100",
    className
  );

  if (to && !disabled) {
    return (
      <a href={to} className={baseClass}>
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={baseClass}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default ArrowButton;
