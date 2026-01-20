/**
 * Schema Configuration
 * 
 * Centralized configuration for JSON-LD structured data.
 * This is the single source of truth for organization and publisher info.
 */

import { siteConfig } from '../../config/site';
import type { OrganizationSchema, PersonSchema } from './types';
import { SCHEMA_CONTEXT } from './types';

/**
 * Default Organization Schema
 * Used as the publisher for all articles and site-wide schema
 */
export function getOrganizationSchema(): OrganizationSchema {
    return {
        '@context': SCHEMA_CONTEXT,
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/favicon.svg`,
            width: 512,
            height: 512,
        },
        description: siteConfig.description,
        sameAs: [
            siteConfig.social.twitter,
            siteConfig.social.github,
        ].filter(Boolean),
    };
}

/**
 * Default Author Schema
 * Used when no specific author is provided
 */
export function getDefaultAuthorSchema(): PersonSchema {
    return {
        '@context': SCHEMA_CONTEXT,
        '@type': 'Person',
        '@id': `${siteConfig.url}/#author`,
        name: siteConfig.authorBio.name,
        url: `${siteConfig.url}/about`,
        image: `${siteConfig.url}/author-avatar.webp`,
        description: siteConfig.authorBio.bio,
        jobTitle: siteConfig.authorBio.role,
        knowsAbout: [
            'Artificial Intelligence',
            'AI Agents',
            'Large Language Models',
            'Prompt Engineering',
            'Model Context Protocol',
            'Python',
            'TypeScript',
            'Machine Learning',
        ],
        sameAs: [
            siteConfig.social.twitter,
            siteConfig.social.github,
        ].filter(Boolean),
    };
}

/**
 * Get Author Schema by name
 * Looks up author in config and returns their schema
 */
export function getAuthorSchema(authorName?: string): PersonSchema {
    // Import authors dynamically to avoid circular dependencies
    // For now, return default author - can be extended to support multiple authors
    const author = getDefaultAuthorSchema();

    if (authorName && authorName !== siteConfig.authorBio.name) {
        // Return a generic author schema for guest authors
        return {
            '@context': SCHEMA_CONTEXT,
            '@type': 'Person',
            name: authorName,
            url: `${siteConfig.url}/about`,
        };
    }

    return author;
}

/**
 * Schema IDs for cross-referencing
 * Using consistent IDs allows schemas to reference each other
 */
export const schemaIds = {
    organization: `${siteConfig.url}/#organization`,
    website: `${siteConfig.url}/#website`,
    author: `${siteConfig.url}/#author`,
    getArticleId: (slug: string) => `${siteConfig.url}/blog/${slug}/#article`,
    getWebPageId: (path: string) => `${siteConfig.url}${path}/#webpage`,
    getBreadcrumbId: (path: string) => `${siteConfig.url}${path}/#breadcrumb`,
};
