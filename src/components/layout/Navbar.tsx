import { Link, useNavigate } from "@tanstack/react-router";
import {
  CircleUserRound,
  Heart,
  Home,
  Search,
  ShoppingCart,
  LayoutGrid,
} from "lucide-react";
import { selectCartCount, useCartStore } from "../../store/cartStore";
import { useState } from "react";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/category", label: "Categories" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
] as const;
const Navbar = () => {
  const cartCount = useCartStore(selectCartCount);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate({ to: "/search", search: { q } });
  };
  return (
    <div className="md:shadow md:shadow-gray-200">
      {/* Desktop  */}
      <header className="w-full px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 md:flex-nowrap md:gap-8">
          <Link to="/" className="order-1 shrink-0">
            <img
              src="/logo-miniShop.png"
              alt="miniShop"
              className="w-24 h-14 object-contain"
            />
          </Link>
          <form
            role="search"
            onSubmit={handleSubmit}
            className="order-3 md:order-2 mx-auto flex h-12 w-full md:w-1/2 rounded-lg items-center gap-2 border border-gray-300 px-4"
          >
            <button type="submit" aria-label="Search" className="shrink-0">
              <Search className="text-gray-400" size={20} />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-gray-600 p-2 outline-none placeholder:text-gray-400"
              placeholder="Search for Products.."
            />
          </form>
          <div className="order-2 flex items-center justify-center shrink md:shrink-0 gap-2 md:order-3 md:gap-8 md:flex ">
            <Link to="/favorites" className="cursor-pointer">
              <button aria-label="Wishlist">
                <Heart className="text-gray-800" size={20} />
              </button>
            </Link>
            <Link to="/cart" className="relative cursor-pointer">
              <button aria-label="Cart">
                <ShoppingCart className="text-gray-800" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 text-white px-1 text-xs bg-red-700 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            <img
              src="/pic.webp"
              alt="user"
              className="rounded-full w-8 h-8 object-cover"
            />
          </div>
        </div>
      </header>
      <div className="hidden w-full md:flex pb-2 px-9 text-gray-800 gap-5 ">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="border-b-2 border-transparent pb-2 text-sm font-medium text-gray-800"
            activeProps={{
              className:
                "border-rose-950 text-rose-950 underline underline-offset-[20px]",
            }}
            activeOptions={{ exact: link.to === "/" }}
          >
            {link.label}{" "}
          </Link>
        ))}
      </div>
      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-gray-200 bg-white px-4 py-3 md:hidden">
        <Link to="/">
          <Home className="text-gray-900" size={23} />
        </Link>
        <Link to="/category">
          <LayoutGrid className="text-gray-900" strokeWidth={1.5} />
        </Link>
        <Link to="/cart">
          <ShoppingCart className="text-gray-900" size={23} />
        </Link>
        <Link to="/">
          <CircleUserRound className="text-gray-900" size={23} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
