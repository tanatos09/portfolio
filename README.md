# Tomáš Frank

Osobní technický blog. Statický web pro GitHub Pages.

## Lokálně

Potřebuješ Ruby 3.3+ a Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Otevři [http://127.0.0.1:4000](http://127.0.0.1:4000).

## Publikace

1. Pushni repo na GitHub.
2. V Settings → Pages nastav Source na **GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` postaví Jekyll a nasadí `_site`.
4. V `_config.yml` je `url: https://franktomas.cz`. Když poběžíš na `username.github.io/repo`, doplň `baseurl`.

## Nový článek

Soubor v `_posts/` ve tvaru `YYYY-MM-DD-nazev.md`:

```yaml
---
layout: post
title: "Název"
date: 2026-08-24
category: "Programování"
project: nedeljnic
excerpt: "Krátký popis."
image: "/assets/images/posts/soubor.webp"
reading_time: 8
---
```

Kategorie článků: `Programování`, `Kvalita`, `Kvalita × IT`, `Projekty`.

Filtr **Poznámky** na blogu / homepage bere kolekci `_notes/`, ne kategorii článku.

`project` je volitelné a musí sedět na `slug` projektu.

## Nová poznámka

Soubor v `_notes/`:

```yaml
---
layout: note
title: "Název"
number: "019"
date: 2026-08-24
excerpt: |
  **Tučný řádek**
  další řádek náhledu.
---
```

V `excerpt:` u poznámek funguje odřádkování a `**tučný text**` (jen v náhledu poznámek).

## Nový projekt

Soubor v `_projects/nazev.md` a `slug` ve front matter. Články se napojí přes `project: nazev`.
