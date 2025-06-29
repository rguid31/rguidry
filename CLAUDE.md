# Claude Context

This file provides context for Claude about Ryan Guidry's personal portfolio website project.

## Project Overview

**Ryan Guidry Portfolio** - A modern, responsive personal portfolio website showcasing the professional journey from Chemical Engineering to Data Science. The site features a clean, professional design with smooth animations, responsive layout, and comprehensive case studies.

**Key Highlights:**
- Professional portfolio with 6 detailed case studies
- Interactive navigation with scroll progress bar
- Comprehensive about page with personality profile
- Resources section with curated professional content
- Mobile-first responsive design
- Performance optimized with modern web standards

## Architecture & Structure

### Primary Pages
- **`index.html`** - Main landing page with hero section, portfolio preview, experience, and skills
- **`about.html`** - Detailed personal journey, professional attributes, personality profile with radar chart
- **`gallery.html`** - Portfolio gallery with case study previews
- **`resources.html`** - Curated resources organized by category
- **`privacy.html`** - Privacy policy page
- **`sitemap.html`** - Site navigation overview

### Key Directories
```
├── case-studies/           # Detailed project case studies
│   ├── automation.html
│   ├── data-analytics.html
│   ├── data-visualization.html
│   ├── interactive-media.html
│   ├── machine-learning.html
│   └── process-optimization.html
├── resources/             # Resource pages by category
│   ├── career-development.html
│   ├── data-science-artificial-intelligence.html
│   ├── engineering-and-design-resources.html
│   ├── learning-development.html
│   ├── technical-writing-documentation.html
│   ├── web-development-toolkit.html
│   └── [additional resource pages]
├── images/               # Organized image assets
│   ├── about/           # About page images
│   ├── background/      # Background images
│   ├── certifications/ # Certification logos
│   ├── experience/     # Professional experience images
│   ├── portfolio/      # Project thumbnails
│   └── ui/            # UI elements and logos
├── files/              # Downloadable documents
│   ├── certifications/ # PDF certificates
│   └── resume/        # Resume files
├── css/               # Additional stylesheets
├── js/                # JavaScript files
└── src/               # Source components
```

## Technical Implementation

### Frontend Technologies
- **HTML5** - Semantic markup with accessibility features
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **Vanilla JavaScript** - Interactive features without frameworks
- **Chart.js** - Data visualization for radar charts
- **Custom CSS** - Additional styling in `style.css`

### Key Features
- **Responsive Design** - Mobile-first approach with breakpoints
- **Progressive Enhancement** - Works without JavaScript
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Performance Optimization** - Lazy loading, optimized images
- **SEO Friendly** - Proper meta tags, structured data

### JavaScript Functionality (`js/main.js`)
- Navigation scroll effects with progress bar
- Mobile menu toggle with body scroll lock
- Smooth scrolling behavior
- Responsive navigation state management
- Error handling for robustness

### CSS Architecture (`style.css`)
- Custom properties for theming
- Navigation with backdrop blur and progress bar
- Responsive grid layouts
- Smooth transitions and animations
- Mobile-first responsive design

## Development Workflow

### Local Development
```bash
# Build and start development server
npm run dev              # Builds from src/ and starts dev server
npm run build            # Build only (generates index.html from partials)
npm run watch            # Build + watch for changes in src/
./dev-server.sh          # Direct server only (for pre-built files)
./dev-server.sh 8080     # Custom port

# Alternative manual methods (for pre-built files)
python3 -m http.server 3000
php -S localhost:3000
npx http-server -p 3000
```

### Development Scripts
- **`dev-server.sh`** - Multi-platform development server with fallbacks
- **`start-session.sh`** - Session management script
- **`finish-session.sh`** - Cleanup script

### Package.json Scripts
```json
{
  "build": "node build.js",
  "dev": "npm run build && ./dev-server.sh",
  "start": "./dev-server.sh",
  "serve": "./dev-server.sh", 
  "watch": "npm run build && npx nodemon --watch src --ext html,js --exec 'npm run build'",
  "preview": "./dev-server.sh 4173"
}
```

### Modular Architecture (NEW)
The site now uses a modular build system to make it easier to read and maintain:

**Source Structure:**
```
src/
├── partials/           # Reusable components
│   ├── head.html      # <head> section with meta tags, scripts
│   ├── header.html    # Navigation header
│   └── footer.html    # Site footer
├── sections/          # Page sections
│   ├── hero.html      # Landing/hero section
│   ├── about.html     # About section
│   ├── education.html # Education section
│   ├── certifications.html
│   ├── portfolio.html # Portfolio showcase
│   ├── experience.html
│   ├── skills.html
│   └── contact.html
└── templates/         # Full page templates (future)
```

