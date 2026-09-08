import { Outlet } from "react-router";
import { Header } from "~/components/Header";
import type { User } from "~/lib/auth.server";

type DashboardViewProps = {
    user: User;
}

export function DashboardView({ user }: DashboardViewProps) {
    return (
        <>
            <Header user={user} />
            <Outlet />
        </>

    );
}