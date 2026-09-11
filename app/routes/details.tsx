import { useEffect, useState } from "react";
import { useLoaderData, useParams, useRouteLoaderData } from "react-router";
import { Movie } from "./api/get-movies";
import type { Route } from "./+types/details";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dot } from "lucide-react";
import { Review } from "~/components/review";
import { GetReviewById } from "./api/get-reviews";
import { CreateReview } from "~/components/createReview";
import type { loader as dashboardLoader } from "~/routes/dashboard";


export async function loader({ params }: Route.LoaderArgs) {
    const movie = await Movie(params.id);
    const reviews = await GetReviewById(params.id);

    return { movie, reviews }
}


export default function Details() {
    const { movie, reviews } = useLoaderData<typeof loader>();
    const dashboardData = useRouteLoaderData<typeof dashboardLoader>("routes/dashboard");
    const user = dashboardData?.user;

    const userReview =  reviews.find((rv: any) => rv.user.id == user?.id);

    function formatedDate(date: string) {
        if (!date) return "";
        const dateToTransform = new Date(date);
        return dateToTransform.getFullYear();
    }

    return (
        <div className="min-h-screen bg-[#07070E]">
            <div className="relative">
                <img src={movie.backdrops} className="w-full h-80 object-cover" alt="backdrops image" />

                <div className="absolute inset-0 bg-linear-to-t from-[#07070E] via-[#07070E]/60 to-transparent" />

                <div className="absolute bottom-0 left-0 flex mt-20 ml-8 pb-8">
                    <div>
                        <img src={movie.cover} className="w-40 rounded-lg" alt="movie cover" />
                    </div>
                    <div className="flex flex-col justify-center ml-5">
                        <div className="flex gap-2 mb-2">
                            {movie.genres.map((item: string) => (
                                <Badge key={item} className="text-[#F0A42E] bg-[#382817] border border-[#F0A42E]">{item}</Badge>
                            ))}
                        </div>
                        <div>
                            <h1 className="text-white text-2xl font-bold">{movie?.original_title}</h1>
                            <div className="flex mt-4">
                                <span className="text-gray-500">{formatedDate(movie?.release_date)}</span>
                                <Dot color="white" />
                                <span className="text-gray-500">{movie?.runtime} m</span>
                                <Dot color="white" />
                                <span className="text-gray-500">Dir. {movie?.director}</span>
                            </div>
                            <Button className="mt-5 bg-[#F0A42E] hover:bg-[#e69d30] text-black font-medium text-md p-4">+ Adicionar a lista</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-8 mt-2 max-w-450 font-medium line-clamp-6">
                <p className="text-gray-500">{movie.overview}</p>
            </div>
            <div className="ml-8">
                <p className="text-gray-500 font-medium">Elenco</p>
                <div className="mt-1 flex gap-4">
                    {movie.main_cast.map((cast: string) => (
                        <Badge key={cast} className="p-4 text-gray-500 text-sm bg-[#141430] border border-gray-500">{cast}</Badge>
                    ))}
                </div>
            </div>
            <div className="ml-8 mt-8">
                <p className="font-bold text-gray-500 mb-4">Avaliações</p>

                <CreateReview user={user} movie={movie.id} userReview={userReview} />

                {reviews.length > 0 && (
                    <div className="mt-8">
                        <span className="text-gray-500 font-bold">Reviews da comunidade ({reviews.length})</span>
                    </div>
                )}

                {reviews.map((review: any) => (
                    <Review key={review.id} review={review} />
                ))}

            </div>
        </div>
    );
}
