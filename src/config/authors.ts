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
        name: 'Inspiration Quotes Hub',
        bio: 'A small team of readers and writers curating timeless words from classic and modern voices. We focus on clarity, context, and attribution so every quote lands with meaning.',
        avatar: '/author-avatar.webp',
        role: 'Quote Curators',
        expertise: ['Motivation', 'Life Wisdom', 'Love & Relationships', 'Mindfulness', 'Creativity', 'Humor'],
        experience: 'Since 2024',
        achievements: [
            'Curates themed collections for everyday reflection',
            'Highlights quotes with clear sources and context',
            'Spotlights voices across cultures and eras',
        ],
        social: {
            twitter: 'https://x.com/inspirationquoteshub',
            website: 'https://inspirationquoteshub.com',
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
