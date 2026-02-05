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
        slug: 'inspirational',
        name: 'Inspirational',
        description: 'Uplifting words to spark hope, purpose, and momentum.',
        icon: 'sparkles',
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
        slug: 'love-relationships',
        name: 'Love & Relationships',
        description: 'Connection, romance, and the bonds that shape our lives.',
        icon: 'share',
        featured: true,
    },
    {
        slug: 'friendship',
        name: 'Friendship',
        description: 'Loyalty, support, and the people who feel like home.',
        icon: 'message-square',
    },
    {
        slug: 'family',
        name: 'Family',
        description: 'Belonging, support, and the people who shape us most.',
        icon: 'layers',
    },
    {
        slug: 'happiness-joy',
        name: 'Happiness & Joy',
        description: 'Light, laughter, and the simple pleasures of life.',
        icon: 'sun',
    },
    {
        slug: 'gratitude',
        name: 'Gratitude',
        description: 'Appreciation, thankfulness, and noticing what matters.',
        icon: 'check',
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
        slug: 'humor-wit',
        name: 'Humor & Wit',
        description: 'Clever, funny, and lighthearted perspectives.',
        icon: 'copy',
    },
    {
        slug: 'short-quotes',
        name: 'Short Quotes',
        description: 'Bite-sized lines made for quick boosts and captions.',
        icon: 'message-square',
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
    | 'inspirational'
    | 'life-wisdom'
    | 'love-relationships'
    | 'friendship'
    | 'family'
    | 'happiness-joy'
    | 'gratitude'
    | 'courage-confidence'
    | 'mindfulness-peace'
    | 'humor-wit'
    | 'short-quotes';
