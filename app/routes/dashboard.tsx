// app/routes/dashboard.tsx
import { requireUser } from "~/lib/auth.server";
import { DashboardView } from "../dashboard/dashboard";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.ActionArgs) {
  const user = await requireUser(request);
  return { user }
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return <DashboardView user={loaderData.user} />;
}