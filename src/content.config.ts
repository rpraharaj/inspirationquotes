import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/**
 * Blog Collection Schema
 * 
 * Schema for quotes with category support,
 * tags, difficulty levels, and series grouping.
 */
const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// Category - all available quote categories
		category: z.enum([
			'motivation-success',
			'inspirational',
			'life-wisdom',
			'love-relationships',
			'friendship',
			'family',
			'happiness-joy',
			'gratitude',
			'courage-confidence',
			'mindfulness-peace',
			'humor-wit',
			'short-quotes'
		]).default('life-wisdom'),
		tags: z.array(z.string()).default([]),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
		featured: z.boolean().default(false),
		author: z.string().default('Vibe Coder'),
		// Optional series support for multi-part tutorials
		series: z.string().optional(),
		seriesOrder: z.number().optional(),
	}),
});

export const collections = { blog };
