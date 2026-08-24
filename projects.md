---
layout: default
title: Na čem dělám
permalink: /projects/
description: Aktuální projekty a oblasti, kterým se věnuju.
---

<article class="page">
  <header class="page__header">
    <h1 class="page__title">Na čem dělám</h1>
    <p class="page__lead">Ne portfolio. To, u čeho teď fakt sedím.</p>
  </header>

  <div class="wrap">
    <div class="project-list">
      {% assign projects = site.projects | sort: "order" %}
      {% for project in projects %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
  </div>
</article>
