import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ASSETS_URL } from "~/constants/api";
import { RatingStar } from "./ratingStar";

type ReviewProps = {

}

export function Review({ review }: any) {

    function formatedData(date: string) {
        const newDate = new Date(date);

        return newDate.toLocaleDateString('pt-BR');
    }

    return (
        <Card className="w-140 bg-[#0D0D1A] mt-4">
            <div className="flex ml-2 justify-between p-2">
                <div className="flex gap-2">
                    <Avatar>
                        <AvatarImage src={`${ASSETS_URL}/avatars/${review.user?.avatar}`} alt="shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-gray-500 mt-1">{review.user.name}</span>
                        <RatingStar value={review.rating} />
                    </div>
                </div>
                <div className="mr-2 mt-1">
                    <span className="text-gray-500">{formatedData(review.createdAt)}</span>
                </div>
            </div>
            <div className="ml-4">
                <p className="text-gray-500">{review.review}</p>
            </div>
            <div className="flex p-2 ml-4 items-center gap-2">
                <Heart size={20} color="#ffff" />
                <span className="text-gray-500">(0)</span>
            </div>
        </Card>
    )
}