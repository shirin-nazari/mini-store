import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getProductById } from "../api/products";
import {
  Star,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Truck,
  X,
  Check,
} from "lucide-react";
import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";
import { useFavoriteStore } from "../store/favoriteStore";
import PageLoading from "../components/common/PageLoading";
import PageError from "../components/common/PageError";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetails,
});

const Stars = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={
            i < Math.round(rating)
              ? "fill-amber-500 text-amber-500"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
};

const tabs = ["Description", "Specification", "Reviews"] as const;
type Tab = (typeof tabs)[number];

type CartMessage = { type: "success" | "error"; text: string } | null;

function ProductDetails() {
  const { productId } = Route.useParams();
  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading) return <PageLoading />;
  if (isError || !product) return <PageError message="Product not found" />;

  return <ProductView key={product.id} product={product} />;
}

const ProductView = ({ product }: { product: Product }) => {
  // --- hooks ---
  const addItem = useCartStore((s) => s.addItem);
  const isWishListed = useFavoriteStore((s) =>
    s.items.some((p) => p.id === product.id),
  );
  const toggle = useFavoriteStore((s) => s.toggle);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("Description");
  const [cartMessage, setCartMessage] = useState<CartMessage>(null);

  // پیام بعد از ۳ ثانیه محو میشه
  useEffect(() => {
    if (!cartMessage) return;
    const t = setTimeout(() => setCartMessage(null), 3000);
    return () => clearTimeout(t);
  }, [cartMessage]);

  // --- derived ---
  const discount = product.discountPercentage;
  const oldPrice =
    discount > 0 && discount < 100
      ? product.price / (1 - discount / 100)
      : null;
  const discountLabel = Math.round(discount);
  const images = product.images ?? [];
  const activeImageUrl = images[activeImage] ?? images[0];

  const handleAddToCart = () => {
    const result = addItem(product, quantity);
    if (result.success) {
      setCartMessage({ type: "success", text: "Product added to cart!" });
    } else if (result.reason === "insufficient-stock") {
      setCartMessage({ type: "error", text: "Not enough stock available!" });
    } else {
      setCartMessage({ type: "error", text: "Please enter a valid quantity." });
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex items-center gap-1 text-sm text-gray-900">
        <Link to="/" className="hover:text-gray-950">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link
          to="/category/$slug"
          className="capitalize hover:text-gray-950"
          params={{ slug: product.category }}
        >
          {product.category.replace(/-/g, " ")}
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium">{product.title}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-[auto_1fr_1fr]">
        {/* Thumbnails */}
        <div className="order-2 flex gap-2 md:order-1 md:flex-col">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveImage(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === activeImage}
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-gray-50 ${
                i === activeImage ? "border-red-700" : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`${product.title} image ${i + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="order-1 flex items-center justify-center rounded-2xl bg-gray-50 p-6 md:order-2">
          {activeImageUrl ? (
            <img
              src={activeImageUrl}
              alt={product.title}
              className="aspect-square w-full object-contain"
            />
          ) : (
            <p className="text-sm text-gray-500">No image available</p>
          )}
        </div>

        {/* Info */}
        <div className="order-3 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-gray-400 line-through">
                ${oldPrice.toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded bg-red-500 px-2 text-xs font-semibold text-white">
                {discountLabel}% OFF
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-sm text-gray-600">
            {product.availabilityStatus} · {product.stock} left
          </p>

          {/* Quantity + Add to cart + Wishlist */}
          <div className="flex items-center gap-3">
            {product.stock > 0 ? (
              <>
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((q) => Math.max(1, q - 1));
                      setCartMessage(null);
                    }}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    className="cursor-pointer p-3 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="w-8 text-center text-sm text-gray-700">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((q) => Math.min(product.stock, q + 1));
                      setCartMessage(null);
                    }}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="cursor-pointer p-3 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 cursor-pointer rounded-lg bg-red-700 py-3 font-semibold text-white transition hover:bg-red-800"
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <p className="font-semibold text-red-600">Out of Stock</p>
            )}

            <button
              type="button"
              onClick={() => toggle(product)}
              aria-label={
                isWishListed ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isWishListed}
              className="cursor-pointer rounded-lg border border-gray-300 p-3"
            >
              <Heart
                size={20}
                className={
                  isWishListed ? "fill-red-600 text-red-600" : "text-gray-700"
                }
              />
            </button>
          </div>

          {cartMessage && (
            <div
              role={cartMessage.type === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-2 flex w-full items-center gap-2 rounded-md border-2 px-4 py-4 ${
                cartMessage.type === "success"
                  ? "border-green-600 bg-green-50"
                  : "border-red-600 bg-red-50"
              }`}
            >
              {cartMessage.type === "success" ? (
                <span className="rounded-full border-2 border-green-600 p-1">
                  <Check className="text-green-600" size={15} />
                </span>
              ) : (
                <span className="rounded-full border-2 border-red-600 p-1">
                  <X className="text-red-600" size={15} />
                </span>
              )}
              <p
                className={`text-sm font-medium ${
                  cartMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {cartMessage.text}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info strip */}
      <div className="mt-8 grid gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-3">
        {[
          { icon: Truck, title: "Shipping", text: product.shippingInformation },
          { icon: RotateCcw, title: "Returns", text: product.returnPolicy },
          {
            icon: ShieldCheck,
            title: "Warranty",
            text: product.warrantyInformation,
          },
        ].map(({ icon: Icon, text, title }) => (
          <div className="flex items-center gap-3" key={title}>
            <Icon size={24} className="shrink-0 text-gray-700" />
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 rounded-xl border border-gray-200">
        <div
          role="tablist"
          aria-label="Product information"
          className="flex gap-6 border-b border-gray-200 px-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab}`}
              tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 py-3 text-sm font-medium ${
                activeTab === tab
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="p-4 text-sm text-gray-600"
        >
          {activeTab === "Description" && <p>{product.description}</p>}

          {activeTab === "Specification" && (
            <dl className="grid max-w-md grid-cols-2 gap-y-2">
              <dt className="text-gray-500">SKU</dt>
              <dd>{product.sku}</dd>
              <dt className="text-gray-500">Weight</dt>
              <dd>{product.weight} oz</dd>
              <dt className="text-gray-500">Dimensions</dt>
              <dd>
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth}
              </dd>
              {product.brand && (
                <>
                  <dt className="text-gray-500">Brand</dt>
                  <dd>{product.brand}</dd>
                </>
              )}
            </dl>
          )}

          {activeTab === "Reviews" && (
            <ul className="space-y-4">
              {product.reviews.map((r) => (
                <li className="space-y-1" key={`${r.reviewerName}-${r.date}`}>
                  <div className="flex items-center gap-2">
                    <Stars rating={r.rating} size={12} />
                    <span className="font-medium text-gray-900">
                      {r.reviewerName}
                    </span>
                  </div>
                  <p>{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
