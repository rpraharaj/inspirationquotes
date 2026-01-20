/**
 * External Link Format Converter
 * Converts markdown external links to HTML format with target="_blank" rel="noopener"
 * 
 * Usage: node scripts/convert-external-links.cjs [--dry-run] [--file <slug>] [--batch <n>]
 * 
 * Options:
 *   --dry-run   Show what would be changed without modifying files
 *   --file      Process only a specific file (by slug, without .md)
 *   --batch     Process only the first n files with issues
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const fileIndex = args.indexOf('--file');
const targetFile = fileIndex !== -1 ? args[fileIndex + 1] : null;
const batchIndex = args.indexOf('--batch');
const batchSize = batchIndex !== -1 ? parseInt(args[batchIndex + 1], 10) : null;

/**
 * Convert markdown external link to HTML format
 */
function convertLink(match, anchorText, url) {
    return `<a href="${url}" target="_blank" rel="noopener">${anchorText}</a>`;
}

/**
 * Process a single file
 */
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Match markdown links starting with http:// or https://
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

    // Count matches
    const matches = content.match(markdownLinkRegex);
    if (!matches || matches.length === 0) {
        return { changed: false, count: 0 };
    }

    // Replace all markdown external links with HTML
    const newContent = content.replace(markdownLinkRegex, convertLink);

    return {
        changed: content !== newContent,
        count: matches.length,
        original: content,
        converted: newContent,
        matches: matches
    };
}

/**
 * Main function
 */
async function main() {
    console.log('🔄 External Link Format Converter\n');

    if (isDryRun) {
        console.log('📋 DRY RUN MODE - No files will be modified\n');
    }

    // Get files to process
    let files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

    if (targetFile) {
        files = files.filter(f => f === `${targetFile}.md`);
        if (files.length === 0) {
            console.log(`❌ File not found: ${targetFile}.md`);
            return;
        }
    }

    const results = {
        processed: 0,
        modified: 0,
        totalLinksConverted: 0,
        files: []
    };

    // Process each file
    for (const file of files) {
        const filePath = path.join(BLOG_DIR, file);
        const result = processFile(filePath);

        if (result.changed) {
            results.files.push({
                file: file.replace('.md', ''),
                linksConverted: result.count
            });

            if (!isDryRun) {
                fs.writeFileSync(filePath, result.converted);
                results.modified++;
            }

            results.totalLinksConverted += result.count;
        }

        results.processed++;

        // Check batch limit
        if (batchSize && results.files.length >= batchSize) {
            break;
        }
    }

    // Output results
    console.log('='.repeat(60));
    console.log('📊 RESULTS');
    console.log('='.repeat(60));
    console.log(`Files scanned: ${results.processed}`);
    console.log(`Files with external links: ${results.files.length}`);
    console.log(`Total links converted: ${results.totalLinksConverted}`);

    if (isDryRun) {
        console.log('\n📋 Files that WOULD be modified:');
    } else {
        console.log(`\n✅ Files modified: ${results.modified}`);
    }

    if (results.files.length > 0) {
        console.log('\n📝 Details:');
        for (const f of results.files) {
            console.log(`   ${f.file}: ${f.linksConverted} links`);
        }
    }

    if (isDryRun && results.files.length > 0) {
        console.log('\nRun without --dry-run to apply changes.');
    }
}

main().catch(console.error);
