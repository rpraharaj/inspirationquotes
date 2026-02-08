#!/usr/bin/env python3
"""
Blog Post Analysis Report Generator
Generates a comprehensive report of all blog posts with SEO and content metrics.
"""

import os
import re
from pathlib import Path
import csv
from datetime import datetime

# Configuration
BLOG_DIR = Path(__file__).parent / "src" / "content" / "blog"
OUTPUT_CSV = Path(__file__).parent / "blog-analysis-report.csv"
OUTPUT_MD = Path(__file__).parent / "blog-analysis-report.md"

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content."""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if match:
        return match.group(1), content[match.end():]
    return "", content

def parse_frontmatter(frontmatter):
    """Parse YAML frontmatter into a dictionary."""
    data = {}
    for line in frontmatter.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            data[key.strip()] = value.strip().strip('"').strip("'")
    return data

def count_headings(content):
    """Count H1, H2, and H3 headings in markdown content."""
    h1_count = len(re.findall(r'^# [^#]', content, re.MULTILINE))
    h2_count = len(re.findall(r'^## [^#]', content, re.MULTILINE))
    h3_count = len(re.findall(r'^### [^#]', content, re.MULTILINE))
    return h1_count, h2_count, h3_count

def count_internal_links_outgoing(content):
    """Count internal links (links to other blog posts) in the content."""
    # Match markdown links like [text](/path/) or [text](path)
    # Exclude external links (http://, https://)
    internal_links = re.findall(r'\[([^\]]+)\]\((?!http)([^\)]+)\)', content)
    return len(internal_links)

def count_external_links(content):
    """Count external links (http/https) in the content."""
    # Match markdown format: [text](https://...)
    markdown_links = re.findall(r'\[([^\]]+)\]\((https?://[^\)]+)\)', content)
    # Match HTML format: <a href="https://...">
    html_links = re.findall(r'<a\s+href=["\']?(https?://[^"\'>\s]+)["\']?', content, re.IGNORECASE)
    return len(markdown_links) + len(html_links)

def find_incoming_links(slug, all_posts_content):
    """Count how many other posts link to this post."""
    incoming_count = 0
    # Look for links to this slug in other posts
    link_pattern = rf'\[([^\]]+)\]\([^\)]*{re.escape(slug)}[^\)]*\)'
    
    for post_slug, post_content in all_posts_content.items():
        if post_slug != slug:  # Don't count self-references
            if re.search(link_pattern, post_content):
                incoming_count += 1
    
    return incoming_count

def analyze_post(filepath):
    """Analyze a single blog post and return metrics."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    frontmatter_text, body_content = extract_frontmatter(content)
    frontmatter = parse_frontmatter(frontmatter_text)
    
    # Extract metrics
    post_name = filepath.stem
    post_slug = post_name  # Slug is typically the filename without extension
    post_title = frontmatter.get('title', 'N/A')
    post_meta = frontmatter.get('description', 'N/A')
    
    # Count headings
    h1_count, h2_count, h3_count = count_headings(body_content)
    
    # Count links
    outgoing_links = count_internal_links_outgoing(body_content)
    external_links = count_external_links(body_content)
    
    # Calculate lengths
    title_length = len(post_title)
    meta_length = len(post_meta)
    
    return {
        'post_name': post_name,
        'post_slug': post_slug,
        'post_title': post_title,
        'post_meta': post_meta,
        'h1_count': h1_count,
        'h2_count': h2_count,
        'h3_count': h3_count,
        'internal_links_outgoing': outgoing_links,
        'external_links': external_links,
        'title_length': title_length,
        'meta_length': meta_length,
        'body_content': body_content  # Store for incoming link analysis
    }

