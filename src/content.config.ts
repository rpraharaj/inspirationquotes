import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/**
 * Blog Collection Schema
 * 
 * Enhanced schema for AI Agents Kit with category support,
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
		// Category - all options from content-ideas.md + legacy categories
		category: z.enum([
			// Primary categories from content plan
			'ai-agents',
			'ai-tools',
			'ai-news',
			'tutorials',
			'chatgpt',
			'prompt-engineering',
			'ai-comparisons',
			'ai-careers',
			'generative-ai',
			'open-source-ai',
			'ai-ethics',
			'ai-business',
			'llms',
			'ai-hardware',
			'industry-ai',
			// Legacy categories
			'prompts',
			'mcp',
			'tools',
			'code-snippets',
			'vibe-coding'
		]).default('ai-news'),
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
