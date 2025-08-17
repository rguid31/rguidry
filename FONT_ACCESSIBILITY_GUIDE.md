# Font Accessibility Implementation Guide

## Overview
This document outlines the comprehensive font accessibility improvements implemented across the Ryan Guidry portfolio website to ensure WCAG AA compliance and optimal readability for all users.

## Font Stack Implementation

### Primary Font: Inter
- **Why Inter?** Designed specifically for computer screens and user interfaces
- **Accessibility Features**: High x-height, clear letterforms, excellent readability at all sizes
- **Weights Available**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Fallback Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Fallback Order:**
1. **Inter** - Primary web font
2. **-apple-system** - San Francisco on macOS/iOS
3. **BlinkMacSystemFont** - San Francisco on older macOS
4. **Segoe UI** - Windows system font
5. **Roboto** - Android/Chrome OS
6. **Helvetica Neue** - Universal fallback
7. **Arial** - Universal fallback

## Font Size Standards (WCAG Compliance)

### Minimum Sizes
- **Body Text**: 16px (1rem) - **WCAG AA Minimum**
- **Small Text**: 14px (0.875rem) - **WCAG AA Minimum**
- **Headings**: 24px (1.5rem) - **WCAG AA Minimum**

### Preferred Sizes
- **Body Text**: 18px (1.125rem) - **WCAG AAA Preferred**
- **Small Text**: 16px (1rem) - **WCAG AAA Preferred**

### Size Scale
```css
:root {
    --text-xs: 0.75rem;    /* 12px - Use sparingly, ensure high contrast */
    --text-sm: 0.875rem;   /* 14px - Good for secondary text */
    --text-base: 1rem;     /* 16px - MINIMUM for body text (WCAG AA) */
    --text-lg: 1.125rem;   /* 18px - Preferred for body text (WCAG AAA) */
    --text-xl: 1.25rem;    /* 20px - Good for subheadings */
    --text-2xl: 1.5rem;    /* 24px - Good for headings */
    --text-3xl: 1.875rem;  /* 30px - Large headings */
    --text-4xl: 2.25rem;   /* 36px - Hero text */
}
```

## Font Weight Standards

### Weight Guidelines
- **400 (Regular)**: Body text, excellent readability
- **500 (Medium)**: Subheadings, good contrast
- **600 (Semi-bold)**: Headings, strong emphasis
- **700 (Bold)**: Main titles, maximum contrast

### Weight Usage by Element
```css
/* Body text */
body, p, .text-base {
    font-weight: 400;
}

/* Subheadings */
h4, .text-xl {
    font-weight: 500;
}

/* Headings */
h3, .text-2xl {
    font-weight: 600;
}

/* Main titles */
h1, h2, .text-3xl, .text-4xl {
    font-weight: 700;
}
```

## Line Height Standards

### Line Height Guidelines
- **1.25**: For headings (tight)
- **1.5**: For body text (WCAG recommended)
- **1.625**: For long-form content (relaxed)
- **2.0**: For maximum readability (loose)

### Implementation
```css
:root {
    --leading-tight: 1.25;     /* For headings */
    --leading-normal: 1.5;     /* For body text (WCAG recommended) */
    --leading-relaxed: 1.625;  /* For long-form content */
    --leading-loose: 2;        /* For maximum readability */
}
```

## Font Loading Optimization

### Preload Strategy
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></noscript>
```

### Font Face API Implementation
```javascript
if ('fonts' in document) {
    Promise.all([
        new FontFace('Inter', 'url(...)', { weight: '400' }),
        new FontFace('Inter', 'url(...)', { weight: '500' }),
        new FontFace('Inter', 'url(...)', { weight: '600' }),
        new FontFace('Inter', 'url(...)', { weight: '700' })
    ]).then(fonts => {
        fonts.forEach(font => document.fonts.add(font));
        document.body.classList.add('font-loaded');
    }).catch(() => {
        document.body.classList.add('font-loading');
    });
}
```

## Accessibility Features

### Focus Indicators
```css
*:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
    border-radius: 4px;
}

*:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
    border-radius: 4px;
}
```

### High Contrast Mode Support
```css
@media (prefers-contrast: high) {
    :root {
        --text-color: #000000;
        --bg-color: #ffffff;
        --accent-color: #0000ff;
    }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Files Updated

### HTML Files
- `index.html` - Main homepage
- `about.html` - About me page
- `gallery.html` - Project gallery
- `resources.html` - Resources page
- `case-studies/*.html` - All case study pages

### CSS Files
- `css/accessibility.css` - New accessibility-focused styles
- `style.css` - Updated with accessibility variables
- `css/resources.css` - Updated with accessibility variables

## Testing Checklist

### Font Loading
- [ ] Inter font loads correctly
- [ ] Fallback fonts work if Inter fails
- [ ] No layout shift during font loading
- [ ] Font weights display correctly

### Accessibility
- [ ] All text meets minimum 16px size requirement
- [ ] Line heights provide adequate spacing
- [ ] Focus indicators are visible
- [ ] High contrast mode works
- [ ] Reduced motion preferences respected

### Performance
- [ ] Fonts load quickly
- [ ] No blocking font requests
- [ ] Efficient fallback system
- [ ] Minimal layout shift

## Browser Support

### Modern Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Fallback Support
- All browsers get system fonts if Inter fails
- Graceful degradation maintained
- No broken layouts

## Maintenance

### Regular Checks
- Monitor font loading performance
- Verify accessibility compliance
- Update font files as needed
- Test across different devices

### Updates
- Keep Inter font version current
- Monitor for new accessibility features
- Update fallback fonts as needed
- Test with new browser versions

## Resources

### WCAG Guidelines
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Typography Best Practices](https://www.w3.org/WAI/tips/designing/#use-sufficient-color-contrast)

### Font Resources
- [Inter Font Family](https://rsms.me/inter/)
- [Google Fonts](https://fonts.google.com/)
- [Font Loading Best Practices](https://web.dev/font-display/)

### Testing Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/)
