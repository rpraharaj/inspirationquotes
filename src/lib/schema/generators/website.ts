/**
 * WebSite Schema Generator
 * 
 * Generates WebSite structured data for the homepage.
 * This schema helps Google understand your site and may enable sitelinks search box.
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */

import { siteConfig } from '../../../config/site';
import type { WebSiteSchema } from '../types';
import { SCHEMA_CONTEXT } from '../types';
import { getOrganizationSchema, schemaIds } from '../config';

/**
 * Generate WebSite schema
 * 
 * This should be included on the homepage and optionally on all pages.
 * It establishes the site's identity for search engines.
 */
export function generateWebSiteSchema(): WebSiteSchema {
    const publisherSchema = getOrganizationSchema();
    const { '@context': _context, ...publisherWithoutContext } = publisherSchema;

    return {
        '@context': SCHEMA_CONTEXT,
        '@type': 'WebSite',
        '@id': schemaIds.website,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: publisherWithoutContext as WebSiteSchema['publisher'],
        inLanguage: 'en-US',
        // Uncomment if you have site search functionality
        // potentialAction: {
        //     '@type': 'SearchAction',
        //     target: {
        //         '@type': 'EntryPoint',
        //         urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
        //     },
        //     'query-input': 'required name=search_term_string',
        // },
    };
}
