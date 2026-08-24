---
layout: default
title: Blog
permalink: /blog/
description: Články z vývoje, kvality a věcí mezi tím.
---

<article class="page">
  <header class="page__header">
    <h1 class="page__title">Blog</h1>
    <p class="page__lead">Vývojový deník. Od nejnovějšího.</p>
  </header>

  <div class="wrap">
    <section aria-labelledby="blog-heading">
      <h2 id="blog-heading" class="visually-hidden">Články</h2>
      {% include filters.html %}
      <div class="article-grid" data-article-list>
      {% for post in site.posts %}
        {% include article-card.html post=post %}
      {% endfor %}
    </div>
    <p class="empty-filter" data-empty hidden>V této kategorii tu teď nic není.</p>
    </section>
  </div>
</article>
