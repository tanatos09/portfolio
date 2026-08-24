---
layout: default
title: S čím dělám
permalink: /projects/
description: Aktuální projekty a oblasti, kterým se věnuju.
---

<article class="page">
  <header class="page__header">
    <h1 class="page__title">S čím dělám</h1>
    <p class="page__lead">Ne portfolio. To, na čem teď fakt sedím.</p>
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
