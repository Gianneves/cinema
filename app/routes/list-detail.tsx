import { useLoaderData } from "react-router";
import type { Route } from "./+types/list-detail";
import { GetOneList, RemoveMovie } from "./api/handle-lists";
import { RenderMovieCard } from "~/components/renderMovieCard";
import type { AddMovieDto } from "~/types/list";
import { BackButton } from "~/components/backButton";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const cookie = request.headers.get('cookie');
    const intent = String(formData.get('intent'));

    if (intent === 'removeMovie') {
        const listId = String(formData.get('listId'));
        const movieId = String(formData.get('movieId'));

        const addMovie: AddMovieDto = {
            listId,
            movieId
        }

        await RemoveMovie(addMovie, cookie ?? undefined);
        return { success: true }
    }
}

export async function loader({ params, request }: Route.LoaderArgs) {
    const cookie = request.headers.get('cookie');
    const list = await GetOneList(params.id, cookie ?? undefined);

    return { list }
}

export default function ListDetail() {
    const { list } = useLoaderData<typeof loader>();
    const text = 'Todas as watchlists';

    return (
        <div className="p-4 min-h-screen bg-[#07070E]">
            <BackButton text={text} />
            <div className="mt-10 flex justify-between">
                <div className="flex flex-col">
                    <span className="text-[#F0A42E] font-medium">NA LISTA</span>
                    <span className="text-white text-3xl">Todos os filmes</span>
                </div>
                <div className="border rounded-lg h-10 flex items-center p-2">
                    {list.length === 1 ? (
                        <span className="text-gray-500">{list.length} título</span>
                    ) : (
                        <span className="text-gray-500">{list.length} títulos</span>
                    )}

                </div>
            </div>
            <div className="mt-4 grid grid-cols-6">
                {list[0].movies.map((movie) => (
                    <RenderMovieCard movie={movie} isListId={list[0].id}  />
                ))}
            </div>
        </div>
    )
}