**Build Process:**
- `build.js` - Node.js script that combines partials and sections
- Uses `{{include:filename}}` syntax for partials
- Uses `{{section:filename}}` syntax for sections
- Generates final `index.html` in root directory

## Content Strategy

### Portfolio Case Studies (6 Projects)
1. **Interactive Media Portfolio** - Cross-disciplinary web platform (HTML/CSS/JS/React/Node.js)
2. **IT Automation** - Windows Server Update Service for 1200+ VMs (PowerShell/WSUS)
3. **Data Analytics Platform** - Advanced analytics with 25% efficiency improvement (Python/SQL/Tableau)
4. **Machine Learning** - Predictive maintenance system, 18% cost reduction (Python/Scikit-learn/TensorFlow)
5. **Data Visualization** - Interactive BI dashboards (Tableau/Power BI/D3.js)
6. **Process Optimization** - Supply chain simulation, 10% lead time reduction (Simio/Python)

### Professional Profile Features
- **Personality Assessment** - Insights Discovery "Reforming Observer" profile
- **Professional Attributes** - Radar chart with 8 key characteristics
- **Color Dynamics** - Conscious/unconscious persona analysis
- **Communication Style** - Detailed collaboration guidelines

## Build & Deployment

### Build Process
- **Static Site** - No build step required
- **Assets** - Pre-optimized images and resources
- **Deployment** - Direct file serving (GitHub Pages, Netlify, etc.)

### Performance Considerations
- **Image Optimization** - Lazy loading, appropriate formats
- **CSS Delivery** - Inline critical CSS, external stylesheets
- **JavaScript** - Vanilla JS for minimal bundle size
- **Caching** - Static asset caching headers

## Analytics & Tracking

### Integrated Services
- **Google Tag Manager** - GTM-MFSMFS9C
- **Microsoft Clarity** - User behavior analytics (rxo9fqpdyr)
- **Privacy Compliant** - Disclosed in privacy policy

## Common Tasks & Maintenance

### Content Updates
- **Case Studies** - Located in `case-studies/` directory
- **Portfolio Images** - Update `images/portfolio/` directory
- **Professional Experience** - Modify `about.html` and `index.html`
- **Resources** - Add new pages to `resources/` directory

### Style Updates
- **Navigation** - Modify `.nav` classes in `style.css`
- **Colors** - Update Tailwind classes or custom CSS variables
- **Layout** - Adjust grid systems and responsive breakpoints

### Performance Optimization
- **Images** - Compress and optimize for web
- **CSS** - Minimize custom styles, leverage Tailwind utilities
- **JavaScript** - Keep minimal, use efficient event handling

## SEO & Accessibility

### SEO Features
- **Meta Tags** - Comprehensive title, description, and social meta
- **Structured Data** - JSON-LD for professional profile
- **URL Structure** - Clean, descriptive URLs
- **Internal Linking** - Proper navigation structure

### Accessibility Features
- **ARIA Labels** - Comprehensive labeling for screen readers
- **Keyboard Navigation** - Full keyboard accessibility
- **Color Contrast** - WCAG AA compliant color schemes
- **Alternative Text** - Descriptive alt tags for all images

## Notes for Claude

### Common Modification Patterns
- **Adding New Case Studies** - Create HTML file in `case-studies/`, add to `gallery.html`
- **Updating Professional Info** - Modify `about.html` for detailed changes, `index.html` for summary
- **Resource Management** - Add new categories to `resources/` with consistent structure
- **Navigation Updates** - Update all navigation menus across pages for consistency

### Development Best Practices
- **Mobile-First** - Always test responsive design on mobile first
- **Progressive Enhancement** - Ensure functionality without JavaScript
- **Performance** - Optimize images before adding to repository
- **Accessibility** - Test with screen readers and keyboard navigation
- **Browser Compatibility** - Test across modern browsers (Chrome, Firefox, Safari, Edge)

### File Naming Conventions
- **HTML Files** - Lowercase, hyphen-separated
- **Images** - Descriptive names, organized by category
- **CSS Classes** - BEM methodology for custom classes, Tailwind utilities
- **JavaScript** - Descriptive function and variable names with error handling

This is a mature, production-ready portfolio website with comprehensive features and professional presentation.