def generate_markdown_report(posts_data):
    """Generate a markdown formatted report."""
    total_posts = len(posts_data)
    total_h1s = sum(p['h1_count'] for p in posts_data.values())
    total_h2s = sum(p['h2_count'] for p in posts_data.values())
    total_h3s = sum(p['h3_count'] for p in posts_data.values())
    total_outgoing = sum(p['internal_links_outgoing'] for p in posts_data.values())
    total_incoming = sum(p['internal_links_incoming'] for p in posts_data.values())
    total_external = sum(p['external_links'] for p in posts_data.values())
    
    avg_title_len = sum(p['title_length'] for p in posts_data.values()) / total_posts
    avg_meta_len = sum(p['meta_length'] for p in posts_data.values()) / total_posts
    
    md_content = f"""# Blog Analysis Report

**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Summary Statistics

| Metric | Total | Average per Post |
|--------|-------|------------------|
| **Total Posts** | {total_posts} | - |
| **H1 Headings** | {total_h1s} | {total_h1s / total_posts:.1f} |
| **H2 Headings** | {total_h2s} | {total_h2s / total_posts:.1f} |
| **H3 Headings** | {total_h3s} | {total_h3s / total_posts:.1f} |
| **Internal Links (Outgoing)** | {total_outgoing} | {total_outgoing / total_posts:.1f} |
| **Internal Links (Incoming)** | {total_incoming} | {total_incoming / total_posts:.1f} |
| **External Links** | {total_external} | {total_external / total_posts:.1f} |
| **Title Length** | - | {avg_title_len:.0f} chars |
| **Meta Description Length** | - | {avg_meta_len:.0f} chars |

## SEO Health Indicators

### Title Length Analysis
- ✅ Optimal: 50-60 characters
- ⚠️ Acceptable: 40-70 characters
- ❌ Too short/long: <40 or >70 characters

### Meta Description Analysis
- ✅ Optimal: 150-160 characters
- ⚠️ Acceptable: 120-170 characters
- ❌ Too short/long: <120 or >170 characters

### Posts with SEO Issues

#### Posts with No External Links
"""
    
    # Find posts with no external links
    no_external = [slug for slug, data in posts_data.items() if data['external_links'] == 0]
    if no_external:
        md_content += f"\n**Count:** {len(no_external)} posts\n\n"
        for slug in sorted(no_external)[:10]:  # Show first 10
            md_content += f"- {posts_data[slug]['post_title']}\n"
        if len(no_external) > 10:
            md_content += f"\n*...and {len(no_external) - 10} more*\n"
    else:
        md_content += "\n✅ All posts have external links!\n"
    
    # Find posts with no internal links
    md_content += "\n#### Posts with No Internal Links (Outgoing)\n"
    no_internal = [slug for slug, data in posts_data.items() if data['internal_links_outgoing'] == 0]
    if no_internal:
        md_content += f"\n**Count:** {len(no_internal)} posts\n\n"
        for slug in sorted(no_internal)[:10]:
            md_content += f"- {posts_data[slug]['post_title']}\n"
        if len(no_internal) > 10:
            md_content += f"\n*...and {len(no_internal) - 10} more*\n"
    else:
        md_content += "\n✅ All posts have internal links!\n"
    
    # Find posts with low internal links (fewer than 5)
    md_content += "\n#### Posts with Low Internal Links (Fewer than 5)\n"
    low_internal = [(slug, data) for slug, data in posts_data.items() if 0 < data['internal_links_outgoing'] < 5]
    if low_internal:
        # Sort by link count (ascending)
        low_internal.sort(key=lambda x: x[1]['internal_links_outgoing'])
        md_content += f"\n**Count:** {len(low_internal)} posts need more internal links\n\n"
        for slug, data in low_internal[:15]:  # Show first 15
            md_content += f"- **{data['post_title']}** - {data['internal_links_outgoing']} links (add {5 - data['internal_links_outgoing']} more)\n"
        if len(low_internal) > 15:
            md_content += f"\n*...and {len(low_internal) - 15} more*\n"
    else:
        md_content += "\n✅ All posts have 5+ internal links!\n"
    
    # Find posts with no incoming links
    md_content += "\n#### Posts with No Incoming Links (Orphaned)\n"
    no_incoming = [slug for slug, data in posts_data.items() if data['internal_links_incoming'] == 0]
    if no_incoming:
        md_content += f"\n**Count:** {len(no_incoming)} posts\n\n"
        for slug in sorted(no_incoming)[:10]:
            md_content += f"- {posts_data[slug]['post_title']}\n"
        if len(no_incoming) > 10:
            md_content += f"\n*...and {len(no_incoming) - 10} more*\n"
    else:
        md_content += "\n✅ All posts have incoming links!\n"
    
    # Top performers
    md_content += "\n## Top Performers\n\n"
    
    # Most internal links outgoing
    md_content += "### Most Internal Links (Outgoing)\n\n"
    sorted_by_outgoing = sorted(posts_data.items(), key=lambda x: x[1]['internal_links_outgoing'], reverse=True)[:5]
    for slug, data in sorted_by_outgoing:
        md_content += f"- **{data['post_title']}** - {data['internal_links_outgoing']} links\n"
    
    # Most incoming links
    md_content += "\n### Most Incoming Links (Most Referenced)\n\n"
    sorted_by_incoming = sorted(posts_data.items(), key=lambda x: x[1]['internal_links_incoming'], reverse=True)[:5]
    for slug, data in sorted_by_incoming:
        md_content += f"- **{data['post_title']}** - {data['internal_links_incoming']} incoming links\n"
    
    # Most external links
    md_content += "\n### Most External Links\n\n"
    sorted_by_external = sorted(posts_data.items(), key=lambda x: x[1]['external_links'], reverse=True)[:5]
    for slug, data in sorted_by_external:
        md_content += f"- **{data['post_title']}** - {data['external_links']} external links\n"
    
    # Detailed table
    md_content += "\n## Detailed Post Analysis\n\n"
    md_content += "| Post Name | Title | H1 | H2 | H3 | Internal Out | Internal In | External | Title Len | Meta Len |\n"
    md_content += "|-----------|-------|----|----|----|--------------|--------------|-----------|-----------|-----------|\n"
    
    for slug in sorted(posts_data.keys()):
        data = posts_data[slug]
        # Truncate title if too long
        title = data['post_title'][:50] + "..." if len(data['post_title']) > 50 else data['post_title']
        md_content += f"| {data['post_name'][:30]} | {title} | {data['h1_count']} | {data['h2_count']} | {data['h3_count']} | {data['internal_links_outgoing']} | {data['internal_links_incoming']} | {data['external_links']} | {data['title_length']} | {data['meta_length']} |\n"
    
    return md_content

