import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";


export function SearchInput({ handleMovieBtn, search, setSearch, loading }: any) {

    return (
        <InputGroup className="mt-8 w-2xl border border-gray-500 rounded-2xl h-12.5 p-2 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0 has-[[data-slot=input-group-control]:focus-visible]:border-gray-500">
            <InputGroupInput type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Busque o filme por uma descrição..."
                className="text-white "
            />

            {loading ? (
                <InputGroupAddon align="inline-end">
                    <Spinner />
                </InputGroupAddon>
            ) : (
                <>
                    <InputGroupAddon>
                        <SearchIcon size={1} />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton onClick={handleMovieBtn} className="bg-[#F0A42E] w-20 h-8 rounded-2xl" type="button" variant="secondary">Buscar</InputGroupButton>
                    </InputGroupAddon>
                </>
            )}
        </InputGroup>
    );
}