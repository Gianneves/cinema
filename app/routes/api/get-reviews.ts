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