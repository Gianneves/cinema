'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card
} from "@/components/ui/card"


interface Movie {
    id: string;
    moviedb_id: number;
    overview: string;
    cover: string;
}

export function MovieCard({ movie }: any) {

    return (
        <Card className="w-50 h-80 border border-gray-500 p-0">
            <img
                src={movie.cover}
                alt="Event cover"
                className=" w-full h-screen"
            />
        </Card>
    );
}