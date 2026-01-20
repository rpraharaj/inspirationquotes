/**
 * WebPage Schema Generator
 * 
 * Generates WebPage structured data for non-article pages.
 * @see https://schema.org/WebPage
 */

import { siteConfig } from '../../../config/site';
import type { WebPageSchema, WebPageSchemaInput } from '../types';
import { SCHEMA_CONTEXT } from '../types';
import { schemaIds } from '../config';

/**
 * Generate WebPage schema for standard pages
 * 
 * Use specific types for better semantic meaning:
 * - AboutPage: For about/bio pages
 * - ContactPage: For contact pages
 * - CollectionPage: For category/archive pages
 */
export function generateWebPageSchema(input: WebPageSchemaInput): WebPageSchema {
    const {
        title,
        description,
        url,
        type = 'WebPage',
        image,
        datePublished,
        dateModified,
    } = input;

    const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;
    const path = url.startsWith('http') ? new URL(url).pathname : url;

    const schema: WebPageSchema = {
        '@context': SCHEMA_CONTEXT,
        '@type': type,
        '@id': schemaIds.getWebPageId(path),
        name: title,
        url: fullUrl,
        description: description,
        isPartOf: {
            '@id': schemaIds.website,
        },
        inLanguage: 'en-US',
    };

    if (image) {
        schema.primaryImageOfPage = {
            '@type': 'ImageObject',
            url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
        };
    }

    if (datePublished) {
        schema.datePublished = datePublished.toISOString();
    }

    if (dateModified) {
        schema.dateModified = dateModified.toISOString();
    }

    return schema;
}

/**
 * Generate AboutPage schema
 */
export function generateAboutPageSchema(description: string): WebPageSchema {
    return generateWebPageSchema({
        title: `About | ${siteConfig.name}`,
        description,
        url: '/about',
        type: 'AboutPage',
    });
}

/**
 * Generate CollectionPage schema (for category/archive pages)
 */
export function generateCollectionPageSchema(
    title: string,
    description: string,
    url: string
): WebPageSchema {
    return generateWebPageSchema({
        title,
        description,
        url,
        type: 'CollectionPage',
    });
}
