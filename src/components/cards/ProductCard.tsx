import { Heart, Star } from "lucide-react";
import type { Product } from "../../types/product";
import { Link } from "@tanstack/react-router";
import { useFavoriteStore } from "../../store/favoriteStore";
type ProductProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductProps) => {
  const { id, title, thumbnail, rating, price, discountPercentage } = product;

  const disCount = Math.round(discountPercentage);
  const oldPrice = disCount > 0 ? price / (1 - discountPercentage / 100) : null;
  const isWishListed = useFavoriteStore((s) =>
    s.items.some((p) => p.id === id),
  );
  const toggle = useFavoriteStore((s) => s.toggle);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-300 bg-gray-50/5  hover:shadow">
      <div className="relative p-3 w-full bg-red-100/20">
        <button
          onClick={() => toggle(product)}
          aria-label={isWishListed ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishListed}
          className={`absolute right-3 top-3 z-10 `}
        >
          <Heart
            size={18}
            className={`text-gray-800 ${isWishListed ? "fill-red-700 text-red-900" : ""} cursor-pointer`}
          />
        </button>
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="aspect-square w-full object-contain"
          />
          {disCount > 0 && (
            <span className="absolute bottom-1 left-0 rounded-full bg-rose-950 text-white px-2 py-1 text-xs font-semibold">
              -{disCount}%
            </span>
          )}
        </div>
      </div>
      <div className="p-3 mt-3 space-y-1">
        <h3 className="line-clamp-1 text-red-950 font-semibold text-sm">
          <Link
            to="/products/$productId"
            params={{ productId: String(id) }}
            className="after:absolute after:inset-0"
          >
            {title}
          </Link>
        </h3>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              strokeWidth={1.5}
              key={i}
              size={14}
              className={
                i < Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">
            ({rating.toFixed(1)})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-900 font-bold text-base">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-xs text-red-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
