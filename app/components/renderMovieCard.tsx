// ~/components/renderMovieCard.tsx
import { useNavigate } from "react-router";
import { MovieCard } from "./movieCard";

type RenderMovieCardProps = { movie: any };

export function RenderMovieCard({ movie }: RenderMovieCardProps) {
    const navigate = useNavigate();

    function formatedDate(date: string) {
        if (!date) return "";
        return new Date(date).getFullYear();
    }

    return (
        <div
            className="group cursor-pointer"
            onClick={() => navigate(`/dashboard/details/${movie.id}`)}
        >
            <MovieCard movie={movie} />
            <div className="mt-2 flex flex-col">
                <span className="text-white text-sm font-bold group-hover:text-[#F0A42E] transition-colors">
                    {movie.original_title}
                </span>
                <span className="text-white text-sm font-bold group-hover:text-[#F0A42E] transition-colors">
                    {formatedDate(movie.release_date)}
                </span>
            </div>
        </div>
    );
}