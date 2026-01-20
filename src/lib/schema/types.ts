/**
 * JSON-LD Schema Types
 * 
 * Type definitions for structured data following schema.org vocabulary.
 * These types ensure type-safety and consistency across all schema generators.
 * 
 * @see https://schema.org
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

// Base context for all schemas
export const SCHEMA_CONTEXT = 'https://schema.org' as const;

/**
 * Base interface for all schema types
 */
export interface SchemaBase {
    '@context': typeof SCHEMA_CONTEXT;
    '@type': string;
    '@id'?: string;
}

/**
 * Image Object Schema
 * @see https://schema.org/ImageObject
 */
export interface ImageObject {
    '@type': 'ImageObject';
    url: string;
    width?: number;
    height?: number;
    caption?: string;
}

/**
 * Person Schema (for authors)
 * @see https://schema.org/Person
 */
export interface PersonSchema extends SchemaBase {
    '@type': 'Person';
    name: string;
    url?: string;
    image?: string | ImageObject;
    description?: string;
    sameAs?: string[];
    jobTitle?: string;
    knowsAbout?: string[];
}

/**
 * Organization Schema
 * @see https://schema.org/Organization
 */
export interface OrganizationSchema extends SchemaBase {
    '@type': 'Organization';
    name: string;
    url: string;
    logo?: string | ImageObject;
    description?: string;
    sameAs?: string[];
    foundingDate?: string;
    founder?: PersonSchema | PersonSchema[];
}

/**
 * WebSite Schema
 * @see https://schema.org/WebSite
 */
export interface WebSiteSchema extends SchemaBase {
    '@type': 'WebSite';
    name: string;
    url: string;
    description?: string;
    publisher?: OrganizationSchema;
    potentialAction?: SearchAction;
    inLanguage?: string;
}

/**
 * Search Action for WebSite
 */
export interface SearchAction {
    '@type': 'SearchAction';
    target: {
        '@type': 'EntryPoint';
        urlTemplate: string;
    };
    'query-input': string;
}

/**
 * WebPage Schema
 * @see https://schema.org/WebPage
 */
export interface WebPageSchema extends SchemaBase {
    '@type': 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
    name: string;
    url: string;
    description?: string;
    isPartOf?: { '@id': string };
    primaryImageOfPage?: ImageObject;
    datePublished?: string;
    dateModified?: string;
    breadcrumb?: { '@id': string };
    inLanguage?: string;
}

/**
 * Article/BlogPosting Schema
 * @see https://schema.org/Article
 * @see https://schema.org/BlogPosting
 */
export interface ArticleSchema extends SchemaBase {
    '@type': 'Article' | 'BlogPosting' | 'NewsArticle' | 'TechArticle';
    headline: string;
    description: string;
    image: string | string[] | ImageObject[];
    datePublished: string;
    dateModified?: string;
    author: PersonSchema | PersonSchema[];
    publisher: OrganizationSchema;
    mainEntityOfPage: {
        '@type': 'WebPage';
        '@id': string;
    };
    url: string;
    articleSection?: string;
    keywords?: string[];
    wordCount?: number;
    articleBody?: string;
    inLanguage?: string;
}

/**
 * BreadcrumbList Schema
 * @see https://schema.org/BreadcrumbList
 */
export interface BreadcrumbListSchema extends SchemaBase {
    '@type': 'BreadcrumbList';
    itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItem {
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
}

/**
 * FAQ Schema
 * @see https://schema.org/FAQPage
 */
export interface FAQPageSchema extends SchemaBase {
    '@type': 'FAQPage';
    mainEntity: FAQQuestion[];
}

export interface FAQQuestion {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
        '@type': 'Answer';
        text: string;
    };
}

/**
 * How-To Schema
 * @see https://schema.org/HowTo
 */
export interface HowToSchema extends SchemaBase {
    '@type': 'HowTo';
    name: string;
    description?: string;
    image?: string | ImageObject;
    totalTime?: string;
    estimatedCost?: {
        '@type': 'MonetaryAmount';
        currency: string;
        value: string;
    };
    supply?: HowToSupply[];
    tool?: HowToTool[];
    step: HowToStep[];
}

export interface HowToSupply {
    '@type': 'HowToSupply';
    name: string;
}

export interface HowToTool {
    '@type': 'HowToTool';
    name: string;
}

export interface HowToStep {
    '@type': 'HowToStep';
    name: string;
    text: string;
    url?: string;
    image?: string | ImageObject;
}

/**
 * Software Application Schema (for tools/apps)
 * @see https://schema.org/SoftwareApplication
 */
export interface SoftwareApplicationSchema extends SchemaBase {
    '@type': 'SoftwareApplication' | 'WebApplication' | 'MobileApplication';
    name: string;
    description?: string;
    applicationCategory?: string;
    operatingSystem?: string;
    offers?: {
        '@type': 'Offer';
        price: string;
        priceCurrency: string;
    };
    aggregateRating?: {
        '@type': 'AggregateRating';
        ratingValue: string;
        ratingCount: string;
    };
}

/**
 * Union type for all supported schema types
 */
export type Schema =
    | ArticleSchema
    | WebSiteSchema
    | WebPageSchema
    | OrganizationSchema
    | PersonSchema
    | BreadcrumbListSchema
    | FAQPageSchema
    | HowToSchema
    | SoftwareApplicationSchema;

/**
 * Input types for schema generators (partial, with required fields)
 */
export interface ArticleSchemaInput {
    title: string;
    description: string;
    slug: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    author?: string;
    category?: string;
    tags?: string[];
    wordCount?: number;
    articleBody?: string;
}

export interface WebPageSchemaInput {
    title: string;
    description: string;
    url: string;
    type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
    image?: string;
    datePublished?: Date;
    dateModified?: Date;
}

export interface BreadcrumbInput {
    name: string;
    url?: string;
}
