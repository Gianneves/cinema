import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { MovieCard } from "./movieCard";
import { useNavigate } from "react-router";

export function CarouselMovies({ movies }: any) {
    const navigate = useNavigate();

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full max-w-310 md:max-w-310 lg:max-w-310"
        >
            <CarouselContent className="">
                {movies.map((movie: any) => (
                    <CarouselItem key={movie.id} className="lg:basis-1/6">
                        <div className="p-1 cursor-pointer" onClick={() => navigate(`/dashboard/details/${movie.id}`)}>
                            <MovieCard movie={movie} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[#141430] border-0 text-gray-50 group-hover:text-white hover:bg-[#141430]" />
            <CarouselNext className="bg-[#141430] border-0 text-gray-50 group-hover:text-white hover:bg-[#141430]" />
        </Carousel>
    );
}