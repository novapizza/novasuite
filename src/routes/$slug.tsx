import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductPage } from "@/components/ProductPage";
import { getProduct, isProductSlug } from "@/lib/products";
import { productHead } from "@/lib/product-head";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    if (!isProductSlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const product = getProduct(loaderData.slug);
    return product ? productHead(product) : {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useLoaderData();
  const product = getProduct(slug);
  if (!product) throw notFound();
  return <ProductPage product={product} />;
}
