// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://aiagentskit.com",
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/page/'),
		}),
		tailwind({ applyBaseStyles: false }),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});

