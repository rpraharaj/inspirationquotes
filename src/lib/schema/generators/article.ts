/**
 * Article/BlogPosting Schema Generator
 * 
 * Generates structured data for blog posts following Google's requirements.
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */

import { siteConfig } from '../../../config/site';
import type { ArticleSchema, ArticleSchemaInput } from '../types';
import { SCHEMA_CONTEXT } from '../types';
import { getOrganizationSchema, getAuthorSchema, schemaIds } from '../config';

/**
 * Generate BlogPosting schema for a blog post
 * 
 * Required properties (per Google):
 * - @type
 * - headline
 * - image
 * - datePublished
 * - author (with name and url)
 * 
 * Recommended properties:
 * - dateModified
 * - description
 * - publisher
 * - mainEntityOfPage
 */
export function generateArticleSchema(input: ArticleSchemaInput): ArticleSchema {
    const {
        title,
        description,
        slug,
        pubDate,
        updatedDate,
        heroImage,
        author,
        category,
        tags,
        wordCount,
    } = input;

    const articleUrl = `${siteConfig.url}/blog/${slug}/`;
    const imageUrl = heroImage
        ? (heroImage.startsWith('http') ? heroImage : `${siteConfig.url}${heroImage}`)
        : `${siteConfig.url}/blog-placeholder-1.jpg`;

    // Get author schema
    const authorSchema = getAuthorSchema(author);

    // Get publisher (organization) schema without context for nesting
    const publisherSchema = getOrganizationSchema();
    const { '@context': _context, ...publisherWithoutContext } = publisherSchema;

    // Get author without context for nesting
    const { '@context': _authorContext, ...authorWithoutContext } = authorSchema;

    const articleSchema: ArticleSchema = {
        '@context': SCHEMA_CONTEXT,
        '@type': 'BlogPosting',
        '@id': schemaIds.getArticleId(slug),
        headline: title,
        description: description,
        image: [imageUrl],
        datePublished: pubDate.toISOString(),
        author: authorWithoutContext as ArticleSchema['author'],
        publisher: publisherWithoutContext as ArticleSchema['publisher'],
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        url: articleUrl,
        inLanguage: 'en-US',
    };

    // Add optional properties if available
    if (updatedDate) {
        articleSchema.dateModified = updatedDate.toISOString();
    }

    if (category) {
        articleSchema.articleSection = category;
    }

    if (tags && tags.length > 0) {
        articleSchema.keywords = tags;
    }

    if (wordCount && wordCount > 0) {
        articleSchema.wordCount = wordCount;
    }

    return articleSchema;
}

/**
 * Generate a simplified article schema for list pages
 * (e.g., blog index, category pages)
 */
export function generateArticleListItemSchema(input: ArticleSchemaInput) {
    const { title, description, slug, pubDate, heroImage } = input;

    const articleUrl = `${siteConfig.url}/blog/${slug}/`;
    const imageUrl = heroImage
        ? (heroImage.startsWith('http') ? heroImage : `${siteConfig.url}${heroImage}`)
        : `${siteConfig.url}/blog-placeholder-1.jpg`;

    return {
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        url: articleUrl,
        image: imageUrl,
        datePublished: pubDate.toISOString(),
    };
}
