/**
 * Breadcrumb Schema Generator
 * 
 * Generates BreadcrumbList structured data for navigation paths.
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */

import { siteConfig } from '../../../config/site';
import type { BreadcrumbListSchema, BreadcrumbInput, BreadcrumbItem } from '../types';
import { SCHEMA_CONTEXT } from '../types';
import { schemaIds } from '../config';

/**
 * Generate BreadcrumbList schema from a list of breadcrumb items
 * 
 * @param breadcrumbs - Array of breadcrumb items (name and optional URL)
 * @param currentPath - Current page path (used for schema ID)
 */
export function generateBreadcrumbSchema(
    breadcrumbs: BreadcrumbInput[],
    currentPath: string
): BreadcrumbListSchema {
    const itemListElement: BreadcrumbItem[] = breadcrumbs.map((crumb, index) => {
        const item: BreadcrumbItem = {
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
        };

        // Only add URL (item) if it's not the last breadcrumb (current page)
        if (crumb.url && index < breadcrumbs.length - 1) {
            item.item = crumb.url.startsWith('http')
                ? crumb.url
                : `${siteConfig.url}${crumb.url}`;
        }

        return item;
    });

    return {
        '@context': SCHEMA_CONTEXT,
        '@type': 'BreadcrumbList',
        '@id': schemaIds.getBreadcrumbId(currentPath),
        itemListElement,
    };
}

/**
 * Generate breadcrumb schema for a blog post
 */
export function generateBlogPostBreadcrumbSchema(
    postTitle: string,
    postSlug: string,
    category?: string,
    categoryName?: string
): BreadcrumbListSchema {
    const breadcrumbs: BreadcrumbInput[] = [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
    ];

    // Add category if provided
    if (category && categoryName) {
        breadcrumbs.push({
            name: categoryName,
            url: `/categories/${category}`,
        });
    }

    // Add the current post (no URL as it's the current page)
    breadcrumbs.push({ name: postTitle });

    return generateBreadcrumbSchema(breadcrumbs, `/${postSlug}/`);
}

/**
 * Generate breadcrumb schema for a category page
 */
export function generateCategoryBreadcrumbSchema(
    categoryName: string,
    categorySlug: string
): BreadcrumbListSchema {
    const breadcrumbs: BreadcrumbInput[] = [
        { name: 'Home', url: '/' },
        { name: 'Categories', url: '/categories' },
        { name: categoryName },
    ];

    return generateBreadcrumbSchema(breadcrumbs, `/categories/${categorySlug}/`);
}
