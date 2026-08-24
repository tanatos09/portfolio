---
layout: default
title: Poznámky
permalink: /notes/
description: Krátké zápisky, které se do článku nevešly.
---

<article class="page">
  <header class="page__header">
    <h1 class="page__title">Poznámky</h1>
    <p class="page__lead">Krátké zápisky. Ne články. Spíš papírky přilepené k monitoru.</p>
  </header>

  <div class="wrap">
    <div class="article-grid">
      {% assign notes = site.notes | sort: "date" | reverse %}
      {% for note in notes %}
        {% include note-card.html note=note %}
      {% endfor %}
    </div>
  </div>
</article>
