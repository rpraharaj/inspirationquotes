/**
 * Frontmatter Updater for Inspiration Quotes Hub
 * 
 * Updates blog post frontmatter to point to the correct featured image.
 * 
 * Usage:
 *   node scripts/update-frontmatter.cjs [slug]           # Update single post
 *   node scripts/update-frontmatter.cjs --all            # Update all posts with outdated frontmatter
 *   node scripts/update-frontmatter.cjs --check          # Check which posts need updates (dry-run)
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const IMAGE_DIR = path.join(__dirname, '../public/images/blog');

// ============================================
// HELPER FUNCTIONS
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

function updatePostFrontmatter(postPath, slug) {
    const content = fs.readFileSync(postPath, 'utf8');
    const newHeroImage = `/images/blog/${slug}.webp`;

    // Replace heroImage in frontmatter
    const updated = content.replace(
        /^(heroImage:\s*)"[^"]*"|^(heroImage:\s*)'[^']*'|^(heroImage:\s*)[^\n]*/m,
        `heroImage: "${newHeroImage}"`
    );

    if (updated === content) {
        // If no replacement happened, heroImage might not exist
        // Try to add it after the opening ---
        const insertMatch = content.match(/^---\n/);
        if (insertMatch) {
            const insertUpdated = content.replace(
                /^---\n/,
                `---\nheroImage: "${newHeroImage}"\n`
            );
            if (insertUpdated !== content) {
                fs.writeFileSync(postPath, insertUpdated, 'utf8');
                return { success: true, action: 'added' };
            }
        }
        return { success: false, error: 'Could not find or add heroImage in frontmatter' };
    }

    fs.writeFileSync(postPath, updated, 'utf8');
    return { success: true, action: 'updated' };
}

function findPostsNeedingUpdate() {
    if (!fs.existsSync(BLOG_DIR)) {
        console.error(`❌ Blog directory not found: ${BLOG_DIR}`);
        process.exit(1);
    }

    const posts = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
    const existingImages = fs.existsSync(IMAGE_DIR)
        ? fs.readdirSync(IMAGE_DIR).filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', ''))
        : [];

    const needsUpdate = [];

    for (const postFile of posts) {
        const slug = postFile.replace('.md', '');

        // Check if image file exists
        if (!existingImages.includes(slug)) {
            continue; // No image file, nothing to update frontmatter to
        }

        const content = fs.readFileSync(path.join(BLOG_DIR, postFile), 'utf8');
        const frontmatter = extractFrontmatter(content);
        const heroImage = frontmatter.heroImage || '';
        const expectedImagePath = `/images/blog/${slug}.webp`;

        // Check if frontmatter already points to correct image
        if (heroImage !== expectedImagePath) {
            needsUpdate.push({
                slug,
                postPath: path.join(BLOG_DIR, postFile),
                currentHeroImage: heroImage,
                expectedHeroImage: expectedImagePath,
                title: frontmatter.title || slug
            });
        }
    }

    return needsUpdate;
}

// ============================================
// CLI INTERFACE
// ============================================

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║        Inspiration Quotes Hub - Frontmatter Updater          ║
╚══════════════════════════════════════════════════════════════╝
`);
        // Default to checking if no args (safe default) or show help
        // But original script showed help. 
        process.exit(0);
    }

    // Check mode - dry run
    if (args.includes('--check')) {
        const needsUpdate = findPostsNeedingUpdate();

        if (needsUpdate.length === 0) {
            console.log(`✅ All posts with featured images have correctly configured frontmatter.`);
            return;
        }

        console.log(`\n🔍 Posts needing frontmatter update (${needsUpdate.length}):\n`);

        for (const post of needsUpdate) {
            console.log(`  ${post.slug}`);
            console.log(`    Current:  ${post.currentHeroImage || '(empty)'}`);
            console.log(`    Expected: ${post.expectedHeroImage}`);
            console.log('');
        }

        console.log(`Run with --all to update all, or specify slug to update one.`);
        return;
    }

    // Update all mode
    if (args.includes('--all')) {
        const needsUpdate = findPostsNeedingUpdate();

        if (needsUpdate.length === 0) {
            console.log(`✅ All posts with featured images have correctly configured frontmatter.`);
            return;
        }

        console.log(`\n🔧 Updating frontmatter for ${needsUpdate.length} posts...\n`);

        let successCount = 0;
        let errorCount = 0;

        for (const post of needsUpdate) {
            const result = updatePostFrontmatter(post.postPath, post.slug);

            if (result.success) {
                console.log(`  ✅ ${post.slug} (${result.action})`);
                successCount++;
            } else {
                console.log(`  ❌ ${post.slug}: ${result.error}`);
                errorCount++;
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`   Updated: ${successCount}`);
        console.log(`   Errors: ${errorCount}`);
        return;
    }

    // Single slug mode
    const slug = args[0];
    const postPath = path.join(BLOG_DIR, `${slug}.md`);
    const imagePath = path.join(IMAGE_DIR, `${slug}.webp`);

    // Verify post exists
    if (!fs.existsSync(postPath)) {
        console.error(`❌ Post not found: ${postPath}`);
        process.exit(1);
    }

    // Verify image exists
    if (!fs.existsSync(imagePath)) {
        console.error(`❌ Featured image not found: ${imagePath}`);
        console.error(`   Generate the image first.`);
        process.exit(1);
    }

    // Update frontmatter
    console.log(`\n🔧 Updating frontmatter for: ${slug}`);

    const result = updatePostFrontmatter(postPath, slug);

    if (result.success) {
        console.log(`✅ Frontmatter ${result.action} successfully!`);
        console.log(`   heroImage: "/images/blog/${slug}.webp"`);
    } else {
        console.error(`❌ Failed: ${result.error}`);
        process.exit(1);
    }
}

// Run
main();

// Export for use as module
module.exports = { updatePostFrontmatter, findPostsNeedingUpdate };
