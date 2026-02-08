import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const TARGET_AUTHOR = 'Inspiration Quotes Hub';

// Files missing author field
const filesWithoutAuthor = [
    'family-quotes-about-love-and-togetherness.md',
    'funny-work-quotes.md',
    'gratitude-quotes-for-hard-times.md',
    'gratitude-quotes-to-appreciate-life.md',
    'life-quotes-that-teach-wisdom.md',
    'quotes-about-breathing-and-calm.md',
    'quotes-about-choices-and-consequences.md',
    'quotes-about-choosing-happiness.md',
    'quotes-about-family-support.md',
    'quotes-about-family-traditions.md',
    'quotes-about-family-unity.md',
    'quotes-about-gratitude-and-happiness.md',
    'quotes-about-gratitude-for-family.md',
    'quotes-about-happiness-and-peace.md',
    'quotes-about-home-and-family.md',
    'quotes-about-joy-and-gratitude.md',
    'quotes-about-life-changing-moments.md',
    'quotes-about-self-belief.md',
    'quotes-about-simplicity-and-living-well.md',
    'quotes-about-time-and-priorities.md',
    'sarcastic-quotes-with-a-clever-twist.md',
    'short-happiness-quotes.md',
    'thankful-quotes-for-everyday-blessings.md'
];

let addedCount = 0;

console.log(`Adding author field to ${filesWithoutAuthor.length} posts...\n`);

filesWithoutAuthor.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Add author field after pubDate
    const updatedContent = content.replace(
        /^(pubDate:\s*.+)$/m,
        `$1\nauthor: "${TARGET_AUTHOR}"`
    );

    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✅ Added author to: ${file}`);
        addedCount++;
    } else {
        console.log(`⚠️  Could not add author to: ${file}`);
    }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`✨ Author Field Addition Complete!`);
console.log(`${'='.repeat(50)}`);
console.log(`📊 Summary:`);
console.log(`   • Posts processed: ${filesWithoutAuthor.length}`);
console.log(`   • Author field added: ${addedCount}`);
console.log(`   • Author value: "${TARGET_AUTHOR}"`);
