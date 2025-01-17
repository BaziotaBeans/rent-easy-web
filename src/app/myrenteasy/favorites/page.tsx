"use client"
import { FavoriteCard } from "./components/favorite-card";

export default function Page() {
  return (
    <main className="flex flex-col py-10 gap-6">
      <h1 className="text-3xl text-zinc-600 font-bold">Favoritos</h1>

      <div className="grid grid-cols-5 gap-6">
        <FavoriteCard />
        <FavoriteCard />
      </div>
    </main>
  );
}
