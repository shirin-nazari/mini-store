import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "../api/products";
import ProductListLayout from "../components/products/ProductListLayout";
import PageLoading from "../components/common/PageLoading";
import PageError from "../components/common/PageError";

export const Route = createFileRoute("/category/$slug")({
  component: CategorySlug,
});

function CategorySlug() {
  const { slug } = Route.useParams();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", "category", slug],
    queryFn: () => getProductByCategory(slug),
  });
  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError onRetry={() => refetch()} />;
  return (
    <ProductListLayout
      key={slug}
      title={slug.replace(/-/g, " ")}
      products={data.products}
      activeSlug={slug}
    />
  );
}
