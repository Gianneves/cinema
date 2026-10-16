import { API_URL } from "~/constants/api";
import { apiRequest } from "~/lib/api";
import type { AddMovieDto, List, WatchList } from "~/types/list";

const api = `${API_URL}/lists`;

export function CreateList(list: List, cookie?: string) {
    return apiRequest(`${api}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        body: JSON.stringify(list),
        credentials: "include"
    })
}

export function GetLists(cookie?: string) {
    return apiRequest<WatchList[]>(`${api}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        credentials: "include",
    });
}

export function GetOneList(id: string, cookie?: string) {
    return apiRequest<WatchList[]>(`${api}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        credentials: "include",
    });
}

export function AddMovieToAList(data: AddMovieDto, cookie?: string) {
    return apiRequest(`${api}/${data.listId}/movies/${data.movieId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        credentials: "include"
    });
}

export function EditList(id: string, data: List, cookie?: string) {
    return apiRequest(`${api}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        body: JSON.stringify(data),
        credentials: "include"
    })
}

export function RemoveMovie(data: AddMovieDto, cookie?: string) {
    
    return apiRequest(`${api}/${data.listId}/movies/${data.movieId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        credentials: "include"
    });
}

export function DeleteList(id: string, cookie?: string) {
    return apiRequest(`${api}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        credentials: "include"
    });
}