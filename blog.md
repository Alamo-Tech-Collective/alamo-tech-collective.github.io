---
layout: page
title: Alamo Tech Collective - Blog
class: blog-content
description: Explore the latest insights, tutorials, and updates from Alamo Tech Collective's vibrant community of developers and digital creators. Stay informed about tech trends, coding tips, and upcoming events in San Antonio's leading hackerspace.
keywords: Alamo Tech Collective blog, San Antonio tech blog, developer insights, coding tutorials, tech news, hackerspace updates
permalink: /blog/
---

<div class="blog-container">
  <aside class="blog-sidebar">
    <h2 class="sidebar-title">BLOGS</h2>
    <hr />
    <div class="search-box">
    <i class="fa-sharp fa-solid fa-magnifying-glass search-icon"></i>
      <input type="text" id="search-input" placeholder="Search..." />
    </div>

    <div class="desktop categories">
      <h3>Categories</h3>
      <ul class="category-list">
        {% assign all_categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}
        {% for category in all_categories %}
          <li>
            <a href="#" class="category-link" data-category="{{ category }}">
              # {{ category | capitalize }}
            </a>
          </li>
        {% endfor %}
      </ul>
    </div>
  </aside>

  <main class="blog-main">
    <span  class="random-id">Random_id: <div data-scramble="4cb18073c6b7ac925e6a863a2799914f71159f6eec5ab66579c0db4ecd5713a2" class="data-scramble"></div>
    </span>
    <h2 class="blog-title"># COMMIT_LOG</h2>
    <hr />
    <div class="blog-posts" id="blog-posts">
      {% for post in site.posts %}
        <article class="blog-post-card" data-categories="{{ post.categories | join: ',' }}">
          <h2 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>
          <div class="post-meta">
            {{ post.date | date: "%B %d, %Y" }} • by {{ post.author | default: "Alamo Tech Collective" }} •
            {% for category in post.categories %}
              <span class="category-tag">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </div>
          <div class="post-excerpt">
            {{ post.excerpt | strip_html | truncatewords: 40 }}
          </div>
          <button class="btn b-01">
            <a href="{{ post.url | relative_url }}" class="cyber-btn">READ MORE<span aria-hidden>_</span>
            <span aria-hidden class="cyber-btn__glitch">READ MORE</span>
            </a>
            <span aria-hidden class="btn__tag">B01</span>
          </button>
        </article>
      {% endfor %}
    </div>

    {% if site.posts.size == 0 %}
      <p class="no-posts">No blog posts yet. Check back soon!</p>
    {% endif %}
  </main>
</div>

<script>
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const blogPosts = document.querySelectorAll('.blog-post-card');

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    blogPosts.forEach(post => {
      const title = post.querySelector('.post-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
      const categories = post.dataset.categories.toLowerCase();

      if (title.includes(searchTerm) || excerpt.includes(searchTerm) || categories.includes(searchTerm)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });

  // Category filter functionality
  const categoryLinks = document.querySelectorAll('.category-link');
  let activeCategory = null;

  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.dataset.category.toLowerCase();

      // Toggle active state
      if (activeCategory === category) {
        activeCategory = null;
        categoryLinks.forEach(l => l.classList.remove('active'));
        blogPosts.forEach(post => post.style.display = 'block');
      } else {
        activeCategory = category;
        categoryLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        blogPosts.forEach(post => {
          const postCategories = post.dataset.categories.toLowerCase();
          if (postCategories.includes(category)) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
      }
    });
  });
</script>