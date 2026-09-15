import { useEffect, useState } from "react";
import { Review } from "./review";
import { CreateReview } from "./createReview";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import type { User } from "~/lib/auth.server";

const PAGE_SIZE = 2;

type ReviewsListProps = {
    user?: User;
    movieId: string;
    reviews: any[];
}

function getPages(current: number, total: number): (number | "ellipsis")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    if (start > 2) pages.push("ellipsis");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push("ellipsis");
    pages.push(total);

    return pages;
}

export function ReviewsList({ user, movieId, reviews }: ReviewsListProps) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
    const pageReviews = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const userReview = reviews.find((rv: any) => rv.user.id === user?.id);

    useEffect(() => {
        setPage(1);
    }, [reviews.length]);

    return (
        <div className="mt-8 flex flex-col">
            <p className="font-bold text-gray-500 mb-4">Avaliações</p>

            <CreateReview user={user} movie={movieId} userReview={userReview} />

            {reviews.length > 0 && (
                <div className="mt-8">
                    <span className="text-gray-500 font-bold">Reviews da comunidade ({reviews.length})</span>
                </div>
            )}

            {pageReviews.map((review: any) => (
                <Review key={review.id} review={review} />
            ))}

            {totalPages > 1 && (
                <div className="w-140 mt-4 mb-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                />
                            </PaginationItem>

                            {getPages(page, totalPages).map((item, index) =>
                                item === "ellipsis" ? (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={item}>
                                        <PaginationLink
                                            isActive={page === item}
                                            onClick={() => setPage(item)}
                                        >
                                            {item}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            )}
        </div>
    );
}
