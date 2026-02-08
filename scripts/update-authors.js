import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const TARGET_AUTHOR = 'Inspiration Quotes Hub';

// Get all markdown files
const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

let updatedCount = 0;
let alreadyCorrectCount = 0;

console.log(`Found ${files.length} blog posts to check...\n`);

files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check current author
    const authorMatch = content.match(/^author:\s*"([^"]+)"/m);

    if (!authorMatch) {
        console.log(`⚠️  No author field found in: ${file}`);
        return;
    }

    const currentAuthor = authorMatch[1];

    if (currentAuthor === TARGET_AUTHOR) {
        alreadyCorrectCount++;
        return;
    }

    // Replace author field
    const updatedContent = content.replace(
        /^author:\s*"[^"]+"/m,
        `author: "${TARGET_AUTHOR}"`
    );

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated: ${file}`);
    console.log(`   "${currentAuthor}" → "${TARGET_AUTHOR}"`);
    updatedCount++;
});

console.log(`\n${'='.repeat(50)}`);
console.log(`✨ Update Complete!`);
console.log(`${'='.repeat(50)}`);
console.log(`📊 Summary:`);
console.log(`   • Total posts checked: ${files.length}`);
console.log(`   • Posts updated: ${updatedCount}`);
console.log(`   • Already correct: ${alreadyCorrectCount}`);
console.log(`   • Target author: "${TARGET_AUTHOR}"`);
