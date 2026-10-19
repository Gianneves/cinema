import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

type TextInfo = {
    text: string;
}

export function BackButton({ text }: TextInfo) {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(-1)} variant="ghost" className="hover:bg-[#0c0c1b] cursor-pointer p-3">
            <ArrowLeft color="gray" />
           <span className="text-gray-500">{text}</span>
        </Button>
    );
}