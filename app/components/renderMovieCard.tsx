// ~/components/renderMovieCard.tsx
import { useNavigate } from "react-router";
import { MovieCard } from "./movieCard";
import { DeleteDialog } from "./deleteDialog";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Route } from "../routes/+types/lists";
import type { AddMovieDto } from "~/types/list";
import { RemoveMovie } from "~/routes/api/handle-lists";

type RenderMovieCardProps = {
    movie: any,
    isListId?: string | undefined
}



export function RenderMovieCard({ movie, isListId }: RenderMovieCardProps) {
    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = useState(false);

    function formatedDate(date: string) {
        if (!date) return "";
        return new Date(date).getFullYear();
    }

    return (
        <div
            className="group cursor-pointer relative"
            onClick={(e) => {
                
                if ((e.target as HTMLElement).closest('button, [role="dialog"], [data-slot="dialog-content"], [data-slot="dialog-overlay"]')) {
                    return;
                }
                navigate(`/dashboard/details/${movie.id}`);
            }}
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


            <div className="absolute top-4 right-6 h-full 
      flex flex-row items-start justify-end 
      bg-linear-to-l 
      opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >

                {isListId && (
                    <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} movie={movie} isListId={isListId} />
                )}
            </div>



        </div>
    );
}