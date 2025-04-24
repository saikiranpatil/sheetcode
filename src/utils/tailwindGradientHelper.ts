import { GradientDirection, TailwindColor } from "../shared/types";

interface GradientOptions {
    from: TailwindColor;
    to: TailwindColor;
    direction?: GradientDirection;
    fromShade?: number;
    toShade?: number;
}

export function getTailwindGradientClasses({
    from,
    to,
    direction = 'r',
    fromShade = 500,
    toShade = 500,
}: GradientOptions): string {
    return `bg-gradient-to-${direction} from-${from}-${fromShade} to-${to}-${toShade}`;
}
