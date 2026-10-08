import type { User } from "~/lib/auth.server";


export type AddMovieDto = {
    listId: string;
    movieId: string;
}

export type WatchList = {
    id: string;
    title: string;
    onwer: User;
    members: User[];
    movies: Movie[];
}

type Movie = {
    id: string;
    original_title: string;
    cover: string;
}

export type List = {
    title: string;
}
