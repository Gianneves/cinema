import { useState } from "react";
import { Star } from "lucide-react";

type RatingStarProps = {
    value?: number;
    onChange?: (value: number) => void;
};

export function RatingStar({ value = 0, onChange }: RatingStarProps) {
    const [hover, setHover] = useState<number | null>(null);
    const readOnly = !onChange;

    const active = readOnly ? value : (hover ?? value);

    function handleClick(i: number, half: boolean) {
        onChange?.(half ? i + 0.5 : i + 1);
    }

    return (
        <div className="-mt-1 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => {
                const frac = Math.max(0, Math.min(1, active - i));

                return (
                    <button
                        key={i}
                        type="button"
                        onMouseMove={readOnly ? undefined : (e) => {
                            const half = e.nativeEvent.offsetX < e.currentTarget.offsetWidth / 2;
                            setHover(i + (half ? 0.5 : 1));
                        }}
                        onMouseLeave={readOnly ? undefined : () => setHover(null)}
                        onClick={readOnly ? undefined : (e) => {
                            const half = e.nativeEvent.offsetX < e.currentTarget.offsetWidth / 2;
                            handleClick(i, half);
                        }}
                        className={`relative h-4.5 w-4.5 ${readOnly ? "" : "cursor-pointer"}`}
                    >
                        <Star size={18} className="absolute text-gray-600" />
                        <Star
                            size={18}
                            className="absolute text-[#F0A42E]"
                            fill="currentColor"
                            style={{ clipPath: `inset(0 ${(1 - frac) * 100}% 0 0)` }}
                        />
                    </button>
                );
            })}
        </div>
    );
}
