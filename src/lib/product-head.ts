import type { Product } from "./products";

export function productHead(product: Product) {
  const accent = product.tagline.accent ? ` ${product.tagline.accent}` : "";
  const title = `${product.name} — ${product.tagline.lead}${accent}`;
  return {
    meta: [
      { title: `${title} | Nova Suite` },
      { name: "description", content: product.description },
      { property: "og:title", content: title },
      { property: "og:description", content: product.description },
    ],
  };
}
