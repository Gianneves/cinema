import type { User } from "~/lib/auth.server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ASSETS_URL } from "~/constants/api";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { RatingStar } from "./ratingStar";
import { PostReview } from "~/routes/api/get-reviews";

type CreateReviewProps = {
    user?: User;
    movie: string;
}

type Review = {
    rating: number;
    review: string;
    movie: string;
}

export function CreateReview({ user, movie }: CreateReviewProps) {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0)

    function handleButton() {
        if (!review) return;
        
        const movieReview = {
            rating,
            review,
            movie
        }

        postReview(movieReview)

    }

    async function postReview(review: Review) {
        await PostReview(review);
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
                                    placeholder="Escreva seus pensamentos sobre esse filme"
                                    className="resize-none text-gray-500"
                                    onChange={(event) => setReview(event?.target.value)}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </div>
            <div className="flex justify-end mr-2">
                <Button onClick={handleButton} className="bg-[#F0A42E] hover:bg-[#e69d30] text-black w-23 font-bold cursor-pointer">
                    Publicar
                </Button>
            </div>
        </Card>
    );
}