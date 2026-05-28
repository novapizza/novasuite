import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/ProductPage";
import { getProduct } from "@/lib/products";

const product = getProduct("novapad");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${product.name} — ${product.tagline} | Nova Suite` },
      { name: "description", content: product.description },
      { property: "og:title", content: `${product.name} — ${product.tagline}` },
      { property: "og:description", content: product.description },
    ],
  }),
  component: () => <ProductPage product={product} />,
});
