import { SearchInput } from "~/components/searchInput";
import { FindMovieAi, GetPopularMovies } from "./api/get-movies";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { RenderMovieCard } from "~/components/renderMovieCard";
import { Spinner } from "~/components/ui/spinner";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Sparkles } from "lucide-react";

export async function loader() {
    const movies = await GetPopularMovies();
    return { movies }
}

type Genre = 'ação' | 'comédia' | 'drama' | 'terror' | 'romance' | 'alfred hitchcock';

type BadgeItem = {
    value: Genre;
    label: string;
}


export default function Search() {
    const { movies } = useLoaderData<typeof loader>();
    const [search, setSearch] = useState('');
    const [foundMovies, setFoundMovies] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);

    const badgeItems: BadgeItem[] = [
        { value: 'ação', label: 'Ação' },
        { value: 'comédia', label: 'Comédia' },
        { value: 'drama', label: 'Drama' },
        { value: 'terror', label: 'Terror' },
        { value: 'romance', label: 'Romance' },
        { value: 'alfred hitchcock', label: 'Alfred Hitchcock' }
    ]

    function handleBadge(value: Genre) {
        setSearch(value)
    }

    useEffect(() => {
        if (foundMovies.length > 0) {
            setLoading(false);
            setSearch('');
        }
    }, [foundMovies]);

    async function handleMovieBtn() {
        setLoading(true);
        const movie = await FindMovieAi(search);
        setFoundMovies(movie)
    }

    return (
        <div className="p-4 min-h-screen bg-[#07070E]">
            <div>
                <SearchInput handleMovieBtn={handleMovieBtn} search={search} setSearch={setSearch} loading={loading} />
                <div className="mt-4 flex gap-4">
                    {badgeItems.map((item) => (
                        <Badge
                            key={item.value}
                            className="cursor-pointer p-3 bg-[#2A1C0F] text-[#F0A42E]"
                            onClick={() => handleBadge(item.value)}
                        >
                            {item.label}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex flex-col justify-center">
                {loading ? (
                    <div className="mt-5 flex items-center mx-auto gap-6">
                        <Empty className="w-full h-50 bg-[#100D21]">
                            <EmptyHeader>
                                <Spinner className="size-10" color="#F0A42E" />
                                <EmptyTitle>
                                    <span className="text-white text-lg font-bold">Encontrando os filmes perfeitos pra você!</span>
                                </EmptyTitle>
                                <EmptyDescription>
                                    <span className="text-white text-md font-bold">Isso pode levar alguns segundos, fique tranquilo.</span>
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    </div>
                ) :
                    <div className="flex flex-col">
                        {foundMovies.length > 0 && (
                            <>
                                <Card className="mt-1 w-2xl bg-[#100D21] p-6">
                                    <Badge color="#251E4D" className="p-3">
                                        <Sparkles color="#7C6CFA" />
                                        <span className="text-[#7C6CFA] font-bold">AI Semantic</span>
                                    </Badge>

                                    <div>
                                        <span className="text-white">Foram encontrados {foundMovies.length} matches de filmes"" — analisando temas, atmosfera, narrativa e estilo visual do filme.</span>
                                    </div>
                                </Card>
                                <p className="text-white font-bold mt-4 mb-4">Melhores matches</p>
                            </>
                        )}

                        <div className="grid grid-cols-6 gap-5">
                            {(foundMovies.length > 0 ? foundMovies : movies).map((movie: any) => (
                                <RenderMovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}