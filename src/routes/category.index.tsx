import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "../api/products";
// import { categoryIcons } from "../components/home/iconsCategori";
import ProductListLayout from "../components/products/ProductListLayout";
import PageLoading from "../components/common/PageLoading";
import PageError from "../components/common/PageError";

export const Route = createFileRoute("/category/")({
  component: Categories,
});

function Categories() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["categories", "products", { limit: 30 }],
    queryFn: () => getProducts(30),
  });
  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError />;
  return <ProductListLayout title="All Products" products={data.products} />;
}
