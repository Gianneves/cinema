import { apiRequest } from "~/lib/api";
import { API_URL } from "~/constants/api";

const api = `${API_URL}/review`;

export type ReviewPayload = {
    rating: number;
    review: string;
};

export function GetReviewById(id: string) {
    return apiRequest(`${api}/${id}`);
}

export function PostReview(review: ReviewPayload & { movie: string },
    cookie?: string
) {
    return apiRequest(`${api}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        body: JSON.stringify(review),
        credentials: "include",
    });
}

export function UpdateReview(id: string, review: ReviewPayload, cookie?: string) {
    return apiRequest(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        body: JSON.stringify(review),
        credentials: "include",
    });
}
