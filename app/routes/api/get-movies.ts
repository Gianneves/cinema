import { apiRequest } from "~/lib/api";
import { API_URL } from "~/constants/api";

const api = `${API_URL}/movie`;

export function GetPopularMovies() {
    return apiRequest(`${api}/popular`);
}

export function Movie(id: string) {
    return apiRequest(`${api}/${id}`);
}

export function FindMovieAi(input: string) {
    return apiRequest(`${api}/find-movie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
        credentials: "include",
    });
}

export function GetByCategory(category: string) {
    return apiRequest(`${api}?category=${category}`);
}
