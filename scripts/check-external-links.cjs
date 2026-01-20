/**
 * External Link Format Checker
 * Scans all blog posts and reports external links that are in markdown format
 * instead of the required HTML format with target="_blank" and rel="noopener".
 * 
 * Usage: node scripts/check-external-links.cjs
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

/**
 * Extract markdown-format external links (these need to be converted to HTML)
 */
function findMarkdownExternalLinks(content) {
    const links = [];
    // Match markdown links starting with http:// or https://
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
        links.push({
            fullMatch: match[0],
            anchorText: match[1],
            url: match[2],
            format: 'markdown',
            issue: 'Should be HTML with target="_blank" rel="noopener"'
        });
    }

    return links;
}

/**
 * Extract HTML-format external links and check for missing attributes
 */
function findHtmlExternalLinks(content) {
    const links = [];
    // Match HTML anchor tags with external URLs
    const htmlLinkRegex = /<a\s+([^>]*)href=["'](https?:\/\/[^"']+)["']([^>]*)>([^<]+)<\/a>/gi;
    let match;

    while ((match = htmlLinkRegex.exec(content)) !== null) {
        const beforeHref = match[1] || '';
        const url = match[2];
        const afterHref = match[3] || '';
        const anchorText = match[4];
        const fullAttributes = beforeHref + afterHref;

        const issues = [];

        // Check for target="_blank"
        if (!fullAttributes.includes('target="_blank"') && !fullAttributes.includes("target='_blank'")) {
            issues.push('Missing target="_blank"');
        }

        // Check for rel="noopener" or rel="noopener noreferrer"
        if (!fullAttributes.includes('noopener')) {
            issues.push('Missing rel="noopener"');
        }

        if (issues.length > 0) {
            links.push({
                fullMatch: match[0],
                anchorText: anchorText,
                url: url,
                format: 'html-incomplete',
                issue: issues.join(', ')
            });
        }
    }

    return links;
}

/**
 * Count properly formatted HTML external links
 */
function countProperHtmlLinks(content) {
    let count = 0;
    const htmlLinkRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*target=["']_blank["'][^>]*rel=["'][^"']*noopener[^"']*["'][^>]*>[^<]+<\/a>/gi;
    const matches = content.match(htmlLinkRegex);
    if (matches) count += matches.length;

    // Also match when attributes are in different order
    const htmlLinkRegex2 = /<a\s+[^>]*rel=["'][^"']*noopener[^"']*["'][^>]*href=["'](https?:\/\/[^"']+)["'][^>]*target=["']_blank["'][^>]*>[^<]+<\/a>/gi;
    const matches2 = content.match(htmlLinkRegex2);
    if (matches2) count += matches2.length;

    return count;
}

/**
 * Main function
 */
async function main() {
    console.log('🔗 External Link Format Checker\n');
    console.log('Scanning blog posts for incorrectly formatted external links...\n');

    // Get all markdown files
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

    const results = {
        totalPosts: files.length,
        postsWithIssues: 0,
        totalMarkdownLinks: 0,
        totalIncompleteHtmlLinks: 0,
        totalProperLinks: 0,
        postDetails: []
    };

    // Process each file
    for (const file of files) {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const slug = file.replace('.md', '');

        const markdownLinks = findMarkdownExternalLinks(content);
        const incompleteHtmlLinks = findHtmlExternalLinks(content);
        const properLinkCount = countProperHtmlLinks(content);

        if (markdownLinks.length > 0 || incompleteHtmlLinks.length > 0) {
            results.postsWithIssues++;
            results.totalMarkdownLinks += markdownLinks.length;
            results.totalIncompleteHtmlLinks += incompleteHtmlLinks.length;

            results.postDetails.push({
                slug,
                markdownLinks,
                incompleteHtmlLinks,
                properLinkCount,
                totalIssues: markdownLinks.length + incompleteHtmlLinks.length
            });
        }

        results.totalProperLinks += properLinkCount;
    }

    // Sort by number of issues (descending)
    results.postDetails.sort((a, b) => b.totalIssues - a.totalIssues);

    // Output summary
    console.log('='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total posts scanned: ${results.totalPosts}`);
    console.log(`Posts with issues: ${results.postsWithIssues}`);
    console.log(`\nLink counts:`);
    console.log(`  ✅ Properly formatted HTML links: ${results.totalProperLinks}`);
    console.log(`  ⚠️  Markdown external links (need conversion): ${results.totalMarkdownLinks}`);
    console.log(`  ⚠️  Incomplete HTML links (missing attributes): ${results.totalIncompleteHtmlLinks}`);
    console.log(`  📋 Total issues to fix: ${results.totalMarkdownLinks + results.totalIncompleteHtmlLinks}`);

    if (results.postDetails.length > 0) {
        console.log('\n' + '='.repeat(60));
        console.log('📝 POSTS WITH ISSUES (sorted by issue count)');
        console.log('='.repeat(60));

        // Show top 20 posts with most issues
        const topPosts = results.postDetails.slice(0, 20);

        for (const post of topPosts) {
            console.log(`\n📄 ${post.slug}`);
            console.log(`   Issues: ${post.totalIssues} | Proper links: ${post.properLinkCount}`);

            if (post.markdownLinks.length > 0) {
                console.log(`   Markdown links to convert: ${post.markdownLinks.length}`);
                for (const link of post.markdownLinks.slice(0, 3)) {
                    console.log(`     - [${link.anchorText.substring(0, 30)}...](${link.url.substring(0, 40)}...)`);
                }
                if (post.markdownLinks.length > 3) {
                    console.log(`     ... and ${post.markdownLinks.length - 3} more`);
                }
            }

            if (post.incompleteHtmlLinks.length > 0) {
                console.log(`   Incomplete HTML links: ${post.incompleteHtmlLinks.length}`);
                for (const link of post.incompleteHtmlLinks.slice(0, 2)) {
                    console.log(`     - ${link.issue}: ${link.url.substring(0, 40)}...`);
                }
            }
        }

        if (results.postDetails.length > 20) {
            console.log(`\n... and ${results.postDetails.length - 20} more posts with issues`);
        }
    }

    // Save detailed report to file
    const reportPath = path.join(__dirname, '..', 'blogpost-content-plan', 'external-link-issues.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📁 Detailed report saved to: ${reportPath}`);

    // Exit with error code if there are issues
    if (results.totalMarkdownLinks + results.totalIncompleteHtmlLinks > 0) {
        console.log('\n⚠️  Action required: Convert markdown links to HTML format with target="_blank" rel="noopener"');
    } else {
        console.log('\n✅ All external links are properly formatted!');
    }
}

main().catch(console.error);
