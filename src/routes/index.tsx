import { createFileRoute, Link } from "@tanstack/react-router";
import Hero from "../components/home/Hero";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../api/products";
import ProductCard from "../components/cards/ProductCard";
import CategoryCard from "../components/cards/CategoryCard";
import { categoryIcons } from "../components/home/iconsCategori";
import PageLoading from "../components/common/PageLoading";
import PageError from "../components/common/PageError";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(4),
  });

  return (
    <div className="container mx-auto ">
      <Hero />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 my-10 px-2 md:px-0">
        {categories?.slice(0, 6).map((c) => (
          <CategoryCard
            key={c.slug}
            slug={c.slug}
            name={c.name}
            icon={categoryIcons[c.slug]}
          />
        ))}
      </div>
      <section className="my-10">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-bold text-xl text-red-900 py-4">
            Features Products
          </h2>
          <Link to="/products" className="text-red-900 text-sm font-semibold">
            View All →
          </Link>
        </div>
        {isLoading && <PageLoading />}
        {isError && <PageError onRetry={() => refetch()} />}
        {data && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 px-2">
            {data?.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
