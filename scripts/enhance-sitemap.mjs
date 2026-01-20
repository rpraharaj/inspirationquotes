#!/usr/bin/env node
/**
 * Add lastmod dates to sitemap from blog post frontmatter
 * 
 * This script runs after build to enhance the sitemap with accurate
 * publication/update dates from blog post frontmatter.
 * 
 * Google recommends only using lastmod when dates are accurately maintained.
 * We use: updatedDate (if present) > pubDate (fallback)
 * 
 * Usage: node scripts/enhance-sitemap.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src/content/blog');
const SITEMAP_PATH = path.join(ROOT, 'dist/sitemap-0.xml');
const SITE_URL = 'https://aiagentskit.com';

/**
 * Extract date from frontmatter (simple YAML parsing for dates)
 */
function extractDates(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const frontmatter = frontmatterMatch[1];

    // Extract updatedDate first (preferred), then pubDate
    const updatedMatch = frontmatter.match(/updatedDate:\s*(\d{4}-\d{2}-\d{2})/);
    const pubMatch = frontmatter.match(/pubDate:\s*(\d{4}-\d{2}-\d{2})/);

    return updatedMatch?.[1] || pubMatch?.[1] || null;
}

/**
 * Get all blog posts with their dates
 */
async function getBlogPostDates() {
    const dateMap = new Map();

    try {
        const files = await fs.readdir(BLOG_DIR);

        for (const file of files) {
            if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

            const filePath = path.join(BLOG_DIR, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const date = extractDates(content);

            if (date) {
                // Convert filename to URL slug
                const slug = file.replace(/\.(md|mdx)$/, '');
                const url = `${SITE_URL}/blog/${slug}/`;
                dateMap.set(url, date);
            }
        }
    } catch (error) {
        console.error('Error reading blog posts:', error.message);
    }

    return dateMap;
}

/**
 * Update sitemap with lastmod dates
 */
async function enhanceSitemap() {
    console.log('📍 Enhancing sitemap with lastmod dates...');

    // Get blog post dates
    const blogDates = await getBlogPostDates();
    console.log(`   Found ${blogDates.size} blog posts with dates`);

    // Read current sitemap
    let sitemap;
    try {
        sitemap = await fs.readFile(SITEMAP_PATH, 'utf-8');
    } catch (error) {
        console.error('❌ Could not read sitemap:', error.message);
        process.exit(1);
    }

    // Add lastmod to each blog post entry
    let updatedCount = 0;
    for (const [url, date] of blogDates) {
        const locTag = `<loc>${url}</loc>`;
        if (sitemap.includes(locTag)) {
            const locWithLastmod = `<loc>${url}</loc><lastmod>${date}</lastmod>`;
            sitemap = sitemap.replace(locTag, locWithLastmod);
            updatedCount++;
        }
    }

    // Write updated sitemap
    await fs.writeFile(SITEMAP_PATH, sitemap);
    console.log(`✅ Added lastmod dates to ${updatedCount} blog posts`);
}

// Run
enhanceSitemap().catch(console.error);
