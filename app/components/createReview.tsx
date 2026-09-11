import type { User } from "~/lib/auth.server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ASSETS_URL } from "~/constants/api";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { RatingStar } from "./ratingStar";
import { PostReview, UpdateReview } from "~/routes/api/get-reviews";

type CreateReviewProps = {
    user?: User;
    movie: string;
    userReview?: UserReview
}

type Review = {
    rating: number;
    review: string;
    movie: string;
}

type UserReview = {
    id?: string;
    review: string;
    rating: number;

}

export function CreateReview({ user, movie, userReview }: CreateReviewProps) {

    const prevReviewState = userReview?.review ? userReview?.review : ''
    const prevPlaceHolder = userReview?.review ? userReview?.review : 'Escreva seus pensamentos sobre esse filme'

    const [review, setReview] = useState(prevReviewState);
    const [rating, setRating] = useState(userReview?.rating ?? 0)

    function handleButton() {
        if (!review) return;

        const movieReview = {
            rating,
            review,
            movie
        }

        postReview(movieReview)

    }

    async function handleEdit() {
        if (!review || !userReview?.id) return;

        try {
            await UpdateReview(userReview.id, { rating, review });
        } catch (error) {
            console.error(error);
        }
    }

    async function postReview(review: Review) {
        try {
            await PostReview(review);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card className="w-140 bg-[#0D0D1A] p-4">


            <div className="flex">
                <div className="flex gap-2">
                    <Avatar>
                        <AvatarImage src={`${ASSETS_URL}/avatars/${user?.avatar}`} alt="shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-white font-bold leading-none">{user?.name}</span>
                        <RatingStar value={rating} onChange={setRating} />
                    </div>
                </div>

            </div>
            <div className="w-130 mt-4">
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <Textarea
                                    id="checkout-7j9-optional-comments"
                                    placeholder={prevPlaceHolder}
                                    className="resize-none text-gray-500"
                                    onChange={(event) => setReview(event?.target.value)}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </div>
            <div className="flex justify-end mr-2">
                {userReview ? (
                    <Button onClick={handleEdit} className="bg-[#F0A42E] hover:bg-[#e69d30] text-black w-23 font-bold cursor-pointer">
                        Editar
                    </Button>
                ) :
                    <Button onClick={handleButton} className="bg-[#F0A42E] hover:bg-[#e69d30] text-black w-23 font-bold cursor-pointer">
                        Publicar
                    </Button>
                }
            </div>
        </Card>
    );
}