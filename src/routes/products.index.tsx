import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "../api/products";
import ProductListLayout from "../components/products/ProductListLayout";
import PageError from "../components/common/PageError";
import PageLoading from "../components/common/PageLoading";

export const Route = createFileRoute("/products/")({
  component: Products,
});

function Products() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["products", { limit: 30 }],
    queryFn: () => getProducts(30),
  });
  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError onRetry={() => refetch()} />;
  return <ProductListLayout title="All Products" products={data.products} />;
}
