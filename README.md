# Alamo Tech Collective Website

A Jekyll-based website for the Alamo Tech Collective, San Antonio's tech-exclusive hackerspace.

## Prerequisites

- Ruby (version 2.5 or higher)
- Bundler gem (`gem install bundler`)

## Setup

1. Install Jekyll and dependencies:
   ```bash
   bundle install
   ```

2. Run the site locally:
   ```bash
   bundle exec jekyll serve
   ```

3. View the site at `http://localhost:4000`

## Structure

- `_layouts/` - Page templates
- `_includes/` - Reusable components (header, footer)
- `_sass/` - SCSS styling files
- `assets/` - Compiled CSS and static assets
- Pages: `index.md`, `about.md`, `hackerspace.md`, `get-involved.md`, `contact.md`

## Deployment

This site can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

For production builds:
```bash
bundle exec jekyll build
```

The built site will be in the `_site/` directory.

## Development

See `CLAUDE.md` for detailed development guidelines.