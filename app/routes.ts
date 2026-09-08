import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("dashboard", "routes/dashboard.tsx", [
        index("routes/dashboard-home.tsx"),
        route("search", "routes/search.tsx"),
        route("lists", "routes/lists.tsx"),
        route("friends", "routes/friends.tsx"),
        route("details/:id", "routes/details.tsx")
    ]),

    route('api/create-account', 'routes/api/create-account.ts'),
    route('api/signin', 'routes/api/signin.ts'),

] satisfies RouteConfig;
