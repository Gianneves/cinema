import { API_URL } from "~/constants/api";

const api = `${API_URL}/movie`;

export async function GetPopularMovies() {
    try {
        const response = await fetch(`${api}/popular`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('erro:', error);
    }
}

export async function Movie(id: string) {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('erro:', error);
    }
}

export async function FindMovieAi(input: string) {
    try {
        const response = await fetch(`${api}/find-movie`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
            credentials: 'include'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('erro:', error);
    }
}

export async function GetByCategory(category: string) {
    try {
        const response = await fetch(`${api}?category=${category}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('erro:', error);
    }
}