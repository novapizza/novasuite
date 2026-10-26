import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Nova Suite" },
      {
        name: "description",
        content: "The people behind Nova Suite: the NOVAPIZZA crew and everyone who contributed.",
      },
      { property: "og:title", content: "About Nova Suite" },
    ],
  }),
  component: AboutPage,
});
