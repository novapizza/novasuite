import { createFileRoute } from "@tanstack/react-router";
import { AppGrid } from "@/components/home/AppGrid";
import { Hero } from "@/components/home/Hero";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <AppGrid />
    </>
  );
}
