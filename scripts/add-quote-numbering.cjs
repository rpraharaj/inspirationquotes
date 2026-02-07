const fs = require('fs');

function addNumbering(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split(/\r?\n/);
    let quoteCount = 0;
    let newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.trim().startsWith('> "')) {
            // Check if it already has numbering
            if (!/^\d+\.\s+>/.test(line)) {
                quoteCount++;
                newLines.push(`${quoteCount}. ${line}`);
            } else {
                newLines.push(line);
                let match = line.match(/^(\d+)\./);
                if (match) quoteCount = parseInt(match[1]);
            }
        } else {
            newLines.push(line);
        }
    }
    
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`Added numbering to ${quoteCount} quotes in ${filePath}`);
}

const files = [
    'src/content/blog/confidence-quotes-to-believe-in-yourself.md',
    'src/content/blog/quotes-about-taking-risks.md'
];

files.forEach(addNumbering);