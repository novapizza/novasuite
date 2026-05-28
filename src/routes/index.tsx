import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/ProductPage";
import { getProduct } from "@/lib/products";
import { productHead } from "@/lib/product-head";

const product = getProduct("novapad")!;

export const Route = createFileRoute("/")({
  head: () => productHead(product),
  component: () => <ProductPage product={product} />,
});
