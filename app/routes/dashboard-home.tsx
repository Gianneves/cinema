import { Card } from "~/components/ui/card";
import { GetByCategory, GetPopularMovies } from "./api/get-movies";
import { useLoaderData } from "react-router";
import { CarouselMovies } from "~/components/carouselMovies";

export async function loader() {
    const [mostPopular, drama, anime, terror] = await Promise.all([
        GetPopularMovies(),
        GetByCategory('drama'),
        GetByCategory('animação'),
        GetByCategory('terror')
    ]);

    return { mostPopular, drama, anime, terror }
}



export default function DashboardHome() {
    const { mostPopular, drama, anime, terror } = useLoaderData<typeof loader>();
    return (
        <div className="p-4 min-h-screen w-full flex flex-col bg-[#07070E]">

            <div className="mt-4">
                <p className="text-white font-bold ml-12">Populares</p>
                <div className="mt-2 ml-10">
                    <CarouselMovies movies={mostPopular} />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-white font-bold ml-12">Terror</p>
                <div className="mt-2 ml-10">
                    <CarouselMovies movies={terror} />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-white font-bold ml-12">Animação</p>
                <div className="mt-2 ml-10">
                    <CarouselMovies movies={anime} />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-white font-bold ml-12">Drama</p>
                <div className="mt-2 ml-10">
                    <CarouselMovies movies={drama} />
                </div>

            </div>
        </div>
    );
}
