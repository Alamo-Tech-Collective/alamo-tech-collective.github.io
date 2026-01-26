# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based website for the Alamo Tech Collective, a tech-exclusive hackerspace in San Antonio. The site features a cyberpunk-inspired aesthetic with animated elements and interactive components.

### Technology Stack
- **Jekyll 3.9.3** (via GitHub Pages gem) - Static site generator
- **Ruby** - Build system (via Bundler)
- **SCSS** - Styling with Jekyll's built-in compiler
- **JavaScript** - Text scramble animation, scroll-based header behavior
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- **GitHub Pages** - Deployment platform at https://alamotechcollective.com

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
- Cyberpunk-inspired design with dark background (#1d1d1d) and neon accents
- Color palette: Red (#d4675c), Cyan (#70e1e8), Yellow (#f7d55e)
- Typography:
  - Orbitron for headings and navigation
  - PixelOperator8 (custom font) for logo text
  - System fonts for body text
- Animated elements: Text scramble effect, glitch buttons, fade-in animations, hover border effects
- Responsive design using CSS Grid and Flexbox
- Interactive components with hover effects and clip-path shapes

### SCSS Organization
- `_variables.scss` - Color palette (cyberpunk theme), typography, spacing, breakpoints
- `_base.scss` - Reset and base element styles
- `_header.scss` - Sticky header with scroll-based hide/show behavior, red glow border effect
- `_btn.scss` - Cyberpunk-style buttons (.cyber-btn) with clip-path chamfered corners, glitch effects on hover, multiple variants (b-01, b-01_5, b-02, b-03)
- `_home.scss` - Homepage sections (hero with PixelOperator8 logo text, facts, photos, CTA) with cyberpunk styling, includes @font-face declaration
- `_about.scss` - About page styling
- `_blog.scss` - Blog page layout with sidebar, search, categories, and post cards
- `_footer.scss` - Footer styling with animated border-bottom on link hover (grows left to right)
- `_animations.scss` - Keyframe animations (fadeInBtn, glitch effects)

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
1. `_variables.scss` - Design tokens (cyberpunk color palette, fonts, spacing)
2. `_base.scss` - HTML element resets and defaults
3. `_header.scss` - Header with sticky positioning, scroll behavior, glow effects
4. `_btn.scss` - Interactive button components with glitch effects and animations
5. `_home.scss` - Homepage-specific layouts and styling
6. `_about.scss` - About page layouts and styling
7. `_blog.scss` - Blog page layouts and styling
8. `_footer.scss` - Footer styling with hover effects
9. `_animations.scss` - CSS animations and keyframes

### JavaScript Features
The site includes custom JavaScript in `assets/js/text.js`:
- **TextScramble**: Animated text reveal effect
  - Dynamic initialization via `data-scramble` attribute
  - Configuration options:
    - `data-scramble` - Text to scramble (required)
    - `data-scramble-delay` - Delay before starting (ms, default: 0)
    - `data-scramble-loop` - Whether to repeat (true/false, default: false)
    - `data-scramble-interval` - Loop interval (ms, default: 3000)
  - Usage: `<span data-scramble="YOUR TEXT"></span>`
- **Header Scroll Behavior**: Hides header when scrolling down >50px, shows when scrolling up >100px
- Uses requestAnimationFrame for smooth animations

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

### Key Design Components

#### Header
- Sticky positioning with smooth hide/show on scroll
- Red glow effect using box-shadow on `<hr>` element
- Active page highlighting (cyan color) on navigation links
- Orbitron font for logo and navigation

#### Cyberpunk Buttons (.cyber-btn)
- Custom clip-path for chamfered corners (angled edges)
- Glitch hover effect with animated cyan overlay (.cyber-btn__glitch)
- Hover state makes text transparent to reveal glitch animation
- Color-coded tags (B00, B01, B01_5, B02, B03) in bottom-right
- Multiple variants with different clip-path shapes:
  - `.btn` - Default variant
  - `.btn.b-01` - Variant with specific chamfered edge (11% bottom-left)
  - `.btn.b-01_5` - Variant with specific chamfered edge (10% bottom-left)
  - `.btn.b-02` - Variant with specific chamfered edge (9% bottom-left)
  - `.btn.b-03` - Variant with specific chamfered edge (7.9% bottom-left)
- Usage: `<button class="btn b-01"><a href="#" class="cyber-btn">TEXT<span aria-hidden>_</span><span aria-hidden class="cyber-btn__glitch">TEXT</span></a><span aria-hidden class="btn__tag">B01</span></button>`

#### Homepage Sections
- **Hero**:
  - Logo SVG with text scramble animation using PixelOperator8 font
  - Title, subtitle, and JOIN US button (b-00 variant)
- **Quick Facts**: Grid layout with yellow-bordered cards, hover lift effect
- **Photos**: Uniform image heights (200px) with object-fit: cover, yellow borders, hover lift effect
- **CTA**: Schedule tour button with cyan accent (b-02 variant)

#### Blog Page
- **Layout**: Two-column grid (340px sidebar + flexible main content)
- **Sidebar**:
  - "BLOGS" title with red glow separator
  - Search box with red border and clip-path styling
  - Categories list with hover effects and active state highlighting
  - Sticky positioning (top: 143px)
- **Main Content**:
  - Random ID with scramble effect
  - "# COMMIT_LOG" title with red glow separator
  - Blog post cards with:
    - Yellow borders with glow on hover
    - Black background
    - Post title (yellow text, blue on hover)
    - Meta information (date, author, categories)
    - Excerpt (truncated to 40 words)
    - "READ MORE" button (b-01 variant)
- **Interactive Features**:
  - Search functionality (filters by title, excerpt, or categories)
  - Category filtering with active state
  - Responsive design (single column on mobile)

#### Footer
- Hash (#) prefixes on all links for cyberpunk aesthetic
- Structured in 3 columns: Info (with red clip-path border), Get Started, Connect
- Animated border-bottom on link hover (grows from left to right with 0.3s transition)
- Horizontal rule separator with red glow effect

### Accessibility Features
The site includes WCAG AA compliance features:
- ARIA landmarks and labels
- Keyboard navigation support
- Screen reader support with aria-hidden attributes
- Semantic HTML structure