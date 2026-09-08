import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

import { getUser } from "~/lib/auth.server";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (user) throw redirect("/dashboard");
  return null;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cinéma" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
