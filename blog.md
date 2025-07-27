---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-posts">
{% for post in site.posts %}
  <article class="blog-post-preview">
    <h2 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <div class="post-meta">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
      {% if post.author %} • by {{ post.author }}{% endif %}
      {% if post.categories and post.categories.size > 0 %}
        • 
        {% for category in post.categories %}
          <span class="category">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      {% endif %}
    </div>
    {% if post.excerpt %}
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    {% endif %}
    <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
  </article>
{% endfor %}
</div>

{% if site.posts.size == 0 %}
<p>No blog posts yet. Check back soon!</p>
{% endif %}