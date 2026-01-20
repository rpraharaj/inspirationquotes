/**
 * Category Configuration
 * 
 * Defines all content categories for AI Agents Kit.
 * Each category has a slug, name, description, and icon.
 * 
 * Categories are aligned with the content plan in blogpost-content-plan/content-ideas.md
 */

import type { IconName } from '../types/icons';

export interface Category {
    slug: string;
    name: string;
    description: string;
    icon: IconName;
    featured?: boolean;
}

export const categories: Category[] = [
    // Core Identity Categories
    {
        slug: 'ai-agents',
        name: 'AI Agents',
        description: 'Master autonomous AI systems with guides on agent architectures, multi-agent orchestration, agentic workflows, and building intelligent automation.',
        icon: 'bot',
        featured: true,
    },
    {
        slug: 'ai-tools',
        name: 'AI Tools',
        description: 'In-depth reviews and comparisons of the best AI tools for writing, coding, design, and productivity. Make informed decisions with expert analysis.',
        icon: 'wrench',
        featured: true,
    },
    {
        slug: 'ai-news',
        name: 'AI News',
        description: 'Stay ahead with breaking AI news, model releases, industry analysis, and company announcements. Your daily source for artificial intelligence updates.',
        icon: 'newspaper',
    },
    {
        slug: 'tutorials',
        name: 'Tutorials',
        description: 'Learn by doing with step-by-step tutorials, hands-on projects, and practical implementations. Build real AI applications with working code examples.',
        icon: 'book-open',
    },
    {
        slug: 'chatgpt',
        name: 'ChatGPT',
        description: 'Unlock ChatGPT\'s full potential with expert prompts, tips, plugins, and use cases. From beginner basics to advanced techniques and productivity hacks.',
        icon: 'message-square',
    },
    {
        slug: 'prompt-engineering',
        name: 'Prompt Engineering',
        description: 'Master the art of prompting with proven techniques, templates, and optimization strategies. Learn system prompts and advanced methods that get results.',
        icon: 'terminal',
        featured: true,
    },
    {
        slug: 'ai-comparisons',
        name: 'AI Comparisons',
        description: 'Head-to-head comparisons of leading AI tools, models, and platforms. Unbiased analysis to help you choose the right solution for your needs.',
        icon: 'layers',
    },
    {
        slug: 'ai-careers',
        name: 'AI Careers',
        description: 'Advance your AI career with job guides, essential skills, certifications, interview prep, and learning paths. Navigate the AI job market with confidence.',
        icon: 'zap',
    },
    {
        slug: 'generative-ai',
        name: 'Generative AI',
        description: 'Create stunning content with AI image, video, audio, and text generation tools. Master creative workflows and unlock your artistic potential.',
        icon: 'sparkles',
    },
    {
        slug: 'open-source-ai',
        name: 'Open Source AI',
        description: 'Run AI on your own terms with open models, Hugging Face, Ollama, and local LLMs. Self-host powerful AI without cloud dependencies.',
        icon: 'code',
    },
    {
        slug: 'ai-ethics',
        name: 'AI Ethics',
        description: 'Navigate responsible AI development with guides on bias mitigation, alignment, regulations, and governance. Build ethical AI systems that benefit society.',
        icon: 'brain',
    },
    {
        slug: 'ai-business',
        name: 'AI Business',
        description: 'Transform your business with enterprise AI strategies, ROI analysis, implementation guides, and real-world case studies. Drive automation that delivers.',
        icon: 'cpu',
    },
    {
        slug: 'llms',
        name: 'LLMs',
        description: 'Understand large language models inside out. Technical deep dives into architectures, training, fine-tuning, and how modern AI actually works.',
        icon: 'file-code',
        featured: true,
    },
    {
        slug: 'ai-hardware',
        name: 'AI Hardware',
        description: 'Choose the right hardware for AI workloads. Guides on GPUs, TPUs, AI PCs, edge computing, and on-device inference for optimal performance.',
        icon: 'cpu',
    },
    {
        slug: 'industry-ai',
        name: 'Industry AI',
        description: 'AI applications transforming Healthcare, Legal, Finance, Education, and Marketing. Industry-specific guides and real-world implementation strategies.',
        icon: 'layers',
    },
    {
        slug: 'mcp',
        name: 'MCP',
        description: 'Master Model Context Protocol with comprehensive guides, server integrations, and best practices. Connect Claude to any tool or data source.',
        icon: 'plug',
        featured: true,
    },
    {
        slug: 'code-snippets',
        name: 'Code Snippets',
        description: 'Production-ready code snippets for AI development. Copy-paste Python, TypeScript, and API examples that work out of the box.',
        icon: 'code',
        featured: true,
    },
    {
        slug: 'vibe-coding',
        name: 'Vibe Coding',
        description: 'Build applications using natural language prompts. AI-assisted programming that turns your ideas into working code—no syntax memorization needed.',
        icon: 'sparkles',
    },
];

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(cat => cat.slug === slug);
}

/**
 * Get all category slugs (for validation)
 */
export function getCategorySlugs(): string[] {
    return categories.map(cat => cat.slug);
}

/**
 * Get featured categories (for footer display)
 */
export function getFeaturedCategories(): Category[] {
    return categories.filter(cat => cat.featured === true);
}

/**
 * Category type for type-safe usage
 * Includes all categories from content plan plus legacy categories
 */
export type CategorySlug =
    // Primary categories from content plan
    | 'ai-agents'
    | 'ai-tools'
    | 'ai-news'
    | 'tutorials'
    | 'chatgpt'
    | 'prompt-engineering'
    | 'ai-comparisons'
    | 'ai-careers'
    | 'generative-ai'
    | 'open-source-ai'
    | 'ai-ethics'
    | 'ai-business'
    | 'llms'
    | 'ai-hardware'
    | 'industry-ai'
    // Legacy categories (kept for future content)
    | 'mcp'
    | 'code-snippets'
    | 'vibe-coding';

