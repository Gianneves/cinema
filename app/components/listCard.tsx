import type { WatchList } from "~/types/list";
import { Card } from "./ui/card";
import {
    Dialog, DialogContent, DialogTrigger, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogClose,
    DialogTitle
} from "~/components/ui/dialog";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Eye, PenIcon, Trash } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useFetcher } from "react-router";


type ListCardProps = {
    list: WatchList
}



export function ListCard({ list }: ListCardProps) {
    const fetcher = useFetcher();
    const [openDelete, setOpenDelete] = useState(false);
    const isSubmitting = fetcher.state === 'submitting';

    const covers = list.movies.map((item) => item.cover);

    function shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleCoverList(list: string[]) {
        const len = list.length;
        let finalLen = 0;
        let random = shuffle(list);

        finalLen = len;

        if (len > 4) {
            finalLen = 4;
            random.splice(4);
        }


        return { finalLen, random };
    }


    return (
        <Card className="relative max-w-150 p-0 min-h-50 bg-[#0D0D1A] overflow-hidden cursor-pointer border border-gray-500 hover:border-2 hover:border-[#F0A42E]">
            <div className="relative group">

                {covers.length === 0 && (
                    <img
                        src='/cover-movie.jpg'
                        alt="Event cover"
                        className="aspect-video w-full object-cover brightness-60 grayscale"
                    />
                )}

                {covers.length === 1 && (
                    <img
                        src={covers[0]}
                        alt="Event cover"
                        className="aspect-video w-full object-cover brightness-60 grayscale"
                    />
                )}

                {covers.length >= 2 && (
                    <div className={`grid grid-cols-${handleCoverList(covers).finalLen}`}>
                        {handleCoverList(covers).random.map((cover) => (
                            <img
                                src={cover}
                                alt="Event cover"
                                className="brightness-60 grayscale w-full h-60"
                            />
                        ))}
                    </div>
                )}

                <div className="bg-[#090D11] absolute top-0 mt-4 ml-2 border border-gray-500 p-3 flex flex-col rounded-md">
                    <span className="text-white font-bold">
                        {list.movies?.length ?? 0} filmes
                    </span>

                    <span className="text-white text-sm">
                        {list.members?.length ?? 0} membros
                    </span>
                </div>

                <div className="absolute bottom-4 ml-2 flex flex-col">
                    <span className="text-[#F0A42E]  font-bold">SUA COLEÇÃO</span>
                    <span className="text-[#F0A42E] font-bold text-2xl">{list?.title}</span>
                </div>

                <div className="absolute top-4 right-1 h-full w-[34%]
      flex flex-row items-start gap-1
      bg-linear-to-l 
      opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-200">

                    <Button className="bg-[#090D11] hover:bg-[#F0A42E] text-white hover:text-black text-sm font-bold px-3 py-1.5 rounded-md cursor-pointer w-fit">
                        <Eye />
                    </Button>

                    <Button className="bg-[#090D11] hover:bg-[#F0A42E] text-white hover:text-black text-sm font-bold px-3 py-1.5 rounded-md cursor-pointer w-fit">
                        <PenIcon />
                    </Button>

                    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                        <DialogTrigger render={
                            <Button className="bg-[#090D11]  hover:bg-[#ef4444] text-white text-sm font-bold px-3 py-1.5 rounded-md cursor-pointer w-fit">

                                <Trash color="white" />
                            </Button>} />
                        <DialogContent className="sm:max-w-sm bg-[#141430] flex flex-col">
                            <fetcher.Form method="post">
                                <DialogHeader>
                                    <DialogTitle className="text-gray-500 font-bold">Deseja excluir {list.title}?</DialogTitle>
                                    <DialogDescription>
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="mt-2 flex justify-end gap-2">
                                    <input type="hidden" name="intent" value="delete" />
                                    <input type="hidden" name="listId" value={list.id} />
                                    <DialogClose render={<Button variant="secondary" className="bg-[#07070F] hover:bg-[#101029] text-gray-500 cursor-pointer">Cancelar</Button>} />
                                    <Button type="submit"
                                        variant="destructive"
                                        className="cursor-pointer">
                                        {isSubmitting ? <Spinner /> : 'Deletar'}
                                    </Button>
                                </div>
                            </fetcher.Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </Card>
    );
}