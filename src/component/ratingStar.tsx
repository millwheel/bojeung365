import { Star } from "lucide-react";

type RatingStarsProps = {
    label: string;
    value: number; // 1~5
    size?: number;
};

export default function RatingStars({ label, value, size = 14 }: RatingStarsProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{label}</span>

            <div className="flex items-center gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={size}
                        className={i < value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                ))}
            </div>
        </div>
    );
}