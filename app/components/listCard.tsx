import type { WatchList } from "~/types/list";
import { Card } from "./ui/card";
import {
    Dialog, DialogContent, DialogTrigger, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogClose,
    DialogTitle
} from "~/components/ui/dialog";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "~/components/ui/button";
import { Eye, PenIcon, Trash } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useFetcher, useNavigate } from "react-router";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DeleteDialog } from "./deleteDialog";


type ListCardProps = {
    list: WatchList
}

export function ListCard({ list }: ListCardProps) {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const isSubmitting = fetcher.state === 'submitting';

    const covers = useMemo(() => {
        const all = list.movies.map((item) => item.cover);

        const shuffled = [...all];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, 4);
    }, [list.movies]);

    useEffect(() => {
        const isIddle = fetcher.state === 'idle';
        const hasData = fetcher.data && fetcher.data.success;

        if (openEdit && isIddle && hasData) {
            setOpenEdit(false);
        }

    }, [fetcher.state, fetcher.data]);

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

                {covers.length === 2 && (
                    <div className="grid grid-cols-2">
                        {covers.map((cover, index) => (
                            <img
                                key={`${cover}-${index}`}
                                src={cover}
                                alt="Event cover"
                                className="brightness-60 grayscale w-full h-60 object-cover"
                            />
                        ))}
                    </div>
                )}

                {covers.length === 3 && (
                    <div className="grid grid-cols-2">
                        {covers.map((cover, index) => (
                            <img
                                key={`${cover}-${index}`}
                                src={cover}
                                alt="Event cover"
                                className={
                                    index === 2
                                        ? "brightness-60 grayscale w-full h-30 object-cover col-span-2"
                                        : "brightness-60 grayscale w-full h-30 object-cover"
                                }
                            />
                        ))}
                    </div>
                )}

                {covers.length >= 4 && (
                    <div className="grid grid-cols-4">
                        {covers.map((cover, index) => (
                            <img
                                key={`${cover}-${index}`}
                                src={cover}
                                alt="Event cover"
                                className="brightness-60 grayscale w-full h-60 object-cover"
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

                    {covers.length > 0 && (
                        <Button onClick={() => navigate(`${list.id}`)} className="bg-[#090D11] hover:bg-[#F0A42E] text-white hover:text-black text-sm font-bold px-3 py-1.5 rounded-md cursor-pointer w-fit">
                            <Eye />
                        </Button>
                    )}

                    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogTrigger render={<Button className="bg-[#090D11] hover:bg-[#F0A42E] text-white hover:text-black text-sm font-bold px-3 py-1.5 rounded-md cursor-pointer w-fit">
                            <PenIcon />
                        </Button>} />
                        <DialogContent className="sm:max-w-sm bg-[#141430] flex flex-col">
                            <fetcher.Form method="put">
                                <DialogHeader>
                                    <DialogTitle className="text-gray-500 font-bold">Editar {list.title}</DialogTitle>
                                </DialogHeader>

                                <div className="mt-2 flex flex-col justify-end gap-2">
                                    <input type="hidden" name="intent" value="edit" />
                                    <input type="hidden" name="listId" value={list.id} />

                                    <FieldGroup>
                                        <Field>
                                            <Label htmlFor="titleEdit" className="text-gray-500">Título</Label>
                                            <Input id="titleEdit" name="titleEdit" className="text-gray-500" defaultValue={list.title} required />
                                        </Field>
                                    </FieldGroup>
                                    <div className="flex gap-2 justify-end">
                                        <DialogClose render={<Button variant="secondary" className="bg-[#07070F] hover:bg-[#101029] text-gray-500 cursor-pointer">Cancelar</Button>} />
                                        <Button type="submit"
                                            className="bg-[#F0A42E] hover:bg-[#e69d30] text-black w-23 font-bold cursor-pointer">
                                            {isSubmitting ? <Spinner /> : 'Salvar'}
                                        </Button>
                                    </div>

                                </div>
                            </fetcher.Form>
                        </DialogContent>
                    </Dialog>

                    <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} list={list}/>
                    
                </div>
            </div>
        </Card>
    );
}