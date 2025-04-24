interface CircularProgressProps {
    percentage: number
    radius?: number;
    stroke?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    radius = 30,
    stroke = 5
}) => {
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="#FFF" // tailwind gray-200
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#3B82F6" // tailwind blue-500
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};
