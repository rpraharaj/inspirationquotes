/**
 * JSON-LD Schema Management System
 * 
 * A centralized, type-safe system for managing structured data across the website.
 * Following Google's recommended best practices for JSON-LD implementation.
 * 
 * Usage:
 * ```astro
 * ---
 * import { generateArticleSchema, schemaToJsonLd } from '../lib/schema';
 * 
 * const schema = generateArticleSchema({ ... });
 * ---
 * <script type="application/ld+json" set:html={schemaToJsonLd(schema)} />
 * ```
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

// Export all types
export * from './types';

// Export configuration
export {
    getOrganizationSchema,
    getDefaultAuthorSchema,
    getAuthorSchema,
    schemaIds
} from './config';

// Export generators
export {
    generateArticleSchema,
    generateArticleListItemSchema
} from './generators/article';

export {
    generateWebSiteSchema
} from './generators/website';

export {
    generateWebPageSchema,
    generateAboutPageSchema,
    generateCollectionPageSchema
} from './generators/webpage';

export {
    generateBreadcrumbSchema,
    generateBlogPostBreadcrumbSchema,
    generateCategoryBreadcrumbSchema
} from './generators/breadcrumb';

// Import types for utility functions
import type { Schema } from './types';

/**
 * Convert a schema object to a JSON-LD string
 * 
 * This is the primary function for serializing schema to HTML.
 * It ensures proper JSON formatting and escaping.
 * 
 * @param schema - The schema object to serialize
 * @returns JSON string ready for insertion in script tag
 */
export function schemaToJsonLd(schema: Schema | Schema[]): string {
    return JSON.stringify(schema, null, 0);
}

/**
 * Convert a schema object to a prettified JSON-LD string
 * (For debugging purposes)
 */
export function schemaToJsonLdPretty(schema: Schema | Schema[]): string {
    return JSON.stringify(schema, null, 2);
}

/**
 * Combine multiple schemas into a graph
 * 
 * Google supports multiple schemas on a page. This function combines
 * them into a single @graph array for cleaner output.
 * 
 * @param schemas - Array of schema objects
 * @returns Combined schema with @graph property
 */
export function combineSchemas(schemas: Schema[]): object {
    // Remove @context from individual schemas when combining
    const graphItems = schemas.map(schema => {
        const { '@context': _context, ...rest } = schema;
        return rest;
    });

    return {
        '@context': 'https://schema.org',
        '@graph': graphItems,
    };
}

/**
 * Validate that a schema has all required properties
 * (Basic validation - for full validation use Google's Rich Results Test)
 */
export function validateArticleSchema(schema: object): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const required = ['@type', 'headline', 'image', 'datePublished', 'author'];

    for (const prop of required) {
        if (!(prop in schema)) {
            errors.push(`Missing required property: ${prop}`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
