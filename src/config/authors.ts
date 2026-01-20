/**
 * Authors Configuration
 * 
 * This file contains all author information for the blog.
 * Add new authors here and reference them by ID in blog post frontmatter.
 */

export interface Author {
    id: string;
    name: string;
    bio: string;
    avatar?: string;
    role?: string;
    expertise?: string[];
    experience?: string;
    achievements?: string[];
    social?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
        website?: string;
    };
}

export const authors: Record<string, Author> = {
    'default': {
        id: 'default',
        name: 'Vibe Coder',
        bio: 'AI Engineer with 5+ years of experience building production AI systems. Specialized in AI agents, LLMs, and developer tools. Previously built AI solutions processing millions of requests daily. Passionate about making AI accessible to every developer.',
        avatar: '/author-avatar.webp',
        role: 'AI Engineer & Technical Writer',
        expertise: ['AI Agents', 'LLMs', 'Prompt Engineering', 'Python', 'TypeScript', 'Model Context Protocol'],
        experience: '5+ years',
        achievements: [
            'Built AI systems processing 1M+ daily requests',
            'Open source contributor to AI tooling',
            'Technical writer with 100+ published articles',
        ],
        social: {
            twitter: 'https://x.com/quantumaidev',
            github: 'https://github.com/aiagentskit',
            website: 'https://aiagentskit.com',
        },
    },
    'guest': {
        id: 'guest',
        name: 'Guest Author',
        bio: 'A contributing writer sharing insights and perspectives on technology and development.',
        avatar: '/authors/guest-avatar.webp',
        role: 'Guest Contributor',
        social: {
            twitter: 'https://twitter.com/guest',
            github: 'https://github.com/guest',
        },
    },
    'tech-lead': {
        id: 'tech-lead',
        name: 'Alex Chen',
        bio: 'Senior software architect with 10+ years of experience in building scalable systems. Passionate about clean code and developer experience.',
        avatar: '/authors/tech-lead-avatar.webp',
        role: 'Technical Lead',
        social: {
            github: 'https://github.com/alexchen',
            linkedin: 'https://linkedin.com/in/alexchen',
        },
    },
};

export const defaultAuthorId = 'default';

/**
 * Get an author by ID, falls back to default author if not found
 */
export function getAuthor(authorId?: string): Author {
    if (!authorId) return authors[defaultAuthorId];
    return authors[authorId] || authors[defaultAuthorId];
}

/**
 * Get all authors
 */
export function getAllAuthors(): Author[] {
    return Object.values(authors);
}
