import { redirect } from "react-router";
import { API_URL } from "~/constants/api";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export async function getUser(request: Request): Promise<User | null> {
    const cookie = request.headers.get('cookie');

    const res = await fetch(`${API_URL}/auth/me`, {
        headers: cookie ? { cookie } : {}
    });

    if (!res.ok) return null;
    return res.json();
}

export async function requireUser(request: Request): Promise<User>  {
    const user = await getUser(request);
    if (!user) {
        throw redirect("/", { headers: { "Set-Cookie": "" } });
    }
    return user;
}