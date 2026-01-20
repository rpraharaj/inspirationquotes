const fs = require('fs');
const path = require('path');

const data = require('../blogpost-content-plan/blog-analytics.json');

const noExternalLinks = data.posts
    .filter(p => p.externalLinks.length === 0)
    .sort((a, b) => b.seoScore - a.seoScore);

// Group by category
const byCategory = {};
noExternalLinks.forEach(p => {
    if (!byCategory[p.category]) {
        byCategory[p.category] = [];
    }
    byCategory[p.category].push({
        slug: p.slug,
        title: p.title,
        wordCount: p.wordCount,
        seoScore: p.seoScore,
        internalLinks: p.linksTo.length
    });
});

// Category stats
const categoryStats = Object.keys(byCategory)
    .map(cat => ({
        category: cat,
        count: byCategory[cat].length,
        avgSeoScore: Math.round(byCategory[cat].reduce((sum, p) => sum + p.seoScore, 0) / byCategory[cat].length)
    }))
    .sort((a, b) => b.count - a.count);

const result = {
    summary: {
        totalPostsNeedingExternalLinks: noExternalLinks.length,
        totalPostsInBlog: data.summary.totalPosts,
        percentageNeedingLinks: Math.round((noExternalLinks.length / data.summary.totalPosts) * 100),
        generatedAt: new Date().toISOString()
    },
    categoryStats: categoryStats,
    posts: noExternalLinks.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        wordCount: p.wordCount,
        seoScore: p.seoScore,
        currentSeoScoreLoss: 10, // Missing external links = -10 points
        potentialSeoScore: Math.min(100, p.seoScore + 10),
        internalLinksCount: p.linksTo.length,
        priority: p.seoScore >= 80 ? 'high' : p.seoScore >= 70 ? 'medium' : 'low'
    }))
};

// Output JSON
const outputPath = path.join(__dirname, '../blogpost-content-plan/external-links-needed.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log('✅ Created: ' + outputPath);
console.log('\nSummary:');
console.log('  Posts needing external links: ' + result.summary.totalPostsNeedingExternalLinks);
console.log('  Percentage of blog: ' + result.summary.percentageNeedingLinks + '%');
console.log('\nCategory breakdown:');
categoryStats.forEach(c => {
    console.log('  ' + c.category + ': ' + c.count + ' posts (avg SEO: ' + c.avgSeoScore + ')');
});
