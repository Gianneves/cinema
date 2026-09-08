# Cinéma

A movie discovery web app with **AI-powered semantic search**, built with **React Router**, **React 19**, **TypeScript**, and **Tailwind CSS**.

[![Node version](https://img.shields.io/badge/node-%3E%3D%2020-brightgreen)](https://nodejs.org/)
[![React version](https://img.shields.io/badge/react-%5E19.2-blue)](https://react.dev/)
[![TypeScript version](https://img.shields.io/badge/typescript-%5E5.9-blue)](https://www.typescriptlang.org/)

---

## About

**Cinéma** is the frontend for the [Semantic Movie Search](https://github.com/Gianneves/semantic-movie-search) backend. It is a streaming-style interface that lets you discover movies using natural language — not just keywords. Instead of matching exact terms, the search understands the **meaning** behind your query through vector embeddings and AI.

For example, searching for *"a movie about a dinosaur theme park that goes wrong"* will correctly return **Jurassic Park**, even though the word "dinosaur" never needs to appear as a literal match.

This project was built as a portfolio piece to demonstrate a full-stack **RAG (Retrieval-Augmented Generation)** experience, connecting a modern React frontend to a semantic search API.

## Features

- **Authentication** — sign in and account creation, with cookie-based sessions proxied to the backend (`/auth/login`, `/auth/me`, `/users`)
- **Dashboard** — movie carousels by category (popular, horror, animation, drama)
- **AI semantic search** — natural language queries powered by the backend `find-movie` endpoint, with quick genre filters
- **Movie details** — backdrops, cover art, genres, runtime, director, cast, and user reviews
- **Lists & Friends** — placeholder pages ready for future features
- **Dark UI** — custom Tailwind theme with shadcn/ui-style components and a warm gold accent (`#F0A42E`)

## How It Works

```
┌─────────────────────────────────────────┐
│                React UI                 │
│  Welcome / Dashboard / Search / Details │
└──────────────────┬──────────────────────┘
                   │ React Router (loaders + actions)
                   ▼
┌─────────────────────────────────────────┐
│          Server-side actions            │
│  auth (cookie forwarding) · data fetch  │
└──────────────────┬──────────────────────┘
                   │ HTTP (API_URL)
                   ▼
┌─────────────────────────────────────────┐
│      Semantic Movie Search backend      │
│   OpenAI embeddings · pgvector · LLM    │
└─────────────────────────────────────────┘
```

### Flow:

1. The user signs in or creates an account via React Router **actions**, which proxy credentials to the backend and forward the returned session cookie to the browser.
2. The dashboard **loaders** fetch categorized movie lists from the backend (`/movie/popular`, `/movie?category=...`).
3. On the search page, the user types a natural language query and hits search; a `POST` is sent to `/movie/find-movie`.
4. The backend converts the query into an embedding, performs a pgvector similarity search, and returns the top semantic matches.
5. The results are rendered as a grid of movie cards, highlighting that matches were found "analyzing themes, atmosphere, narrative, and visual style".

## Technologies Used

| Category          | Technology |
| ----------------- | ---------- |
| **Framework**     | React Router 8 (SSR full-stack mode) |
| **UI Library**    | React 19 |
| **Language**      | TypeScript |
| **Bundler**       | Vite 8 |
| **Styling**       | Tailwind CSS 4, `class-variance-authority`, `tailwind-merge`, `tw-animate-css` |
| **Components**    | shadcn/ui-style primitives, `@base-ui/react`, `lucide-react` |
| **Carousel**      | Embla Carousel React |
| **Font**          | Geist (`@fontsource-variable/geist`) |
| **Containerization** | Docker |

## Prerequisites

- **Node.js** >= 20
- A running instance of the [Semantic Movie Search](https://github.com/Gianneves/semantic-movie-search) backend (defaults to `http://localhost:3001/api/v1`)

## Setup

### 1. Clone the repository

```bash
git clone git@github.com:Gianneves/cinema.git
cd cinema
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` to match your backend:

- `VITE_API_URL` — base URL of the backend API (default `http://localhost:3001/api/v1`)
- `VITE_ASSETS_URL` — base URL for static assets such as avatars (default `http://localhost:3001`)

### 3. Install dependencies

```bash
npm install
```

### 4. Run the application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

Serve the production build:

```bash
npm start
```

### Docker

```bash
docker build -t cinema .

docker run -p 3000:3000 cinema
```

## Pages

| Route                  | Description |
| ---------------------- | ----------- |
| `/`                    | Welcome / landing page with sign-in and account creation |
| `/dashboard`           | Home with movie carousels by category |
| `/dashboard/search`    | AI-powered semantic search with genre filters |
| `/dashboard/lists`     | Lists (placeholder) |
| `/dashboard/friends`   | Friends (placeholder) |
| `/dashboard/details/:id` | Movie details, cast, and reviews |

## Project Structure

```
app/
├── root.tsx                  # Root layout + error boundary
├── routes.ts                 # Route configuration
├── app.css                   # Global styles
├── constants/
│   └── api.ts                # API base URLs (from env)
├── lib/
│   ├── auth.server.ts        # Server-side auth helpers (getUser / requireUser)
│   └── utils.ts              # cn() class helper
├── welcome/                  # Welcome / landing page
├── dashboard/
│   └── dashboard.tsx         # Dashboard layout (header + outlet)
├── components/
│   ├── Header.tsx            # Top navigation
│   ├── auth.tsx              # Sign in / create account tabs
│   ├── carouselMovies.tsx    # Movie carousel
│   ├── movieCard.tsx         # Movie card
│   ├── review.tsx            # Review display
│   ├── searchInput.tsx       # Search bar
│   └── ui/                   # UI primitives (button, card, badge, ...)
└── routes/
    ├── home.tsx              # Redirects authed users to /dashboard
    ├── dashboard.tsx         # Auth-guarded dashboard layout
    ├── dashboard-home.tsx    # Category carousels
    ├── search.tsx            # Semantic search
    ├── lists.tsx             # Lists page
    ├── friends.tsx           # Friends page
    ├── details.tsx           # Movie details
    └── api/                  # Backend data fetchers + auth actions
```

## Notes

- This is a **portfolio project** and is not intended for production use.
- All authentication and data flows through the **Semantic Movie Search** backend; the backend must be running for the app to work.
- The `.env` file is excluded from version control (see `.gitignore`). Use `.env.example` as a template.
- UI copy is written in **Brazilian Portuguese (pt-BR)**.
