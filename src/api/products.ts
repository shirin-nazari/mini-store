import type { Category, ProductsResponse, Product } from "../types/product";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getProducts = async (limit = 8): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error("failed to Fetch Products");
  return res.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("failed to Fetch Categories");
  return res.json();
};

export const getProductByCategory = async (
  slug: string,
): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE_URL}/products/category/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch Products");
  return res.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product is not found");
  return res.json();
};
export const searchProduct = async (q: string): Promise<ProductsResponse> => {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(q)}&limit=0`,
  );
  if (!res.ok) throw new Error("Failed to search product");
  return res.json();
};
