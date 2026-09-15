import type { User } from "~/lib/auth.server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ASSETS_URL } from "~/constants/api";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { RatingStar } from "./ratingStar";
import { Spinner } from "./ui/spinner";
import { useFetcher } from "react-router";

type CreateReviewProps = {
    user?: User;
    movie: string;
    userReview?: UserReview;
}

type UserReview = {
    id?: string;
    review: string;
    rating: number;

}

export function CreateReview({ user, movie, userReview }: CreateReviewProps) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';
    const isEditing = Boolean(userReview);

    const prevPlaceHolder = userReview?.review ? userReview?.review : 'Escreva seus pensamentos sobre esse filme';

    const [rating, setRating] = useState(userReview?.rating ?? 0);

    return (
        <Card className="w-140 bg-[#0D0D1A] p-4">
            <fetcher.Form method="post">
                <input type="hidden" name="movie" value={movie} />
                <input type="hidden" name="rating" value={rating} />
                {isEditing && <input type="hidden" name="intent" value="edit" />}
                {isEditing && <input type="hidden" name="id" value={userReview?.id} />}
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

                <div className="w-130 mt-5">
                    <Textarea
                        name="review"
                        key={userReview?.id ?? 'new'}
                        defaultValue={userReview?.review ?? ''}
                        placeholder={prevPlaceHolder}
                        className="resize-none text-gray-500"
                    />
                </div>

                <div className="mt-2 flex justify-end mr-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#F0A42E] hover:bg-[#e69d30] text-black w-23 font-bold cursor-pointer">
                        { isSubmitting ? <Spinner /> : isEditing ? 'Editar' : 'Publicar' }
                    </Button>
                </div>
            </fetcher.Form>
        </Card>
    );
}