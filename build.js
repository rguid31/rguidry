#!/usr/bin/env node

/**
 * Simple static site generator for Ryan Guidry's portfolio
 * Combines partial templates into complete HTML files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    srcDir: 'src',
    distDir: 'dist', // Output to dist for cleaner hosting
    partialsDir: 'src/partials',
    sectionsDir: 'src/sections',
    templatesDir: 'src/templates'
};

// Ensure output directory exists
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Read file with error handling
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

// Write file with error handling
function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Generated: ${filePath}`);
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
    }
}

// Copy utilities
function copyFileSync(source, target) {
    ensureDir(path.dirname(target));
    fs.copyFileSync(source, target);
    console.log(`📄 Copied: ${source} -> ${target}`);
}

function copyDirSync(sourceDir, targetDir) {
    if (!fs.existsSync(sourceDir)) return;
    ensureDir(targetDir);
    for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
        const srcPath = path.join(sourceDir, entry.name);
        const destPath = path.join(targetDir, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            copyFileSync(srcPath, destPath);
        }
    }
}

function emptyDirSync(targetDir) {
    if (!fs.existsSync(targetDir)) return;
    for (const entry of fs.readdirSync(targetDir, { withFileTypes: true })) {
        const entryPath = path.join(targetDir, entry.name);
        if (entry.isDirectory()) {
            emptyDirSync(entryPath);
            fs.rmdirSync(entryPath);
        } else {
            fs.unlinkSync(entryPath);
        }
    }
}

function getAllHtmlRoutes(distDir) {
    const routes = new Set();
    // Top-level pages
    ['index.html', 'privacy.html', 'resources.html', 'sitemap.html', 'about.html', 'profile.html']
        .forEach((file) => {
            const filePath = path.join(distDir, file);
            if (fs.existsSync(filePath)) {
                if (file === 'index.html') routes.add('/');
                else routes.add('/' + file.replace(/\\.html$/, ''));
            }
        });
    // Nested content directories to scan
    ['case-studies', 'resources'].forEach((dir) => {
        const full = path.join(distDir, dir);
        if (fs.existsSync(full)) {
            for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
                if (entry.isFile() && entry.name.endsWith('.html')) {
                    const name = entry.name.replace(/\\.html$/, '');
                    routes.add(`/${dir}/${name}`);
                }
            }
        }
    });
    return Array.from(routes).sort();
}

function generateSitemap(distDir) {
    const baseUrl = process.env.SITE_URL || '';
    const routes = getAllHtmlRoutes(distDir);
    const today = new Date().toISOString().split('T')[0];
    const urlset = routes.map((route) => {
        const loc = baseUrl ? `${baseUrl}${route}` : route;
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.7'}</priority>\n  </url>`;
    }).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
    writeFile(path.join(distDir, 'sitemap.xml'), xml);
}

function generateRobots(distDir) {
    const baseUrl = process.env.SITE_URL || '';
    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl ? baseUrl : ''}/sitemap.xml\n`;
    writeFile(path.join(distDir, 'robots.txt'), robots);
}

// Template processor - replaces {{include:filename}} with file contents
function processTemplate(template) {
    return template.replace(/\{\{include:([^}]+)\}\}/g, (match, filename) => {
        const filePath = path.join(config.partialsDir, filename);
        const content = readFile(filePath);
        return content;
    });
}

// Section processor - replaces {{section:filename}} with section contents
function processSections(template) {
    return template.replace(/\{\{section:([^}]+)\}\}/g, (match, filename) => {
        const filePath = path.join(config.sectionsDir, filename);
        const content = readFile(filePath);
        return content;
    });
}

// Main build function
function build() {
    console.log('🚀 Building Ryan Guidry Portfolio...');
    console.log('=====================================');

    // Prepare output directory
    ensureDir(config.distDir);
    emptyDirSync(config.distDir);

    // Create main index.html from template
    const indexTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
{{include:head.html}}
</head>
<body class="bg-gray-50 text-gray-800">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFSMFS9C"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

{{include:header.html}}

    <main class="pt-0 container mx-auto px-6">
{{section:hero.html}}
{{section:about.html}}
{{section:education.html}}
{{section:certifications.html}}
{{section:portfolio.html}}
{{section:experience.html}}
{{section:skills.html}}
{{section:contact.html}}
    </main>

{{include:footer.html}}
</body>
</html>`;

    // Process template
    let processedTemplate = processTemplate(indexTemplate);
    processedTemplate = processSections(processedTemplate);

    // Write output to dist
    writeFile(path.join(config.distDir, 'index.html'), processedTemplate);

    // Copy static assets referenced by pages
    const staticCopies = [
        { src: 'style.css', dest: path.join(config.distDir, 'style.css') },
        { src: 'script.js', dest: path.join(config.distDir, 'script.js') },
    ];
    staticCopies.forEach(({ src, dest }) => {
        if (fs.existsSync(src)) copyFileSync(src, dest);
    });

    // Copy directories if present
    copyDirSync('images', path.join(config.distDir, 'images'));
    copyDirSync('files', path.join(config.distDir, 'files'));
    copyDirSync('case-studies', path.join(config.distDir, 'case-studies'));
    copyDirSync('resources', path.join(config.distDir, 'resources'));

    // Copy additional standalone html pages if they exist
    ['privacy.html', 'resources.html', 'sitemap.html', 'about.html', 'profile.html'].forEach((page) => {
        if (fs.existsSync(page)) {
            copyFileSync(page, path.join(config.distDir, page));
        }
    });

    // Generate sitemap.xml and robots.txt
    generateSitemap(config.distDir);
    generateRobots(config.distDir);

    console.log('');
    console.log('✨ Build complete!');
    console.log(`📂 Files generated in ${config.distDir}/`);
    console.log('🌐 Run npm run dev to start development server (serves dist)');
}

// Run build
if (require.main === module) {
    build();
}

module.exports = { build, processTemplate, processSections };