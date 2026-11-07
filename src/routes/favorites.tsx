import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import ProductCard from "../components/cards/ProductCard";
import { useFavoriteStore } from "../store/favoriteStore";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
});

function Favorites() {
  const items = useFavoriteStore((s) => s.items);
  const clear = useFavoriteStore((s) => s.clear);
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="bg-rose-50 w-40 h-40 flex items-center justify-center mx-auto rounded-full">
          <Heart size={70} className="mx-auto text-rose-950" />
        </div>
        <h1 className="text-xl mt-4 font-bold text-gray-900">
          No favorite yet
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Tap the heart on any product at save it here.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-red-800 px-6 py-3 text-sm text-white cursor-pointer font-semibold"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-sm text-gray-500">{items.length} items</p>
        </div>
        <button
          className="text-sm text-red-800 hover:underline"
          onClick={clear}
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
