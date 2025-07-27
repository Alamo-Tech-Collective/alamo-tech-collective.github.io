# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based website for the Alamo Tech Collective, a tech-exclusive hackerspace in San Antonio. The site has transitioned from a retro terminal/hacker aesthetic to a modern, minimalist black-and-white design.

### Technology Stack
- **Jekyll 3.9.3** (via GitHub Pages gem) - Static site generator
- **Ruby** - Build system (via Bundler)
- **SCSS** - Styling with Jekyll's built-in compiler
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- **No JavaScript framework** - Pure static HTML/CSS
- **GitHub Pages** - Deployment platform at https://alamo-tech-collective.github.io

## Development Workflow

### Setup and Installation
```bash
bundle install
```

### Running the Site Locally
```bash
bundle exec jekyll serve
# Site will be available at http://localhost:4000
```

### Building for Production
```bash
bundle exec jekyll build
# Output will be in _site/ directory
```

### Other Useful Commands
```bash
# Clean build artifacts
bundle exec jekyll clean

# Build with drafts included
bundle exec jekyll serve --drafts

# Build with future-dated posts
bundle exec jekyll serve --future

# Production build with environment
JEKYLL_ENV=production bundle exec jekyll build
```

## Architecture & Design

### Jekyll Structure
- `_layouts/` - Page templates (default, home, page)
- `_includes/` - Reusable components (header, footer)
- `_sass/` - SCSS partials for styling
- `assets/` - Compiled CSS and static assets
- `_config.yml` - Site configuration
- Page content in Markdown files (index.md, about.md, etc.)

### Visual Style
- Modern minimalist design with black (#000) and white (#fff) color scheme
- System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)
- High contrast for accessibility (21:1 ratio)
- Responsive design using CSS Grid and Flexbox
- WCAG AA compliant with accessibility features

### SCSS Organization
- `_variables.scss` - Color palette (black/white/grays), typography, spacing, breakpoints
- `_base.scss` - Reset and base element styles
- `_layout.scss` - Header, footer, navigation, and page structure
- `_components.scss` - Buttons, hero sections, fact grids, CTA sections
- `_accessibility.scss` - WCAG compliance features (skip links, focus states, screen reader support)
- `_home-minimal.scss` - Homepage-specific minimal styling
- `_minimal-override.scss` - Override styles for the minimal theme

## Common Tasks

### Adding a New Page
1. Create a new `.md` file in the root directory
2. Add front matter with layout, title, and permalink
3. Write content in Markdown
4. Add to navigation in `_includes/header.html` if needed

### Modifying Styles
1. Edit SCSS files in `_sass/` directory
2. Variables are centralized in `_variables.scss`
3. Jekyll will automatically compile SCSS on save

### Updating Site Configuration
Edit `_config.yml` for:
- Site title, email, description
- Social media links
- Build settings
- Plugin configuration

### Creating Blog Posts
1. Add files to `_posts/` directory
2. Name format: `YYYY-MM-DD-title.md`
3. Include post front matter with required fields:
   - layout: post
   - title: "Post Title"
   - date: YYYY-MM-DD
   - categories: [community, accessibility, open-source]
   - author: "Author Name"
   - attendees: number (optional, for meetup posts)

## Key Files to Understand

### Configuration
- `_config.yml` - Main Jekyll configuration (site title, URL, plugins, build settings)
- `Gemfile` - Ruby dependencies (Jekyll version, plugins)

### Content Structure
- All content pages use Markdown with YAML front matter
- Navigation is manually maintained in `_includes/header.html`
- Blog posts use categories for URL structure: /category/subcategory/year/month/day/title.html
- Homepage uses custom layout with configurable hero, facts, and CTA sections

### Styling Architecture
The SCSS follows a modular approach:
1. `_variables.scss` - All design tokens (colors, fonts, spacing)
2. `_base.scss` - HTML element resets and defaults
3. `_layout.scss` - Major structural components
4. `_components.scss` - Reusable UI patterns

## Deployment

The site is configured for GitHub Pages deployment at https://alamo-tech-collective.github.io

### GitHub Pages Configuration
- Uses `github-pages` gem (v228) for compatibility
- `baseurl` is empty (deploying to root domain)
- `url` is set to `https://alamo-tech-collective.github.io`
- Automatic deployment on push to main branch

### Deployment Notes
- The `_site/` directory is gitignored
- Jekyll version locked to 3.9.3 (GitHub Pages requirement)
- All plugins must be GitHub Pages compatible
- Use `JEKYLL_ENV=production` for production builds

## Architecture Notes

### Page Front Matter Structure
Pages support extensive front matter for SEO and content configuration:
- `title`: Page title for SEO
- `description`: Meta description
- `keywords`: SEO keywords
- `permalink`: Custom URL path
- Homepage specific: `hero_title`, `hero_subtitle`, `hero_cta_text`, `hero_cta_link`, `quick_facts`, `mission_text`, `cta_*` fields

### Accessibility Features
The site includes comprehensive WCAG AA compliance:
- Skip navigation links
- ARIA landmarks and labels
- High contrast ratios (21:1 for white on black)
- Keyboard navigation with visible focus indicators
- Screen reader support with `.sr-only` utility class
- Minimum touch target sizes (44x44px)
- Support for prefers-reduced-motion and high-contrast mode