# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based website for the Alamo Tech Collective, a tech-exclusive hackerspace in San Antonio. The site features a retro terminal/hacker aesthetic with green-on-black styling.

### Technology Stack
- **Jekyll 4.3.0** - Static site generator
- **Ruby** - Build system (via Bundler)
- **SCSS** - Styling with Jekyll's built-in compiler
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- **No JavaScript framework** - Pure static HTML/CSS

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
- Black background (#000) with green text (#0f0) for terminal aesthetic
- Monospace font (Courier New) throughout
- Matrix/hacker-style design with glowing green borders
- Responsive design using CSS Grid and Flexbox

### SCSS Organization
- `_variables.scss` - Color palette, typography, spacing, breakpoints
- `_base.scss` - Reset and base element styles
- `_layout.scss` - Header, footer, and page structure
- `_components.scss` - Buttons, hero, facts grid, CTA sections

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
1. Add files to `_posts/` directory (currently not implemented)
2. Name format: `YYYY-MM-DD-title.md`
3. Include post front matter

## Key Files to Understand

### Configuration
- `_config.yml` - Main Jekyll configuration (site title, URL, plugins, build settings)
- `Gemfile` - Ruby dependencies (Jekyll version, plugins)

### Content Structure
- All content pages use Markdown with YAML front matter
- Navigation is manually maintained in `_includes/header.html`
- No blog implementation yet despite `_posts/` directory existing

### Styling Architecture
The SCSS follows a modular approach:
1. `_variables.scss` - All design tokens (colors, fonts, spacing)
2. `_base.scss` - HTML element resets and defaults
3. `_layout.scss` - Major structural components
4. `_components.scss` - Reusable UI patterns

## Deployment

The site can be deployed to:
- GitHub Pages (automatic with proper repository settings)
- Any static hosting service (Netlify, Vercel, etc.)
- Traditional web hosting (upload `_site/` contents)

### Deployment Notes
- The `_site/` directory is gitignored
- No CI/CD configuration files present
- No environment-specific configurations beyond `JEKYLL_ENV`