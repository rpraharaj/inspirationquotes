// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://inspirationquoteshub.com",
	output: "static", // Pure static site - no server/worker needed
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/page/'),
		}),
		tailwind({ applyBaseStyles: false }),
	],
	// No adapter needed for static sites
});

