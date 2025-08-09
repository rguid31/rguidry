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
    distDir: 'dist',  // Output to dist for static hosting
    partialsDir: 'src/partials',
    sectionsDir: 'src/sections',
    templatesDir: 'src/templates',
    pagesDir: 'src/pages'
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
        ensureDir(path.dirname(filePath));
        fs.writeFileSync(filePath, content);
        console.log(`✅ Generated: ${filePath}`);
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
    }
}

// Copy file with error handling
function copyFileSync(src, dest) {
    try {
        ensureDir(path.dirname(dest));
        fs.copyFileSync(src, dest);
        console.log(`📄 Copied: ${src} -> ${dest}`);
    } catch (error) {
        console.error(`Error copying file ${src} to ${dest}:`, error.message);
    }
}

// Recursively copy a directory
function copyDirSync(srcDir, destDir) {
    try {
        if (!fs.existsSync(srcDir)) return;
        ensureDir(destDir);
        const entries = fs.readdirSync(srcDir, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path.join(srcDir, entry.name);
            const destPath = path.join(destDir, entry.name);
            if (entry.isDirectory()) {
                copyDirSync(srcPath, destPath);
            } else if (entry.isFile()) {
                copyFileSync(srcPath, destPath);
            }
        }
        console.log(`📁 Copied directory: ${srcDir} -> ${destDir}`);
    } catch (error) {
        console.error(`Error copying directory ${srcDir} to ${destDir}:`, error.message);
    }
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

// Build index.html from inline template (legacy home composition)
function buildHomePage() {
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

    let processedTemplate = processTemplate(indexTemplate);
    processedTemplate = processSections(processedTemplate);

    writeFile(path.join(config.distDir, 'index.html'), processedTemplate);
}

// Copy all top-level HTML pages (except index built above) into dist
function copyTopLevelHtmlToDist() {
    const rootHtml = fs.readdirSync('.', { withFileTypes: true })
        .filter(d => d.isFile() && d.name.endsWith('.html'))
        .map(d => d.name);

    for (const htmlFile of rootHtml) {
        if (htmlFile === 'index.html') continue; // skip root index.html if present
        copyFileSync(path.join('.', htmlFile), path.join(config.distDir, htmlFile));
    }
}

// Copy static assets and content directories to dist
function copyAssetsToDist() {
    const dirsToCopy = [
        'images',
        'js',
        'css',
        'files',
        'case-studies',
        'resources',
        'chat-subdomain'
    ];

    for (const dir of dirsToCopy) {
        const srcPath = path.join('.', dir);
        if (fs.existsSync(srcPath)) {
            copyDirSync(srcPath, path.join(config.distDir, dir));
        }
    }

    const filesToCopy = [
        'style.css'
    ];

    for (const file of filesToCopy) {
        if (fs.existsSync(file)) {
            copyFileSync(file, path.join(config.distDir, file));
        }
    }
}

// Future: Build pages from src/pages when migrated
function buildPagesFromSrc() {
    if (!fs.existsSync(config.pagesDir)) return;
    const pages = fs.readdirSync(config.pagesDir, { withFileTypes: true })
        .filter(d => d.isFile() && d.name.endsWith('.html'))
        .map(d => d.name);

    for (const page of pages) {
        const raw = readFile(path.join(config.pagesDir, page));
        // Allow includes/sections in migrated pages
        let processed = processTemplate(raw);
        processed = processSections(processed);
        writeFile(path.join(config.distDir, page), processed);
    }
}

// Main build function
function build() {
    console.log('🚀 Building Ryan Guidry Portfolio...');
    console.log('=====================================');

    ensureDir(config.distDir);

    // Build index.html from sections/partials
    buildHomePage();

    // Build any migrated pages in src/pages (optional)
    buildPagesFromSrc();

    // Copy static assets and legacy pages
    copyAssetsToDist();
    copyTopLevelHtmlToDist();

    console.log('');
    console.log('✨ Build complete!');
    console.log(`📂 Files generated in ${config.distDir}`);
    console.log('🌐 Run npm run dev to start development server');
}

// Run build
if (require.main === module) {
    build();
}

module.exports = { build, processTemplate, processSections };