/**
 * Blog Analytics Builder
 * Scans all blog posts and generates comprehensive analytics data
 * including word counts, internal/external links, and SEO scores.
 * 
 * Usage: node scripts/build-blog-analytics.cjs
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const OUTPUT_FILE = path.join(__dirname, '..', 'blogpost-content-plan', 'blog-analytics.json');

/**
 * Parse frontmatter from markdown content
 * Handles YAML with multi-line arrays and various formats
 */
function parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return {};

    const frontmatter = {};
    const lines = frontmatterMatch[1].split('\n');
    let currentKey = null;
    let currentArray = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if this is a YAML array item (starts with "  - ")
        if (line.match(/^\s+-\s+/)) {
            if (currentArray !== null && currentKey) {
                const value = line.replace(/^\s+-\s+/, '').trim();
                // Remove quotes if present
                const cleanValue = value.replace(/^["']|["']$/g, '');
                currentArray.push(cleanValue);
            }
            continue;
        }

        // If we were building an array, save it
        if (currentArray !== null && currentKey) {
            frontmatter[currentKey] = currentArray;
            currentArray = null;
            currentKey = null;
        }

        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Check if this starts a multi-line array (value is empty)
        if (value === '' || value === '|' || value === '>') {
            currentKey = key;
            currentArray = [];
            continue;
        }

        // Remove quotes from value
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Parse inline arrays like ["item1", "item2"]
        if (value.startsWith('[')) {
            try {
                value = JSON.parse(value.replace(/'/g, '"'));
            } catch (e) {
                // Try parsing as YAML-style array
                const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                value = items.filter(s => s.length > 0);
            }
        }

        // Parse booleans and null
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (value === 'null') value = null;

        frontmatter[key] = value;
    }

    // Don't forget the last array if we ended with one
    if (currentArray !== null && currentKey) {
        frontmatter[currentKey] = currentArray;
    }

    return frontmatter;
}


/**
 * Get content without frontmatter
 */
function getContent(fullContent) {
    const match = fullContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    return match ? match[1] : fullContent;
}

/**
 * Count words in content (excluding code blocks)
 */
function countWords(content) {
    // Remove code blocks
    let cleanContent = content.replace(/```[\s\S]*?```/g, '');
    // Remove inline code
    cleanContent = cleanContent.replace(/`[^`]+`/g, '');
    // Remove markdown links but keep text
    cleanContent = cleanContent.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    // Remove HTML tags
    cleanContent = cleanContent.replace(/<[^>]+>/g, '');
    // Remove markdown formatting
    cleanContent = cleanContent.replace(/[#*_~]/g, '');
    // Count words
    const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
    return words.length;
}

/**
 * Extract internal links from content
 */
function extractInternalLinks(content) {
    const links = [];
    // Match markdown links to /blog/
    const linkRegex = /\[([^\]]+)\]\(\/blog\/([^)#]+)[^)]*\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        links.push({
            anchorText: match[1],
            slug: match[2].replace(/\/$/, ''), // Remove trailing slash
            url: `/blog/${match[2]}`
        });
    }

    return links;
}

/**
 * Extract external links from content
 */
function extractExternalLinks(content) {
    const links = [];

    // Match markdown links starting with http:// or https://
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
        const url = match[2];
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            links.push({
                anchorText: match[1],
                url: url,
                domain: domain
            });
        } catch (e) {
            // Invalid URL, skip
        }
    }

    // Match HTML anchor tags with external URLs
    const htmlLinkRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]+)<\/a>/gi;

    while ((match = htmlLinkRegex.exec(content)) !== null) {
        const url = match[1];
        const anchorText = match[2];
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            links.push({
                anchorText: anchorText,
                url: url,
                domain: domain
            });
        } catch (e) {
            // Invalid URL, skip
        }
    }

    return links;
}

/**
 * Check if content has FAQ section
 */
function hasFaqSection(content) {
    return /##.*(?:FAQ|Frequently Asked Questions)/i.test(content);
}

/**
 * Calculate SEO score based on various factors
 */
function calculateSeoScore(post) {
    let score = 0;
    const breakdown = {};

    // Title length (0-15 points)
    const titleLength = (post.title || '').length;
    if (titleLength >= 50 && titleLength <= 60) {
        breakdown.titleLength = 15;
    } else if ((titleLength >= 40 && titleLength < 50) || (titleLength > 60 && titleLength <= 70)) {
        breakdown.titleLength = 10;
    } else if (titleLength > 0) {
        breakdown.titleLength = 5;
    } else {
        breakdown.titleLength = 0;
    }
    score += breakdown.titleLength;

    // Meta description length (0-15 points)
    const descLength = (post.description || '').length;
    if (descLength >= 150 && descLength <= 160) {
        breakdown.descriptionLength = 15;
    } else if ((descLength >= 120 && descLength < 150) || (descLength > 160 && descLength <= 180)) {
        breakdown.descriptionLength = 10;
    } else if (descLength > 0) {
        breakdown.descriptionLength = 5;
    } else {
        breakdown.descriptionLength = 0;
    }
    score += breakdown.descriptionLength;

    // Word count (0-20 points)
    if (post.wordCount >= 4000) {
        breakdown.wordCount = 20;
    } else if (post.wordCount >= 3500) {
        breakdown.wordCount = 15;
    } else if (post.wordCount >= 2500) {
        breakdown.wordCount = 10;
    } else if (post.wordCount >= 1500) {
        breakdown.wordCount = 5;
    } else {
        breakdown.wordCount = 2;
    }
    score += breakdown.wordCount;

    // Internal links TO (outgoing) (0-15 points)
    const linksTo = post.linksTo.length;
    if (linksTo >= 5) {
        breakdown.linksTo = 15;
    } else if (linksTo >= 3) {
        breakdown.linksTo = 12;
    } else if (linksTo >= 2) {
        breakdown.linksTo = 8;
    } else if (linksTo >= 1) {
        breakdown.linksTo = 5;
    } else {
        breakdown.linksTo = 0;
    }
    score += breakdown.linksTo;

    // External links (0-10 points)
    const extLinks = post.externalLinks.length;
    if (extLinks >= 3) {
        breakdown.externalLinks = 10;
    } else if (extLinks >= 2) {
        breakdown.externalLinks = 8;
    } else if (extLinks >= 1) {
        breakdown.externalLinks = 5;
    } else {
        breakdown.externalLinks = 0;
    }
    score += breakdown.externalLinks;

    // Featured image (0-10 points)
    if (post.heroImage && post.heroImage.length > 0) {
        breakdown.featuredImage = 10;
    } else {
        breakdown.featuredImage = 0;
    }
    score += breakdown.featuredImage;

    // FAQ section (0-5 points)
    if (post.hasFaq) {
        breakdown.faqSection = 5;
    } else {
        breakdown.faqSection = 0;
    }
    score += breakdown.faqSection;

    // Category presence (0-5 points)
    if (post.category && post.category.length > 0) {
        breakdown.category = 5;
    } else {
        breakdown.category = 0;
    }
    score += breakdown.category;

    // Tags (0-5 points)
    const tagCount = Array.isArray(post.tags) ? post.tags.length : 0;
    if (tagCount >= 3 && tagCount <= 5) {
        breakdown.tags = 5;
    } else if (tagCount >= 2) {
        breakdown.tags = 3;
    } else if (tagCount >= 1) {
        breakdown.tags = 2;
    } else {
        breakdown.tags = 0;
    }
    score += breakdown.tags;

    return { score, breakdown };
}

/**
 * Get SEO status based on score
 */
function getSeoStatus(score) {
    if (score >= 80) return { status: 'excellent', emoji: '🟢', label: 'Excellent' };
    if (score >= 60) return { status: 'good', emoji: '🟡', label: 'Good' };
    if (score >= 40) return { status: 'needsWork', emoji: '🟠', label: 'Needs Work' };
    return { status: 'poor', emoji: '🔴', label: 'Poor' };
}

/**
 * Main function
 */
async function main() {
    console.log('📊 Building Blog Analytics...\n');

    // Get all markdown files
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} blog posts\n`);

    const posts = [];

    // Process each file
    for (const file of files) {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(content);
        const bodyContent = getContent(content);

        const slug = file.replace('.md', '');
        const internalLinks = extractInternalLinks(bodyContent);
        const externalLinks = extractExternalLinks(bodyContent);

        // Handle both 'category' (string) and 'categories' (array) formats
        let category = 'uncategorized';
        if (frontmatter.category) {
            category = frontmatter.category;
        } else if (frontmatter.categories) {
            // If categories is an array, take the first one
            category = Array.isArray(frontmatter.categories)
                ? frontmatter.categories[0]
                : frontmatter.categories;
        }

        const post = {
            slug,
            title: frontmatter.title || slug,
            description: frontmatter.description || '',
            category: category,
            tags: frontmatter.tags || [],
            pubDate: frontmatter.pubDate || null,
            updatedDate: frontmatter.updatedDate || null,
            heroImage: frontmatter.heroImage || null,
            author: frontmatter.author || 'Unknown',
            difficulty: frontmatter.difficulty || null,
            featured: frontmatter.featured || false,
            wordCount: countWords(bodyContent),
            hasFaq: hasFaqSection(bodyContent),
            linksTo: internalLinks,
            externalLinks: externalLinks,
            linksFrom: [] // Will be populated in second pass
        };

        posts.push(post);
    }

    // Second pass: Calculate incoming links
    console.log('Calculating incoming links...');
    for (const post of posts) {
        for (const otherPost of posts) {
            if (otherPost.slug === post.slug) continue;

            const linksToThisPost = otherPost.linksTo.filter(link => link.slug === post.slug);
            if (linksToThisPost.length > 0) {
                post.linksFrom.push({
                    slug: otherPost.slug,
                    title: otherPost.title,
                    anchors: linksToThisPost.map(l => l.anchorText)
                });
            }
        }
    }

    // Calculate SEO scores
    console.log('Calculating SEO scores...');
    for (const post of posts) {
        const { score, breakdown } = calculateSeoScore(post);
        const seoStatus = getSeoStatus(score);
        post.seoScore = score;
        post.seoBreakdown = breakdown;
        post.seoStatus = seoStatus;
        post.isOrphan = post.linksFrom.length === 0;
        post.isHub = post.linksTo.length >= 10;
    }

    // Sort by SEO score descending
    posts.sort((a, b) => b.seoScore - a.seoScore);

    // Calculate summary statistics
    const totalWords = posts.reduce((sum, p) => sum + p.wordCount, 0);
    const totalInternalLinks = posts.reduce((sum, p) => sum + p.linksTo.length, 0);
    const totalExternalLinks = posts.reduce((sum, p) => sum + p.externalLinks.length, 0);
    const avgSeoScore = Math.round(posts.reduce((sum, p) => sum + p.seoScore, 0) / posts.length);
    const orphanPages = posts.filter(p => p.isOrphan);
    const hubPages = posts.filter(p => p.isHub);

    // Category breakdown
    const categoryStats = {};
    for (const post of posts) {
        if (!categoryStats[post.category]) {
            categoryStats[post.category] = { count: 0, totalWords: 0, avgSeoScore: 0, posts: [] };
        }
        categoryStats[post.category].count++;
        categoryStats[post.category].totalWords += post.wordCount;
        categoryStats[post.category].posts.push(post.slug);
    }
    for (const cat of Object.keys(categoryStats)) {
        const catPosts = posts.filter(p => p.category === cat);
        categoryStats[cat].avgSeoScore = Math.round(
            catPosts.reduce((sum, p) => sum + p.seoScore, 0) / catPosts.length
        );
    }

    // Top external domains
    const domainCounts = {};
    for (const post of posts) {
        for (const link of post.externalLinks) {
            domainCounts[link.domain] = (domainCounts[link.domain] || 0) + 1;
        }
    }
    const topDomains = Object.entries(domainCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([domain, count]) => ({ domain, count }));

    // Build final analytics object
    const analytics = {
        _metadata: {
            description: 'Auto-generated blog analytics for content management dashboard',
            generatedAt: new Date().toISOString(),
            totalPosts: posts.length,
            regenerateCommand: 'npm run build-analytics'
        },
        summary: {
            totalPosts: posts.length,
            totalWords: totalWords,
            averageWordCount: Math.round(totalWords / posts.length),
            totalInternalLinks: totalInternalLinks,
            totalExternalLinks: totalExternalLinks,
            averageSeoScore: avgSeoScore,
            orphanPageCount: orphanPages.length,
            hubPageCount: hubPages.length,
            categoriesCount: Object.keys(categoryStats).length
        },
        seoDistribution: {
            excellent: posts.filter(p => p.seoScore >= 80).length,
            good: posts.filter(p => p.seoScore >= 60 && p.seoScore < 80).length,
            needsWork: posts.filter(p => p.seoScore >= 40 && p.seoScore < 60).length,
            poor: posts.filter(p => p.seoScore < 40).length
        },
        categoryBreakdown: categoryStats,
        topExternalDomains: topDomains,
        orphanPages: orphanPages.map(p => ({ slug: p.slug, title: p.title, seoScore: p.seoScore })),
        hubPages: hubPages.map(p => ({ slug: p.slug, title: p.title, linksToCount: p.linksTo.length })),
        posts: posts
    };

    // Write output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(analytics, null, 2));

    console.log('\n✅ Blog Analytics Generated Successfully!\n');
    console.log('📈 Summary:');
    console.log(`   Total Posts: ${posts.length}`);
    console.log(`   Total Words: ${totalWords.toLocaleString()}`);
    console.log(`   Avg Word Count: ${Math.round(totalWords / posts.length).toLocaleString()}`);
    console.log(`   Total Internal Links: ${totalInternalLinks}`);
    console.log(`   Total External Links: ${totalExternalLinks}`);
    console.log(`   Avg SEO Score: ${avgSeoScore}/100`);
    console.log(`   Orphan Pages: ${orphanPages.length}`);
    console.log(`   Hub Pages: ${hubPages.length}`);
    console.log(`\n📁 Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
