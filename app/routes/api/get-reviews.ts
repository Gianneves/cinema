import { API_URL } from "~/constants/api";

const api = `${API_URL}/review`;

export async function GetReviewById(id: string) {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function PostReview(review: any) {
    try {
        const response = await fetch(`${api}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
            credentials: 'include'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}