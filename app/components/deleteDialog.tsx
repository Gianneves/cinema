import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { useFetcher } from "react-router";
import type { Dispatch, SetStateAction } from "react";
import { Spinner } from "./ui/spinner";
import type { WatchList } from "~/types/list";

type HandleStateAndList = {
    isListId?: string | undefined,
    movie?: any,
    list?: WatchList | undefined,
    openDelete: boolean,
    setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export function DeleteDialog({ movie, list, openDelete, setOpenDelete, isListId }: HandleStateAndList) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';
   
    return (
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger render={
                <Button onClick={(e) => e.stopPropagation()} className="bg-[#090D11]  hover:bg-[#ef4444] text-white text-sm font-bold px-3 py-1.5 rounded-md cursor-pointer w-fit">
                    <Trash color="white" />
                </Button>} />
            <DialogContent
                className="sm:max-w-sm bg-[#141430] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <fetcher.Form method="delete">
                    <DialogHeader>
                        <DialogTitle className="text-gray-500 font-bold">Deseja remover {list?.title ?? movie?.original_title}?</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-2 flex justify-end gap-2">

                        {list && !movie &&(
                            <>
                                <input type="hidden" name="listId" value={list?.id} />
                                <input type="hidden" name="intent" value="delete" />
                            </>

                        )}

                        {movie && isListId && (
                            <>
                                <input type="hidden" name="listId" value={isListId} />
                                <input type="hidden" name="movieId" value={movie?.id} />
                                <input type="hidden" name="intent" value="removeMovie" />
                            </>

                        )}

                        <DialogClose render={<Button onClick={(e) => e.stopPropagation()} variant="secondary" className="bg-[#07070F] hover:bg-[#101029] text-gray-500 cursor-pointer">Cancelar</Button>} />
                        <Button type="submit"
                            variant="destructive"
                            onClick={(e) => e.stopPropagation()}
                            className="cursor-pointer">
                            {isSubmitting ? <Spinner /> : 'Remover'}
                        </Button>
                    </div>
                </fetcher.Form>
            </DialogContent>
        </Dialog>
    );
}