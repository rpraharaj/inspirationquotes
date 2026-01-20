/**
 * Featured Image Generator for AI Agents Kit Blog Posts
 * 
 * Creates clean, professional 1200x630 images with:
 * - Black & white minimalist theme
 * - LARGE, READABLE centered title
 * - Atkinson Hyperlegible font (same as website)
 * - www.aiagentskit.com watermark
 * 
 * Usage: 
 *   node scripts/generate-featured-image.cjs "Your Title" output-filename
 *   node scripts/generate-featured-image.cjs "Your Title" output-filename --category ai-agents
 * 
 * Output: public/images/featured/[output-filename].webp
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ============================================
// REGISTER CUSTOM FONTS
// ============================================

const fontsDir = path.join(__dirname, '../public/fonts/ttf');

// Register Atkinson Hyperlegible font (same as website)
try {
    if (fs.existsSync(path.join(fontsDir, 'AtkinsonHyperlegible-Regular.ttf'))) {
        registerFont(path.join(fontsDir, 'AtkinsonHyperlegible-Regular.ttf'), {
            family: 'Atkinson',
            weight: 'normal'
        });
    }
    if (fs.existsSync(path.join(fontsDir, 'AtkinsonHyperlegible-Bold.ttf'))) {
        registerFont(path.join(fontsDir, 'AtkinsonHyperlegible-Bold.ttf'), {
            family: 'Atkinson',
            weight: 'bold'
        });
    }
} catch (err) {
    console.warn('Could not load Atkinson font, using fallback:', err.message);
}

// ============================================
// CONFIGURATION - AI Agents Kit Brand
// ============================================

const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors - Minimalist Black & White with HIGH CONTRAST
const COLORS = {
    bgDark: '#0A0A0A',         // Near black
    bgMedium: '#1A1A1A',       // Dark gray
    textPrimary: '#FFFFFF',    // Pure white
    textMuted: '#B0B0B0',      // Light gray (more visible)
    accent: '#3A3A3A',         // Medium gray
    watermark: '#888888',      // Visible gray for watermark
};

// Typography - Atkinson Hyperlegible (same as website) with fallbacks
const FONT_FAMILY = 'Atkinson, Arial, Helvetica, sans-serif';

// Watermark
const WATERMARK = 'www.aiagentskit.com';

// ============================================
// DRAWING FUNCTIONS
// ============================================

function drawBackground(ctx) {
    // Create diagonal gradient - darker in corners, lighter in center
    const gradient = ctx.createRadialGradient(
        WIDTH / 2, HEIGHT / 2, 0,
        WIDTH / 2, HEIGHT / 2, 700
    );
    gradient.addColorStop(0, '#1F1F1F');  // Lighter center
    gradient.addColorStop(0.7, '#121212');
    gradient.addColorStop(1, COLORS.bgDark);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Add very subtle noise-like texture with dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * WIDTH;
        const y = Math.random() * HEIGHT;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawAccentElements(ctx) {
    // Top-left corner accent
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(250, 0);
    ctx.lineTo(0, 150);
    ctx.closePath();

    const cornerGradient1 = ctx.createLinearGradient(0, 0, 125, 75);
    cornerGradient1.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    cornerGradient1.addColorStop(1, 'transparent');
    ctx.fillStyle = cornerGradient1;
    ctx.fill();

    // Bottom-right corner accent
    ctx.beginPath();
    ctx.moveTo(WIDTH, HEIGHT);
    ctx.lineTo(WIDTH - 250, HEIGHT);
    ctx.lineTo(WIDTH, HEIGHT - 150);
    ctx.closePath();

    const cornerGradient2 = ctx.createLinearGradient(WIDTH, HEIGHT, WIDTH - 125, HEIGHT - 75);
    cornerGradient2.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    cornerGradient2.addColorStop(1, 'transparent');
    ctx.fillStyle = cornerGradient2;
    ctx.fill();

    // Horizontal accent line at bottom - MORE VISIBLE
    const lineGradient = ctx.createLinearGradient(0, HEIGHT - 8, WIDTH, HEIGHT - 8);
    lineGradient.addColorStop(0, 'transparent');
    lineGradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.2)');
    lineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    lineGradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.2)');
    lineGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = lineGradient;
    ctx.fillRect(80, HEIGHT - 8, WIDTH - 160, 8);

    // Top thin line
    const topLineGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    topLineGradient.addColorStop(0, 'transparent');
    topLineGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.15)');
    topLineGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
    topLineGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = topLineGradient;
    ctx.fillRect(100, 0, WIDTH - 200, 4);
}

function drawTitle(ctx, title) {
    const x = WIDTH / 2;
    const y = HEIGHT / 2;

    // Determine font size based on title length - MUCH LARGER
    let fontSize = 90;  // Start much larger
    if (title.length > 30) fontSize = 80;
    if (title.length > 40) fontSize = 70;
    if (title.length > 50) fontSize = 62;
    if (title.length > 60) fontSize = 56;
    if (title.length > 75) fontSize = 50;

    ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Handle long titles with word wrapping
    const maxWidth = WIDTH - 100;  // More padding
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    // Limit to 3 lines max
    if (lines.length > 3) {
        lines = lines.slice(0, 3);
        lines[2] = lines[2].substring(0, lines[2].length - 3) + '...';
    }

    // Calculate line height and starting position
    const lineHeight = fontSize * 1.25;
    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2 + lineHeight / 2;

    // Draw text shadow/glow FIRST (darker, larger spread)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    // Draw multiple shadow layers for depth
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    lines.forEach((line, index) => {
        ctx.fillText(line, x + 2, startY + index * lineHeight + 2);
    });

    // Reset shadow for main text
    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw main text - PURE WHITE
    ctx.fillStyle = COLORS.textPrimary;
    lines.forEach((line, index) => {
        ctx.fillText(line, x, startY + index * lineHeight);
    });

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
}

function drawWatermark(ctx) {
    // Position: CENTERED, ~90px below the title text
    // This ensures the watermark is always visible as part of the main content
    const x = WIDTH / 2;
    // Title ends around 360-380px, add 90px gap = ~460px
    const y = HEIGHT * 0.73;  // ~460px - 90px gap from title

    // Draw with subtle shadow for visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    ctx.font = `500 16px ${FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLORS.textMuted;  // Use muted text color for better visibility

    ctx.fillText(WATERMARK, x, y);

    // Reset shadow
    ctx.shadowBlur = 0;
}

function drawCategoryIndicator(ctx, category) {
    if (!category) return;

    // Position at top - LARGER and more visible
    const badgeY = 50;
    const badgeX = WIDTH / 2;

    // Format category for display (e.g., "ai-agents" -> "AI AGENTS")
    const displayCategory = category
        .replace(/-/g, ' ')
        .toUpperCase();

    // Measure text for badge background
    ctx.font = `700 18px ${FONT_FAMILY}`;  // Larger, bold
    const textWidth = ctx.measureText(displayCategory).width;

    // Draw badge background (subtle)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const padding = 20;
    const badgeHeight = 32;
    const badgeWidth = textWidth + padding * 2;

    // Rounded rectangle
    const radius = 4;
    ctx.beginPath();
    ctx.roundRect(badgeX - badgeWidth / 2, badgeY - badgeHeight / 2, badgeWidth, badgeHeight, radius);
    ctx.fill();

    // Draw category text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLORS.textMuted;
    ctx.fillText(displayCategory, badgeX, badgeY);

    // Draw underline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(badgeX - textWidth / 2 - 5, badgeY + badgeHeight / 2 + 8);
    ctx.lineTo(badgeX + textWidth / 2 + 5, badgeY + badgeHeight / 2 + 8);
    ctx.stroke();
}

// ============================================
// MAIN GENERATION FUNCTION
// ============================================

async function generateFeaturedImage(title, outputPath, category = null) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Draw all elements
    drawBackground(ctx);
    drawAccentElements(ctx);
    if (category) {
        drawCategoryIndicator(ctx, category);
    }
    drawTitle(ctx, title);
    drawWatermark(ctx);

    // Convert to buffer
    const buffer = canvas.toBuffer('image/png');

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Use sharp to convert to WebP with good quality
    await sharp(buffer)
        .webp({ quality: 90 })  // Higher quality for text clarity
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✅ Generated: ${outputPath}`);
    console.log(`   Size: ${sizeKB} KB`);
    console.log(`   Dimensions: ${WIDTH}x${HEIGHT}`);
    console.log(`   Watermark: ${WATERMARK}`);

    // Warn if too large
    if (stats.size > 100 * 1024) {
        console.log(`   ⚠️ Warning: File exceeds 100KB. Consider reducing quality.`);
    }

    return stats.size;
}

// ============================================
// CLI INTERFACE
// ============================================

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║        AI Agents Kit - Featured Image Generator              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Usage:                                                      ║
║    node scripts/generate-featured-image.cjs "Title" slug     ║
║                                                              ║
║  Options:                                                    ║
║    --category [category]     Add category badge (optional)   ║
║    --update-frontmatter      Auto-update blog frontmatter    ║
║                                                              ║
║  Examples:                                                   ║
║    node scripts/generate-featured-image.cjs \\               ║
║      "Claude 4 Released" claude-4-released                   ║
║                                                              ║
║    node scripts/generate-featured-image.cjs \\               ║
║      "Best AI Agent Frameworks" best-ai-frameworks \\        ║
║      --category ai-agents --update-frontmatter               ║
║                                                              ║
║  Output:                                                     ║
║    public/images/featured/[slug].webp                        ║
║                                                              ║
║  Features:                                                   ║
║    • Black & white minimalist theme                          ║
║    • 1200x630 pixels (OG standard)                           ║
║    • WebP format (<100KB)                                    ║
║    • www.aiagentskit.com watermark                           ║
║    • LARGE, readable text                                    ║
║    • Auto frontmatter update (with flag)                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
        process.exit(1);
    }

    const [title, outputName] = args;
    let category = null;
    let updateFrontmatter = args.includes('--update-frontmatter');

    // Parse optional --category flag
    const categoryIndex = args.indexOf('--category');
    if (categoryIndex !== -1 && args[categoryIndex + 1]) {
        category = args[categoryIndex + 1];
    }

    const outputDir = path.join(__dirname, '../public/images/featured');
    const outputPath = path.join(outputDir, `${outputName}.webp`);

    console.log(`\n🎨 Generating featured image...`);
    console.log(`   Title: "${title}"`);
    console.log(`   Slug: ${outputName}`);
    if (category) {
        console.log(`   Category: ${category}`);
    }
    if (updateFrontmatter) {
        console.log(`   Auto-update frontmatter: Yes`);
    }
    console.log('');

    await generateFeaturedImage(title, outputPath, category);

    console.log(`\n✅ Featured image generated successfully!`);

    // Auto-update frontmatter if flag is set
    if (updateFrontmatter) {
        try {
            const blogDir = path.join(__dirname, '../src/content/blog');
            const postPath = path.join(blogDir, `${outputName}.md`);

            if (fs.existsSync(postPath)) {
                const content = fs.readFileSync(postPath, 'utf8');
                const newHeroImage = `/images/featured/${outputName}.webp`;

                // Replace heroImage in frontmatter
                const updated = content.replace(
                    /^(heroImage:\s*)"[^"]*"|^(heroImage:\s*)'[^']*'|^(heroImage:\s*)[^\n]*/m,
                    `heroImage: "${newHeroImage}"`
                );

                if (updated !== content) {
                    fs.writeFileSync(postPath, updated, 'utf8');
                    console.log(`\n✅ Frontmatter updated automatically!`);
                    console.log(`   heroImage: "${newHeroImage}"`);
                } else {
                    console.log(`\n⚠️ Could not update frontmatter automatically.`);
                    console.log(`   Please update manually:`);
                    console.log(`   heroImage: "/images/featured/${outputName}.webp"`);
                }
            } else {
                console.log(`\n⚠️ Blog post not found: ${postPath}`);
                console.log(`   Frontmatter not updated.`);
            }
        } catch (err) {
            console.log(`\n⚠️ Error updating frontmatter: ${err.message}`);
            console.log(`   Please update manually:`);
            console.log(`   heroImage: "/images/featured/${outputName}.webp"`);
        }
    } else {
        console.log(`\n📝 Update your blog frontmatter with:`);
        console.log(`   heroImage: "/images/featured/${outputName}.webp"`);
        console.log(`\n   Or run with --update-frontmatter to auto-update.`);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        console.error('❌ Error generating image:', err.message);
        process.exit(1);
    });
}

// Export for use as module
module.exports = { generateFeaturedImage };
