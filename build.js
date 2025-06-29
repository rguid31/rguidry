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
    distDir: '.',  // Output to root for static hosting
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

    // Write output
    writeFile('index.html', processedTemplate);

    console.log('');
    console.log('✨ Build complete!');
    console.log('📂 Files generated in current directory');
    console.log('🌐 Run npm run dev to start development server');
}

// Run build
if (require.main === module) {
    build();
}

module.exports = { build, processTemplate, processSections };