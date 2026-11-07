import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/products";
import ProductCard from "../cards/ProductCard";
import type { Product } from "../../types/product";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
const PAGE_SIZE = 6;

type Props = {
  title: string;
  products: Product[];
  activeSlug?: string;
  showSidebar?: boolean;
};
type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "title";
const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "title", label: "Name: A to Z" },
];
const ProductListLayout = ({
  title,
  products,
  activeSlug,
  showSidebar = true,
}: Props) => {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [page, setPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: showSidebar,
  });
  //  list brand and quantity of each
  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      if (!p.brand) continue;
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);
  // products filtered
  const visibleProducts = useMemo(() => {
    const filtered =
      selectedBrand.length === 0
        ? products
        : products.filter((p) => p.brand && selectedBrand.includes(p.brand));
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return sorted;
  }, [products, selectedBrand, sortBy]);
  const totalPages = Math.ceil(visibleProducts.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const pagedProducts = visibleProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Toggle brand
  const toggleBrand = (brand: string) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
    setPage(1);
  };
  const linkBase = "block rounded-lg px-3 py-2 text-sm";
  const active = "bg-gray-50 font-medium text-rose-700";
  const inActive = "text-gray-600 hover:text-gray-500";
  return (
    // <section className="mx-auto max-w-7xl px-4 py-6">
    <section className="mx-auto max-w-7xl px-4 pb-6">
      <div
        className={`grid items-start gap-6 ${
          showSidebar ? "md:grid-cols-[220px_1fr]" : ""
        }`}
      >
        {/* Aside */}
        {showSidebar && (
          <aside className="sticky top-0 hidden h-screen flex-col overflow-hidden border-r-2 border-gray-100 py-6 pr-4 md:flex">
            <div className="max-h-80  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
              <h2 className="font-semibold mb-3 text-gray-800">Categories</h2>
              <nav className="space-y-1">
                <Link
                  to="/products"
                  className={`${linkBase} ${!activeSlug ? active : inActive}`}
                >
                  All
                </Link>
                {categories?.map((category) => (
                  <Link
                    key={category.slug}
                    to="/category/$slug"
                    params={{ slug: category.slug }}
                    className={`${linkBase} ${activeSlug === category.slug ? active : inActive}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>

            {brands.length > 0 && (
              <div className="mt-4 flex min-h-0 flex-1 flex-col border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-800">Brand</h2>
                  {selectedBrand.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedBrand([]);
                        setPage(1);
                      }}
                      className="text-xs text-red-800 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <ul className="max-h-80 space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
                  {brands.map(([brand, count]) => (
                    <li key={brand}>
                      <label className="cursor-pointer flex items-center gap-1 text-sm ">
                        <input
                          type="checkbox"
                          checked={selectedBrand.includes(brand)}
                          className="h-4 w-4 scheme-light accent-gray-300 "
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className="px-2 text-gray-600">{brand}</span>
                        <span className="text-gray-400">({count})</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}
        {/* content */}
        <div className="pt-6">
          {showSidebar && (
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
              className="mb-4 flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 md:hidden"
              aria-expanded={isMobileFiltersOpen}
              aria-controls="mobile-filters"
            >
              {isMobileFiltersOpen ? "Close Filters" : "Filters"}
            </button>
          )}
          {showSidebar && isMobileFiltersOpen && (
            <div
              id="mobile-filters"
              className="mb-6 rounded-xl border border-gray-200 bg-white p-4 md:hidden"
            >
              <h2 className="mb-3 font-semibold text-gray-800">Categories</h2>

              <nav className="mb-5 flex flex-wrap gap-2">
                <Link
                  to="/products"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className={`${linkBase} ${!activeSlug ? active : inActive}`}
                >
                  All
                </Link>

                {categories?.map((category) => (
                  <Link
                    key={category.slug}
                    to="/category/$slug"
                    params={{ slug: category.slug }}
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className={`${linkBase} ${
                      activeSlug === category.slug ? active : inActive
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>

              {brands.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Brand</h2>

                    {selectedBrand.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBrand([]);
                          setPage(1);
                        }}
                        className="text-xs text-red-800 hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {brands.map(([brand, count]) => (
                      <label
                        key={brand}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrand.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="h-4 w-4 accent-gray-300"
                        />
                        <span className="text-gray-600">{brand}</span>
                        <span className="text-gray-400">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 ">{title}</h1>
              <p className="mb-4 text-sm text-gray-500">
                {visibleProducts.length} Products Found
              </p>
            </div>
            <label
              htmlFor="sort-products"
              className="flex items-center gap-2 text-sm text-gray-600 "
            >
              <span className="hidden sm:inline">Sort By :</span>
              <select
                value={sortBy}
                id="sort-products"
                onChange={(e) => {
                  setSortBy(e.target.value as SortKey);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-red-800"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {visibleProducts.length === 0 ? (
            <p className="py-10 text-center text-gray-500">
              No products match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {pagedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductListLayout;
