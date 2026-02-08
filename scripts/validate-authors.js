import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const EXPECTED_AUTHOR = 'Inspiration Quotes Hub';

/**
 * Validates that all blog posts have the correct author field
 * Exit code 0 = all valid
 * Exit code 1 = validation failures found
 */
function validateAuthors() {
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

    let hasErrors = false;
    const errors = [];

    console.log(`🔍 Validating author field in ${files.length} blog posts...\n`);

    files.forEach(file => {
        const filePath = path.join(BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if author field exists
        const authorMatch = content.match(/^author:\s*"([^"]+)"/m);

        if (!authorMatch) {
            errors.push({
                file,
                issue: 'Missing author field',
                expected: EXPECTED_AUTHOR,
                actual: 'NONE'
            });
            hasErrors = true;
            return;
        }

        const currentAuthor = authorMatch[1];

        if (currentAuthor !== EXPECTED_AUTHOR) {
            errors.push({
                file,
                issue: 'Incorrect author',
                expected: EXPECTED_AUTHOR,
                actual: currentAuthor
            });
            hasErrors = true;
        }
    });

    if (hasErrors) {
        console.log('❌ VALIDATION FAILED\n');
        console.log(`Found ${errors.length} issue(s):\n`);

        errors.forEach(({ file, issue, expected, actual }) => {
            console.log(`  📄 ${file}`);
            console.log(`     Issue: ${issue}`);
            console.log(`     Expected: "${expected}"`);
            console.log(`     Actual: "${actual}"`);
            console.log('');
        });

        console.log('💡 To fix these issues, run: npm run fix:authors\n');
        process.exit(1);
    } else {
        console.log('✅ All blog posts have the correct author!\n');
        console.log(`   Author: "${EXPECTED_AUTHOR}"`);
        console.log(`   Posts validated: ${files.length}`);
        process.exit(0);
    }
}

validateAuthors();
