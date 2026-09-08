import { Auth } from "~/components/auth";


export function Welcome() {
  return (
    <main className="h-screen overflow-hidden">
      <div className="relative h-full">
        <img src="/movie-poster-collage-4-doug-siegel.jpg" className="w-full h-full object-cover block" alt="backdrops image" />
        <div className="absolute inset-0 bg-linear-to-t from-[#07070E] via-[#07070E]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1><span className="text-gray-50 [text-stroke:1px_black] [-webkit-text-stroke:1px_black] italic text-6xl font-bold mr-2"
          >
            Cin<span className="text-[#F0A42E]">é</span>ma</span></h1>
          <p className="mt-1 mb-8 text-sm text-gray-50 font-bold">Welcome back, film lover.</p>
          <Auth />
        </div>
      </div>
    </main>
  );
}