def generate_report():
    """Generate the complete blog analysis report."""
    print(f"🔍 Analyzing blog posts in: {BLOG_DIR}")
    
    if not BLOG_DIR.exists():
        print(f"❌ Error: Blog directory not found: {BLOG_DIR}")
        return
    
    # Get all markdown files
    md_files = list(BLOG_DIR.glob("*.md"))
    print(f"📝 Found {len(md_files)} blog posts")
    
    if not md_files:
        print("❌ No markdown files found in blog directory")
        return
    
    # First pass: analyze all posts
    posts_data = {}
    for filepath in md_files:
        try:
            post_data = analyze_post(filepath)
            posts_data[post_data['post_slug']] = post_data
        except Exception as e:
            print(f"⚠️  Error analyzing {filepath.name}: {e}")
    
    # Second pass: count incoming links
    print("🔗 Analyzing incoming links...")
    all_posts_content = {slug: data['body_content'] for slug, data in posts_data.items()}
    
    for slug, post_data in posts_data.items():
        post_data['internal_links_incoming'] = find_incoming_links(slug, all_posts_content)
    
    # Write to CSV
    print(f"📊 Generating CSV report: {OUTPUT_CSV}")
    
    fieldnames = [
        'post_name',
        'post_slug',
        'post_title',
        'post_meta',
        'h1_count',
        'h2_count',
        'h3_count',
        'internal_links_outgoing',
        'internal_links_incoming',
        'external_links',
        'title_length',
        'meta_length'
    ]
    
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        # Sort by post name for consistency
        for slug in sorted(posts_data.keys()):
            post_data = posts_data[slug]
            # Remove body_content before writing
            row_data = {k: v for k, v in post_data.items() if k != 'body_content'}
            writer.writerow(row_data)
    
    print(f"✅ CSV report generated!")
    
    # Write to Markdown
    print(f"📄 Generating Markdown report: {OUTPUT_MD}")
    md_content = generate_markdown_report(posts_data)
    with open(OUTPUT_MD, 'w', encoding='utf-8') as mdfile:
        mdfile.write(md_content)
    
    print(f"✅ Markdown report generated!")
    print(f"\n📁 Output files:")
    print(f"   - CSV: {OUTPUT_CSV}")
    print(f"   - Markdown: {OUTPUT_MD}")
    
    print(f"\n📈 Summary:")
    print(f"   Total posts analyzed: {len(posts_data)}")
    
    # Calculate some aggregate stats
    total_h2s = sum(p['h2_count'] for p in posts_data.values())
    total_outgoing = sum(p['internal_links_outgoing'] for p in posts_data.values())
    total_external = sum(p['external_links'] for p in posts_data.values())
    
    print(f"   Total H2 headings: {total_h2s}")
    print(f"   Total internal links: {total_outgoing}")
    print(f"   Total external links: {total_external}")
    print(f"   Average H2s per post: {total_h2s / len(posts_data):.1f}")
    print(f"   Average internal links per post: {total_outgoing / len(posts_data):.1f}")
    print(f"   Average external links per post: {total_external / len(posts_data):.1f}")

if __name__ == "__main__":
    print("=" * 60)
    print("Blog Post Analysis Report Generator")
    print("=" * 60)
    print()
    generate_report()
    print()
    print("=" * 60)
