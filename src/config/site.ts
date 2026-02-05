/**
 * Site Configuration
 * 
 * Central configuration for Inspiration Quotes Hub.
 */

export const siteConfig = {
    name: 'Inspiration Quotes Hub',
    title: 'Inspiration Quotes Hub - Daily Words That Lift You Up',
    description: 'Discover curated quotes about life, love, wisdom, and joy. Save your favorites and share inspiration.',
    tagline: 'Daily quotes to brighten your day',
    url: 'https://inspirationquoteshub.com',
    author: 'Inspiration Quotes Hub',

    // Social Links
    social: {
        twitter: 'https://x.com/inspirationquoteshub',
        github: 'https://github.com/inspirationquoteshub',
        email: 'hello@inspirationquoteshub.com',
    },

    // Navigation
    nav: [
        { name: 'Home', href: '/' },
        { name: 'Quotes', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ],

    // Header Categories (Featured in Topics dropdown)
    headerCategories: [
        { name: 'Motivation', slug: 'motivation-success', icon: 'zap' },
        { name: 'Love', slug: 'love-relationships', icon: 'share' },
        { name: 'Life', slug: 'life-wisdom', icon: 'book-open' },
        { name: 'Happiness', slug: 'happiness-joy', icon: 'sun' },
        { name: 'Mindfulness', slug: 'mindfulness-peace', icon: 'moon' },
        { name: 'Humor', slug: 'humor-wit', icon: 'copy' },
    ],

    // Footer Links
    footerLinks: [
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'RSS', href: '/rss.xml' },
    ],

    // Blog Settings
    blog: {
        postsPerPage: 6,
        showReadingTime: true,
        showTableOfContents: true,
        showRelatedPosts: true,
        showAuthorBio: true,
    },

    // SEO Defaults
    seo: {
        ogImage: '/og-default.webp',
        twitterCard: 'summary_large_image',
    },

    // Author Bio (for tech focus)
    authorBio: {
        name: 'Inspiration Quotes Hub',
        role: 'Curators of Timeless Quotes',
        bio: 'We collect and curate meaningful quotes from classic and modern voices to help you reflect, grow, and share encouragement.',
    },
};

export type SiteConfig = typeof siteConfig;
