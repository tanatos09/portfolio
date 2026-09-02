---
layout: default
title: Blog
permalink: /blog/
description: Články z vývoje, kvality a věcí mezi tím.
---

<article class="page">
  <header class="page__header">
    <h1 class="page__title">Blog</h1>
    <p class="page__lead">Výroba, kód a věci mezi tím. Spíš deník než návod.</p>
  </header>

  <div class="wrap">
    <section aria-labelledby="blog-heading">
      <h2 id="blog-heading" class="visually-hidden">Články</h2>
      {% include filters.html %}
      <div class="article-grid" data-article-list>
      {% assign feed = site.posts | sort: "date" | reverse %}
      {% for item in feed %}
        {% include article-card.html post=item %}
      {% endfor %}
      {% assign notes = site.notes | sort: "date" | reverse %}
      {% for note in notes %}
        {% include note-card.html note=note %}
      {% endfor %}
    </div>
    <p class="empty-filter" data-empty hidden>V této kategorii tu teď nic není.</p>
    </section>
  </div>
</article>
