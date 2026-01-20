/**
 * Site Configuration
 * 
 * Central configuration for AI Agents Kit - a tech blog focused on
 * AI updates, code snippets, dev guides and AI agent-related articles.
 */

export const siteConfig = {
    name: 'AI Agents Kit',
    title: 'AI Agents Kit - AI Updates, Code & Dev Guides',
    description: 'Your toolkit for building intelligent agents. Tutorials, code snippets, prompts, and the latest AI updates—all in one place.',
    tagline: 'Your toolkit for building intelligent agents',
    url: 'https://aiagentskit.com',
    author: 'Vibe Coder',

    // Social Links
    social: {
        twitter: 'https://x.com/quantumaidev',
        github: 'https://github.com/aiagentskit',
        email: 'aiagentskit@gmail.com',
    },

    // Navigation
    nav: [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ],

    // Header Categories (Featured in Topics dropdown)
    headerCategories: [
        { name: 'AI Agents', slug: 'ai-agents', icon: 'bot' },
        { name: 'AI News', slug: 'ai-news', icon: 'newspaper' },
        { name: 'AI Tools', slug: 'ai-tools', icon: 'wrench' },
        { name: 'Prompts', slug: 'prompt-engineering', icon: 'terminal' },
        { name: 'MCP', slug: 'mcp', icon: 'plug' },
        { name: 'Code', slug: 'code-snippets', icon: 'code' },
    ],

    // Footer Links
    footerLinks: [
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'RSS', href: '/rss.xml' },
    ],

    // Blog Settings
    blog: {
        postsPerPage: 6,
        showReadingTime: true,
        showTableOfContents: true,
        showRelatedPosts: true,
        showAuthorBio: true,
    },

    // SEO Defaults
    seo: {
        ogImage: '/og-default.webp',
        twitterCard: 'summary_large_image',
    },

    // Author Bio (for tech focus)
    authorBio: {
        name: 'Vibe Coder',
        role: 'AI Engineer & Developer',
        bio: 'Building intelligent systems and sharing learnings along the way. Passionate about AI agents, LLMs, and developer tools that make AI accessible to everyone.',
    },
};

export type SiteConfig = typeof siteConfig;
