import { useLoaderData, useRouteLoaderData } from "react-router";
import { Movie } from "./api/get-movies";
import type { Route } from "./+types/details";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dot } from "lucide-react";
import { GetReviewById, PostReview, UpdateReview } from "./api/get-reviews";
import { ReviewsList } from "~/components/reviewsList";
import type { loader as dashboardLoader } from "~/routes/dashboard";

export async function loader({ params }: Route.LoaderArgs) {
    const movie = await Movie(params.id);
    const reviews = await GetReviewById(params.id);

    return { movie, reviews }
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const cookie = request.headers.get('cookie');

    const rating = Number(formData.get('rating'));
    const review = String(formData.get('review'));
    const movie = String(formData.get('movie'));
    const intent = String(formData.get('intent'));

    if (intent === 'edit') {
        const id = String(formData.get('id'));
        return await UpdateReview(id, { rating, review }, cookie ?? undefined);
    }

    return await PostReview({ rating, review, movie }, cookie ?? undefined);
}


export default function Details() {
    const { movie, reviews } = useLoaderData<typeof loader>();
    const dashboardData = useRouteLoaderData<typeof dashboardLoader>("routes/dashboard");
    const user = dashboardData?.user;

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
                                <span className="text-gray-500">{movie?.director}</span>
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
                <ReviewsList user={user} movieId={movie.id} reviews={reviews} />
            </div>
        </div>
    );
}
