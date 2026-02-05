/**
 * Category Configuration
 *
 * Defines all quote categories for the site.
 * Each category has a slug, name, description, and icon.
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
    {
        slug: 'motivation-success',
        name: 'Motivation & Success',
        description: 'Drive, ambition, and the push to achieve your goals.',
        icon: 'zap',
        featured: true,
    },
    {
        slug: 'love-relationships',
        name: 'Love & Relationships',
        description: 'Connection, romance, and the bonds that shape our lives.',
        icon: 'share',
        featured: true,
    },
    {
        slug: 'life-wisdom',
        name: 'Life & Wisdom',
        description: 'Timeless lessons and thoughtful reflections on living well.',
        icon: 'book-open',
        featured: true,
    },
    {
        slug: 'happiness-joy',
        name: 'Happiness & Joy',
        description: 'Light, laughter, and the simple pleasures of life.',
        icon: 'sun',
    },
    {
        slug: 'friendship',
        name: 'Friendship',
        description: 'Loyalty, support, and the people who feel like home.',
        icon: 'message-square',
    },
    {
        slug: 'courage-confidence',
        name: 'Courage & Confidence',
        description: 'Bravery, resilience, and believing in yourself.',
        icon: 'arrow-right',
    },
    {
        slug: 'mindfulness-peace',
        name: 'Mindfulness & Peace',
        description: 'Presence, calm, and quiet strength within.',
        icon: 'moon',
    },
    {
        slug: 'creativity-art',
        name: 'Creativity & Art',
        description: 'Imagination, inspiration, and the creative spirit.',
        icon: 'sparkles',
    },
    {
        slug: 'leadership-responsibility',
        name: 'Leadership & Responsibility',
        description: 'Integrity, purpose, and guiding others with care.',
        icon: 'layers',
    },
    {
        slug: 'humor-wit',
        name: 'Humor & Wit',
        description: 'Clever, funny, and lighthearted perspectives.',
        icon: 'copy',
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
    | 'motivation-success'
    | 'love-relationships'
    | 'life-wisdom'
    | 'happiness-joy'
    | 'friendship'
    | 'courage-confidence'
    | 'mindfulness-peace'
    | 'creativity-art'
    | 'leadership-responsibility'
    | 'humor-wit';
