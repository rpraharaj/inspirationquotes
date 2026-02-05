/**
 * Image Processor for AI Agents Kit Featured Images
 * 
 * Processes AI-generated or external images to meet OG specifications:
 * - Crops to 1200x630 (1.91:1 aspect ratio)
 * - Converts to WebP format
 * - Compresses to <100KB
 * - Optionally adds watermark
 * 
 * Usage:
 *   node scripts/process-image.cjs input.png output.webp
 *   node scripts/process-image.cjs input.png output.webp --watermark
 *   node scripts/process-image.cjs input.png output.webp --quality 70
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;
const DEFAULT_QUALITY = 85;
const WATERMARK_TEXT = 'www.inspirationquoteshub.com';

// ============================================
// PROCESSING FUNCTIONS
// ============================================

async function processImage(inputPath, outputPath, options = {}) {
    const { quality = DEFAULT_QUALITY, addWatermark = false } = options;

    // Verify input exists
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`);
    }

    // Get input metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`📷 Input: ${metadata.width}x${metadata.height} (${metadata.format})`);

    // Calculate crop for 1.91:1 aspect ratio
    const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;
    const inputRatio = metadata.width / metadata.height;

    let extractOptions;

    if (inputRatio > targetRatio) {
        // Image is too wide, crop horizontally
        const newWidth = Math.round(metadata.height * targetRatio);
        const left = Math.round((metadata.width - newWidth) / 2);
        extractOptions = {
            left: left,
            top: 0,
            width: newWidth,
            height: metadata.height
        };
    } else {
        // Image is too tall, crop vertically (center extract)
        const newHeight = Math.round(metadata.width / targetRatio);
        const top = Math.round((metadata.height - newHeight) / 2);
        extractOptions = {
            left: 0,
            top: top,
            width: metadata.width,
            height: newHeight
        };
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process image
    let pipeline = sharp(inputPath)
        .extract(extractOptions)
        .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'fill' });

    // Add watermark if requested
    if (addWatermark) {
        // Create SVG watermark
        const watermarkSvg = `
            <svg width="${TARGET_WIDTH}" height="${TARGET_HEIGHT}">
                <text 
                    x="${TARGET_WIDTH - 30}" 
                    y="${TARGET_HEIGHT - 25}" 
                    font-family="Arial, sans-serif" 
                    font-size="16" 
                    fill="#525252"
                    text-anchor="end"
                >${WATERMARK_TEXT}</text>
            </svg>
        `;

        pipeline = pipeline.composite([{
            input: Buffer.from(watermarkSvg),
            gravity: 'southeast'
        }]);
    }

    // Convert to WebP
    await pipeline
        .webp({ quality: quality })
        .toFile(outputPath);

    // Get output stats
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✅ Processed: ${outputPath}`);
    console.log(`   Dimensions: ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
    console.log(`   Format: WebP (quality: ${quality})`);
    console.log(`   Size: ${sizeKB} KB`);

    if (addWatermark) {
        console.log(`   Watermark: ${WATERMARK_TEXT}`);
    }

    // Check if too large
    if (stats.size > 100 * 1024) {
        console.log(`\n⚠️ Warning: File size exceeds 100KB!`);
        console.log(`   Try reducing quality with: --quality 70`);

        // Suggest optimal quality
        const suggestedQuality = Math.floor(quality * (100 * 1024 / stats.size));
        console.log(`   Suggested quality: ${Math.max(50, suggestedQuality)}`);
    }

    return {
        width: TARGET_WIDTH,
        height: TARGET_HEIGHT,
        size: stats.size,
        path: outputPath
    };
}

// ============================================
// CLI INTERFACE
// ============================================

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║        AI Agents Kit - Image Processor                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Crops and optimizes images for OG specifications.          ║
║                                                              ║
║  Usage:                                                      ║
║    node scripts/process-image.cjs input output [options]     ║
║                                                              ║
║  Options:                                                    ║
║    --watermark         Add www.aiagentskit.com watermark     ║
║    --quality [1-100]   WebP quality (default: 85)            ║
║                                                              ║
║  Examples:                                                   ║
║    node scripts/process-image.cjs raw.png \\                 ║
║      public/images/featured/my-post.webp                     ║
║                                                              ║
║    node scripts/process-image.cjs ai-generated.png \\        ║
║      public/images/featured/my-post.webp --watermark         ║
║                                                              ║
║    node scripts/process-image.cjs large.png \\               ║
║      public/images/featured/my-post.webp --quality 70        ║
║                                                              ║
║  Output:                                                     ║
║    1200x630 WebP image (<100KB target)                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
        process.exit(1);
    }

    const [inputPath, outputPath] = args;

    // Parse options
    const options = {
        quality: DEFAULT_QUALITY,
        addWatermark: args.includes('--watermark')
    };

    const qualityIndex = args.indexOf('--quality');
    if (qualityIndex !== -1 && args[qualityIndex + 1]) {
        options.quality = parseInt(args[qualityIndex + 1], 10);
        if (isNaN(options.quality) || options.quality < 1 || options.quality > 100) {
            console.error('❌ Quality must be a number between 1 and 100');
            process.exit(1);
        }
    }

    console.log(`\n🔧 Processing image...`);
    console.log(`   Input: ${inputPath}`);
    console.log(`   Output: ${outputPath}`);
    console.log(`   Quality: ${options.quality}%`);
    console.log(`   Watermark: ${options.addWatermark ? 'Yes' : 'No'}`);
    console.log('');

    await processImage(inputPath, outputPath, options);

    console.log(`\n✅ Image processed successfully!`);

    // Extract slug from output path for frontmatter suggestion
    const slug = path.basename(outputPath, '.webp');
    console.log(`\n📝 Update your blog frontmatter with:`);
    console.log(`   heroImage: "/images/featured/${slug}.webp"`);
}

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        console.error('❌ Error processing image:', err.message);
        process.exit(1);
    });
}

// Export for use as module
module.exports = { processImage };
