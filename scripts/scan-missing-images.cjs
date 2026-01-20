/**
 * Featured Image Scanner for AI Agents Kit
 * 
 * Scans all blog posts and identifies those missing featured images.
 * Checks BOTH file existence AND frontmatter configuration.
 * 
 * Usage:
 *   node scripts/scan-missing-images.cjs              # Just scan
 *   node scripts/scan-missing-images.cjs --count 5    # Scan + list 5
 *   node scripts/scan-missing-images.cjs --generate 5 # Generate for 5 posts
 *   node scripts/scan-missing-images.cjs --generate all # Generate for all
 *   node scripts/scan-missing-images.cjs --json       # Output as JSON
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const IMAGE_DIR = path.join(__dirname, '../public/images/featured');

// ============================================
// SCANNING FUNCTIONS
// ============================================

function extractFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            frontmatter[key] = value;
        }
    }

    return frontmatter;
}

function scanBlogPosts() {
    if (!fs.existsSync(BLOG_DIR)) {
        console.error(`❌ Blog directory not found: ${BLOG_DIR}`);
        process.exit(1);
    }

    const posts = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
    const existingImages = fs.existsSync(IMAGE_DIR)
        ? fs.readdirSync(IMAGE_DIR).filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', ''))
        : [];

    const results = {
        total: posts.length,
        fullyConfigured: [],      // Has image file AND correct frontmatter
        needsFrontmatterUpdate: [], // Has image file but frontmatter still uses placeholder
        usesPlaceholder: [],       // Frontmatter uses placeholder, no image file
        missingImage: [],          // No image file, frontmatter doesn't use placeholder
        details: []
    };

    for (const postFile of posts) {
        const slug = postFile.replace('.md', '');
        const content = fs.readFileSync(path.join(BLOG_DIR, postFile), 'utf8');
        const frontmatter = extractFrontmatter(content);
        const heroImage = frontmatter.heroImage || '';
        const title = frontmatter.title || slug;
        const category = frontmatter.category || 'unknown';

        // Check if image file exists
        const hasImageFile = existingImages.includes(slug);

        // Check if frontmatter points to the correct featured image
        const expectedImagePath = `/images/featured/${slug}.webp`;
        const hasCorrectFrontmatter = heroImage === expectedImagePath;

        // Check if using placeholder
        const usesPlaceholder = heroImage.includes('blog-placeholder') || heroImage.includes('placeholder');

        // Determine status
        let status;
        let needsAction = false;

        if (hasImageFile && hasCorrectFrontmatter) {
            status = 'fully-configured';
        } else if (hasImageFile && !hasCorrectFrontmatter) {
            status = 'needs-frontmatter-update';
            needsAction = true;
        } else if (usesPlaceholder) {
            status = 'uses-placeholder';
            needsAction = true;
        } else {
            status = 'missing-image';
            needsAction = true;
        }

        const detail = {
            slug,
            title,
            category,
            heroImage,
            hasImageFile,
            hasCorrectFrontmatter,
            usesPlaceholder,
            status,
            needsAction
        };

        results.details.push(detail);

        // Categorize
        switch (status) {
            case 'fully-configured':
                results.fullyConfigured.push(detail);
                break;
            case 'needs-frontmatter-update':
                results.needsFrontmatterUpdate.push(detail);
                break;
            case 'uses-placeholder':
                results.usesPlaceholder.push(detail);
                break;
            case 'missing-image':
                results.missingImage.push(detail);
                break;
        }
    }

    return results;
}

function printReport(results, limit = null) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║        AI Agents Kit - Featured Image Scanner                ║
╚══════════════════════════════════════════════════════════════╝
`);

    console.log(`📊 Scan Results:`);
    console.log(`   Total blog posts: ${results.total}`);
    console.log(`   ✅ Fully configured: ${results.fullyConfigured.length}`);
    console.log(`   🔧 Needs frontmatter update: ${results.needsFrontmatterUpdate.length}`);
    console.log(`   ⚠️ Using placeholder: ${results.usesPlaceholder.length}`);
    console.log(`   ❌ Missing image file: ${results.missingImage.length}`);
    console.log('');

    // Posts that need frontmatter update only (image exists!)
    if (results.needsFrontmatterUpdate.length > 0) {
        console.log(`\n🔧 Posts with image files but outdated frontmatter (${results.needsFrontmatterUpdate.length}):`);
        console.log(`   These have generated images but frontmatter still points to placeholders.`);
        console.log('');

        results.needsFrontmatterUpdate.forEach((post, index) => {
            console.log(`${(index + 1).toString().padStart(3)}. ${post.slug}`);
            console.log(`      Current: ${post.heroImage}`);
            console.log(`      Should be: /images/featured/${post.slug}.webp`);
            console.log('');
        });

        console.log(`   Quick fix: node scripts/update-frontmatter.cjs --all`);
        console.log('');
    }

    // Combine posts needing new images
    const needsNewImage = [...results.usesPlaceholder, ...results.missingImage];

    if (needsNewImage.length === 0 && results.needsFrontmatterUpdate.length === 0) {
        console.log(`✅ All blog posts have featured images correctly configured!`);
        console.log(`   No generation or updates needed.`);
        return;
    }

    if (needsNewImage.length > 0) {
        console.log(`\n📋 Posts needing NEW featured images (${needsNewImage.length} total):`);
        console.log('');

        const displayList = limit ? needsNewImage.slice(0, limit) : needsNewImage;

        displayList.forEach((post, index) => {
            const statusIcon = post.usesPlaceholder ? '📷 placeholder' : '❌ missing';
            console.log(`${(index + 1).toString().padStart(3)}. ${post.slug}`);
            console.log(`      Title: "${post.title.substring(0, 50)}${post.title.length > 50 ? '...' : ''}"`);
            console.log(`      Category: ${post.category} | Status: ${statusIcon}`);
            console.log('');
        });

        if (limit && needsNewImage.length > limit) {
            console.log(`   ... and ${needsNewImage.length - limit} more posts`);
            console.log('');
        }

        // Print generation commands
        console.log(`\n🔧 To generate images programmatically:`);
        console.log('');

        const samplePosts = displayList.slice(0, 3);
        for (const post of samplePosts) {
            const safeTitle = post.title.replace(/"/g, '\\"');
            console.log(`node scripts/generate-featured-image.cjs "${safeTitle}" ${post.slug} --category ${post.category} --update-frontmatter`);
        }

        if (displayList.length > 3) {
            console.log(`# ... and ${displayList.length - 3} more`);
        }
    }
}

function generateBatchScript(results, limit = null) {
    const needsNewImage = [...results.usesPlaceholder, ...results.missingImage];
    const postsToProcess = limit === 'all' ? needsNewImage : needsNewImage.slice(0, parseInt(limit, 10));

    console.log(`\n#!/bin/bash`);
    console.log(`# Batch generate featured images for AI Agents Kit`);
    console.log(`# Generated: ${new Date().toISOString()}`);
    console.log(`# Posts to process: ${postsToProcess.length}`);
    console.log('');

    for (const post of postsToProcess) {
        const safeTitle = post.title.replace(/"/g, '\\"').replace(/'/g, "\\'");
        console.log(`node scripts/generate-featured-image.cjs "${safeTitle}" ${post.slug} --category ${post.category} --update-frontmatter`);
    }

    console.log('');
    console.log(`echo "✅ Generated ${postsToProcess.length} featured images"`);
}

// ============================================
// CLI INTERFACE
// ============================================

async function main() {
    const args = process.argv.slice(2);

    // Parse arguments
    const countIndex = args.indexOf('--count');
    const generateIndex = args.indexOf('--generate');
    const scriptIndex = args.indexOf('--script');
    const jsonIndex = args.indexOf('--json');
    const fixFrontmatterIndex = args.indexOf('--fix-frontmatter');

    let limit = null;
    let generateMode = false;
    let scriptMode = false;
    let jsonMode = args.includes('--json');
    let fixFrontmatterMode = args.includes('--fix-frontmatter');

    if (countIndex !== -1 && args[countIndex + 1]) {
        limit = parseInt(args[countIndex + 1], 10);
    }

    if (generateIndex !== -1) {
        generateMode = true;
        limit = args[generateIndex + 1] || 5;
    }

    if (scriptIndex !== -1) {
        scriptMode = true;
        limit = args[scriptIndex + 1] || 'all';
    }

    // Scan posts
    const results = scanBlogPosts();

    if (jsonMode) {
        const needsNewImage = [...results.usesPlaceholder, ...results.missingImage];
        console.log(JSON.stringify({
            total: results.total,
            fullyConfigured: results.fullyConfigured.length,
            needsFrontmatterUpdate: results.needsFrontmatterUpdate.length,
            needsNewImage: needsNewImage.length,
            postsNeedingFrontmatterUpdate: results.needsFrontmatterUpdate.map(p => ({
                slug: p.slug,
                currentHeroImage: p.heroImage,
                correctHeroImage: `/images/featured/${p.slug}.webp`
            })),
            postsNeedingNewImage: needsNewImage.map(p => ({
                slug: p.slug,
                title: p.title,
                category: p.category
            }))
        }, null, 2));
        return;
    }

    if (scriptMode) {
        generateBatchScript(results, limit);
        return;
    }

    // Print report
    printReport(results, limit || 10);

    // If generate mode, call the generator for each post
    if (generateMode) {
        const needsNewImage = [...results.usesPlaceholder, ...results.missingImage];
        const postsToProcess = limit === 'all'
            ? needsNewImage
            : needsNewImage.slice(0, parseInt(limit, 10));

        if (postsToProcess.length === 0) {
            return;
        }

        console.log(`\n🎨 Starting batch generation for ${postsToProcess.length} posts...\n`);

        const { generateFeaturedImage } = require('./generate-featured-image.cjs');

        for (let i = 0; i < postsToProcess.length; i++) {
            const post = postsToProcess[i];
            console.log(`\n[${i + 1}/${postsToProcess.length}] Processing: ${post.slug}`);

            const outputPath = path.join(IMAGE_DIR, `${post.slug}.webp`);

            try {
                await generateFeaturedImage(post.title, outputPath, post.category);

                // Also update frontmatter
                try {
                    const postPath = path.join(BLOG_DIR, `${post.slug}.md`);
                    updatePostFrontmatter(postPath, post.slug);
                    console.log(`   ✅ Frontmatter updated`);
                } catch (fmErr) {
                    console.error(`   ⚠️ Frontmatter update failed: ${fmErr.message}`);
                }
            } catch (err) {
                console.error(`   ❌ Error: ${err.message}`);
            }
        }

        console.log(`\n✅ Batch generation complete!`);
        console.log(`   Generated: ${postsToProcess.length} images`);
        console.log(`   Location: public/images/featured/`);
    }

    // If fix-frontmatter mode, update all posts that need it
    if (fixFrontmatterMode && results.needsFrontmatterUpdate.length > 0) {
        console.log(`\n🔧 Updating frontmatter for ${results.needsFrontmatterUpdate.length} posts...`);

        for (const post of results.needsFrontmatterUpdate) {
            try {
                const postPath = path.join(BLOG_DIR, `${post.slug}.md`);
                updatePostFrontmatter(postPath, post.slug);
                console.log(`   ✅ ${post.slug}`);
            } catch (err) {
                console.error(`   ❌ ${post.slug}: ${err.message}`);
            }
        }

        console.log(`\n✅ Frontmatter updates complete!`);
    }
}

/**
 * Update a post's frontmatter with the correct heroImage path
 */
function updatePostFrontmatter(postPath, slug) {
    const content = fs.readFileSync(postPath, 'utf8');
    const newHeroImage = `/images/featured/${slug}.webp`;

    // Replace heroImage in frontmatter
    const updated = content.replace(
        /^(heroImage:\s*)"[^"]*"|^(heroImage:\s*)'[^']*'|^(heroImage:\s*)[^\n]*/m,
        `heroImage: "${newHeroImage}"`
    );

    if (updated === content) {
        // If no replacement happened, heroImage might not exist - add it
        const insertUpdated = content.replace(
            /^(---\n)/,
            `---\nheroImage: "${newHeroImage}"\n`
        );
        if (insertUpdated !== content) {
            fs.writeFileSync(postPath, insertUpdated);
            return;
        }
        throw new Error('Could not find or add heroImage in frontmatter');
    }

    fs.writeFileSync(postPath, updated);
}

// Run
main().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
