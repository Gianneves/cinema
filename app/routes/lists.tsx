import { Button } from "~/components/ui/button";
import { CreateList, DeleteList, GetLists } from "./api/handle-lists";
import type { Route } from "./+types/lists";
import { useFetcher, useLoaderData } from "react-router";
import { ListCard } from "~/components/listCard";
import {
    Dialog, DialogContent, DialogTrigger, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogClose,
    DialogTitle
} from "~/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Spinner } from "~/components/ui/spinner";
import type { List } from "~/types/list";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Trash } from "lucide-react";

export async function loader({ params, request }: Route.LoaderArgs) {
    const cookie = request.headers.get('cookie');
    const lists = await GetLists(cookie ?? undefined);

    return { lists }
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const cookie = request.headers.get('cookie');
    const intent = String(formData.get('intent'));
    const { title } = Object.fromEntries(formData);

    if (intent === 'delete') {
        const listId = String(formData.get('listId'));
        await DeleteList(listId, cookie ?? undefined);
        return { success: true }
    }

    const list: List = {
        title: String(title || "").trim()
    }

    if (list.title === "") {
        return;
    }

    await CreateList(list, cookie ?? undefined);

    return { success: true }
}


export default function Lists() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';
    const { lists } = useLoaderData<typeof loader>();
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        const isIddle = fetcher.state === 'idle';
        const hasData = fetcher.data && fetcher.data.success;

        if (openDelete && isIddle && hasData) {
            setOpenDelete(false);
        }

        if (isIddle && hasData) {
            setOpen(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <div className="p-4 min-h-screen bg-[#07070E]">
            <div className="flex justify-between">
                <div className="mb-8">
                    <h1 className="text-[#F0A42E] text-sm font-bold">Biblioteca</h1>
                    <span className="text-white text-4xl">Watchlists</span>
                </div>
                <div className="mt-5">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger render={<Button className="bg-[#F0A42E] hover:bg-[#e69d30] text-black font-medium text-md p-4 cursor-pointer">+ Criar</Button>} />
                        <DialogContent className="sm:max-w-sm bg-[#141430] flex flex-col">
                            <fetcher.Form method="post">
                                <DialogHeader>
                                    <DialogTitle className="text-gray-500 font-bold">Criar Lista</DialogTitle>
                                    <DialogDescription>
                                    </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="title" className="text-gray-500">Título</Label>
                                        <Input id="title" name="title" className="text-gray-500" defaultValue="Filmes para ver" required />
                                    </Field>
                                </FieldGroup>
                                <div className="mt-2 flex justify-end">
                                    <Button type="submit"
                                        className="bg-[#F0A42E] hover:bg-[#e69d30] text-black w-23 font-bold cursor-pointer">
                                        {isSubmitting ? <Spinner /> : 'Criar'}
                                    </Button>
                                </div>
                            </fetcher.Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {lists.length > 0 && lists.map((list) => (
                    <ListCard key={list.id} list={list} />  
                ))}
            </div>
        </div>
    );
}
