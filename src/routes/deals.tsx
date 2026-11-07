import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "../api/products";
import ProductListLayout from "../components/products/ProductListLayout";
import PageLoading from "../components/common/PageLoading";
import PageError from "../components/common/PageError";

export const Route = createFileRoute("/deals")({
  component: Deals,
});

const floaters = [
  { top: "10%", left: "6%", size: 40, delay: "0s" },
  { top: "60%", left: "15%", size: 28, delay: "1.2s" },
  { top: "20%", left: "30%", size: 22, delay: "2.4s" },
  { top: "65%", left: "45%", size: 34, delay: "0.6s" },
  { top: "15%", left: "62%", size: 26, delay: "1.8s" },
  { top: "55%", left: "78%", size: 44, delay: "3s" },
  { top: "12%", left: "90%", size: 30, delay: "0.9s" },
];

function Deals() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", { limit: 0 }],
    queryFn: () => getProducts(0),
  });
  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError onRetry={() => refetch()} />;
  const deals = data.products
    .filter((p) => p.discountPercentage >= 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);
  return (
    <>
      <section className="mx-auto mt-6 max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-xl bg-linear-to-b from-red-900 via-red-800 to-red-700 px-6 py-10 text-center">
          {floaters.map((f, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute animate-float select-none font-black text-white opacity-15"
              style={{
                top: f.top,
                left: f.left,
                fontSize: f.size * 1.5,
                animationDelay: f.delay,
              }}
            >
              %
            </span>
          ))}

          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Hot Deals
            </h1>
            <p className="mt-2 text-gray-100">
              Up to {Math.round(deals[0]?.discountPercentage ?? 0)}% off on
              selected products
            </p>
          </div>
        </div>
      </section>
      <ProductListLayout
        title="Today's Deals"
        products={deals}
        showSidebar={false}
      />
    </>
  );
}
