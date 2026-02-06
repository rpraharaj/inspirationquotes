/**
 * Build Search Index Script
 * 
 * Generates a JSON search index from all blog posts for client-side search.
 * Run with: npm run build:search
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const OUTPUT_FILE = path.join(__dirname, '../public/search-index.json');
const EXCERPT_LENGTH = 200;

// Category display names mapping
const categoryNames = {
    'motivation-success': 'Motivation',
    'inspirational': 'Inspirational',
    'life-wisdom': 'Life Wisdom',
    'love-relationships': 'Love & Relationships',
    'friendship': 'Friendship',
    'family': 'Family',
    'happiness-joy': 'Happiness & Joy',
    'gratitude': 'Gratitude',
    'courage-confidence': 'Courage & Confidence',
    'mindfulness-peace': 'Mindfulness & Peace',
    'humor-wit': 'Humor & Wit',
    'short-quotes': 'Short Quotes'
};

/**
 * Extract plain text excerpt from markdown content
 */
function extractExcerpt(content, length = EXCERPT_LENGTH) {
    // Remove frontmatter if present
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim();

    // Remove markdown formatting
    let plainText = contentWithoutFrontmatter
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove inline code
        .replace(/`[^`]+`/g, '')
        // Remove images
        .replace(/!\[.*?\]\(.*?\)/g, '')
        // Remove links but keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove HTML tags
        .replace(/<[^>]+>/g, '')
        // Remove headers
        .replace(/^#+\s+/gm, '')
        // Remove bold/italic
        .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
        // Remove blockquotes
        .replace(/^>\s+/gm, '')
        // Remove horizontal rules
        .replace(/^[-*_]{3,}\s*$/gm, '')
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .trim();

    // Truncate to length
    if (plainText.length > length) {
        plainText = plainText.substring(0, length).trim() + '...';
    }

    return plainText;
}

/**
 * Process a single blog post file
 */
function processPost(filename) {
    const filepath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filepath, 'utf-8');

    try {
        const { data: frontmatter, content } = matter(fileContent);

        // Extract slug from filename (remove .md or .mdx extension)
        const slug = filename.replace(/\.mdx?$/, '');

        // Get category display name
        const category = frontmatter.category || 'ai-news';
        const categoryName = categoryNames[category] || category;

        // Extract excerpt
        const excerpt = extractExcerpt(content);

        return {
            id: slug,
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description || '',
            category: category,
            categoryName: categoryName,
            tags: frontmatter.tags || [],
            excerpt: excerpt,
            url: `/${slug}/`
        };
    } catch (error) {
        console.error(`Error processing ${filename}:`, error.message);
        return null;
    }
}

/**
 * Main function to build the search index
 */
function buildSearchIndex() {
    console.log('🔍 Building search index...\n');

    // Check if blog directory exists
    if (!fs.existsSync(BLOG_DIR)) {
        console.error(`❌ Blog directory not found: ${BLOG_DIR}`);
        process.exit(1);
    }

    // Get all markdown files
    const files = fs.readdirSync(BLOG_DIR)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    console.log(`📄 Found ${files.length} blog posts`);

    // Process all posts
    const posts = files
        .map(processPost)
        .filter(post => post !== null);

    console.log(`✅ Processed ${posts.length} posts successfully`);

    // Create the search index
    const searchIndex = {
        version: 1,
        generated: new Date().toISOString(),
        count: posts.length,
        posts: posts
    };

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the index file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));

    // Calculate file size
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log(`\n📦 Search index generated: ${OUTPUT_FILE}`);
    console.log(`   Size: ${fileSizeKB} KB`);
    console.log(`   Posts indexed: ${posts.length}`);
    console.log('\n✨ Done!\n');
}

// Run the script
buildSearchIndex();
