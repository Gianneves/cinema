import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import type { User } from "~/lib/auth.server";
import { ASSETS_URL } from "~/constants/api";

type HeaderProps = {
  user: User;
}


export function Header({user}: HeaderProps) {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="bg-[#07070F] w-full flex p-4 justify-between items-center border-b border-gray-500">
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <div className="flex gap-2 text-white items-center">
                            <NavigationMenuItem className="hover:text-[#F0A42E]">
                                <Link to="/dashboard">
                                    <span className="font-display italic text-2xl font-medium mr-2"
                                    >
                                        Cin<span className="text-[#F0A42E]">é</span>ma</span></Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    active={isActive("/dashboard")}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "text-gray-500 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
                                        "rounded-2xl w-18 transition-colors",
                                        "data-active:bg-[#2A1C0F] data-active:text-[#F0A42E]",
                                        "data-active:hover:bg-[#2A1C0F] data-active]:hover:text-[#F0A42E]"
                                    )}
                                >
                                    <Link to="/dashboard">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    active={isActive("/dashboard/search")}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "text-gray-500 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
                                        "rounded-2xl w-18 transition-colors",
                                        "data-active:bg-[#2A1C0F] data-active:text-[#F0A42E]",
                                        "data-active:hover:bg-[#2A1C0F] data-active]:hover:text-[#F0A42E]"
                                    )}
                                >
                                    <Link to="/dashboard/search">Buscar</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    active={isActive("/dashboard/lists")}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "text-gray-500 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
                                        "rounded-2xl w-18 transition-colors",
                                        "data-active:bg-[#2A1C0F] data-active:text-[#F0A42E]",
                                        "data-active:hover:bg-[#2A1C0F] data-active]:hover:text-[#F0A42E]"
                                    )}
                                >
                                    <Link to="/dashboard/lists">Listas</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    active={isActive("/dashboard/friends")}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "text-gray-500 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white",
                                        "rounded-2xl w-18 transition-colors",
                                        "data-active:bg-[#2A1C0F] data-active:text-[#F0A42E]",
                                        "data-active:hover:bg-[#2A1C0F] data-active]:hover:text-[#F0A42E]"
                                    )}
                                >
                                    <Link to="/dashboard/friends">Amigos</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <div className="flex gap-6 items-center">
                            <NavigationMenuItem>
                                <Bell size={20} color="white" />
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full items-center mr-2"><Avatar>
                                        <AvatarImage src={`${ASSETS_URL}/avatars/${user?.avatar}`} alt="shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar></Button>} />
                                    <DropdownMenuContent className="w-22">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Perfil</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}