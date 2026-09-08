
import {
    Card,

} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SignIn } from "./signin";
import { CreateAccount } from "./createAccount";
import { cn } from "~/lib/utils";


export function Auth() {

    return (
        <Card className="w-100 bg-[#0C0C18] p-8">
            <Tabs defaultValue="signin" className="flex items-center">
                <TabsList className="bg-[#141430] w-full">
                    <TabsTrigger className={cn(
                        "bg-[#141430] text-white p-4 cursor-pointer hover:text-gray-500",
                        "w-full",
                        "data-active:bg-[#F0A42E] data-active:text-black",
                        "data-active:hover:bg-[#F0A42E] data-active:hover:text-black"
                    )} value="signin">Login</TabsTrigger>
                    <TabsTrigger className={cn(
                        "bg-[#141430] text-white p-4 cursor-pointer hover:text-gray-500",
                        "w-full",
                        "data-active:bg-[#F0A42E] data-active:text-black",
                        "data-active:hover:bg-[#F0A42E] data-active:hover:text-black"
                    )} value="create">Criar conta</TabsTrigger>
                </TabsList>

                <TabsContent className="w-full" value="signin">
                    <SignIn />
                </TabsContent>
                <TabsContent className="w-full" value="create">
                    <CreateAccount />
                </TabsContent>
            </Tabs>
        </Card>
    );
}