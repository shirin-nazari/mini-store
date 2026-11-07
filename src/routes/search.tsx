import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { searchProduct } from "../api/products";
import ProductListLayout from "../components/products/ProductListLayout";
import PageLoading from "../components/common/PageLoading";
import PageError from "../components/common/PageError";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", "search", q],
    queryFn: () => searchProduct(q),
    enabled: q.trim().length > 0,
  });
  if (!q.trim()) return <p className="p-6">Type something to search</p>;
  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError onRetry={() => refetch()} />;
  return (
    <ProductListLayout
      key={q}
      products={data.products}
      title={`Results for "${q}"`}
    />
  );
}
