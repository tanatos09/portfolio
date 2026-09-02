# Tomáš Frank

Osobní technický blog. Statický web pro GitHub Pages.

## Lokálně

Potřebuješ Ruby 3.3+ a Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Otevři [http://127.0.0.1:4000](http://127.0.0.1:4000).

Budoucí články (datum v budoucnosti) se lokálně nezobrazí. Náhled před vydáním:

```bash
bundle exec jekyll serve --future
```

## Publikace

1. Pushni repo na GitHub.
2. V Settings → Pages nastav Source na **GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` postaví Jekyll a nasadí `_site`.
4. V `_config.yml` je `url: https://franktomas.cz`. Když poběžíš na `username.github.io/repo`, doplň `baseurl`.
5. Články s budoucím datem se na webu nezobrazí. Workflow jednou denně znovu postaví web, takže článek vyjde v den uvedeném v `date` (půlnoc `Europe/Prague`). Stačí ho pushnout dopředu.

---

## Nový článek

Soubor: `_posts/YYYY-MM-DD-nazev.md`

**Název souboru je důležitý.** Jekyll bere jako článek jen soubory ve tvaru `2026-08-26-muj-clanek.md` (datum + pomlčka + slug). Bez pomlčky za datem se článek na webu neobjeví.

URL vznikne z slug části: `/blog/muj-clanek/` (viz `permalink: /blog/:title/` v `_config.yml`).

```yaml
---
layout: post
title: "Název článku"
date: 2026-08-26
category: "Programování"
project: nedelejnic
excerpt: "Krátký popis pro karty a sociální sítě."
image: "/assets/images/posts/soubor.webp"
image_alt: "Popis obrázku pro přístupnost."
reading_time: 5
demo: false
---
```

### Co se dá vyplnit u článku

| Pole | Povinné | Kde se zobrazí |
| --- | --- | --- |
| `layout: post` | ano | layout stránky článku |
| `title` | ano | karta, detail článku, `<title>`, Open Graph |
| `date` | ano (i z názvu souboru) | karta, meta u článku, řazení na blogu / homepage |
| `category` | ano (pro filtry) | karta, meta u článku, filtr „Zobrazit:“ na blogu / homepage |
| `excerpt` | doporučeno | text na kartě (zkrácený na 140 znaků), meta description / OG, když není `description` |
| `image` | doporučeno | cover na detailu, náhled na kartě, OG / Twitter image |
| `image_alt` | doporučeno | `alt` u obrázku, OG image alt |
| `reading_time` | ne | „X min čtení“ na kartě i na detailu; když chybí, počítá se automaticky (~180 slov / min) |
| `project` | ne | odkaz na projekt v meta u článku; související články dole; seznam článků na stránce projektu |
| `demo` | ne | při `true` žlutý banner „DEMO“ nahoře na stránce |
| `description` | ne | přepíše `excerpt` v meta description / OG (na webu se jinak neukáže) |

**Tagy (`tags` / `taggs`) web nepodporuje.** Nic se podle nich nefiltruje ani nezobrazuje. Vazba na projekt je jen přes `project:`.

### Kategorie článků

Přesně tyto názvy (včetně znaku ×):

- `Programování` → filtr `programovani` (včetně článků o konkrétních projektech + `project:`)
- `Kvalita` → filtr `kvalita`
- `Kvalita × IT` → filtr `kvalita-it`

Kategorie **Projekty** na blogu není. Vazba na produkt je jen přes `project:` a stránku `/projects/…`.

Filtr **Poznámky** na blogu / homepage bere kolekci `_notes/`, ne kategorii článku.

### Obrázky k článkům

1. Dej soubor do `assets/images/posts/`.
2. Ideálně **WebP**, cca **1400×933** (stejný formát jako ostatní cover).
3. V front matter: `image: "/assets/images/posts/nazev.webp"`.

### `reading_time`

- Ručně: `reading_time: 5` → „5 min čtení“.
- Bez pole: počet slov / 180, zaokrouhleno nahoru (min. 1).
- Orientace: krátký text ~2–3, běžný článek ~5–8, delší ~10+.

### `project`

Hodnota musí sedět na `slug` projektu v `_projects/` (např. `nedelejnic`, `qualityalibi`, `kvalita`).

Bez `project:` se článek neobjeví v „Související články“ na stránce projektu a u článku nebude odkaz na projekt.

Když má projekt **2 a více** článků se stejným `project:`, pod článkem se zobrazí navigace **← Předchozí / Další →** (řazeno podle data). Karty „Další z projektu“ až od 3. článku v sérii.

---

## Nová poznámka

Soubor: `_notes/nazev.md` (datum v názvu souboru **není** povinné; rozhoduje `date` ve front matter).

URL: `/notes/nazev/`.

```yaml
---
layout: note
title: "Název poznámky"
number: "1"
date: 2026-08-25
excerpt: |
  **Tučný řádek**
  další řádek náhledu.
demo: false
---
```

### Co se dá vyplnit u poznámky

| Pole | Povinné | Kde se zobrazí |
| --- | --- | --- |
| `layout: note` | ano | layout poznámky |
| `title` | ano | karta, detail, footer („Poslední poznámka“), `<title>` |
| `date` | ano | karta, meta na detailu, řazení |
| `number` | ne | „Poznámka #1“ na kartě i detailu; ve footeru `#1 — …` |
| `excerpt` | doporučeno | náhled na kartě (odřádkování + `**tučný text**`); bez něj se bere začátek těla |
| `reading_time` | ne | „X min čtení“ na detailu; jinak automaticky |
| `demo` | ne | banner „DEMO“ |
| `description` | ne | jen meta / OG |

Poznámky se ukazují:

- na homepage (v „Nejnovější“ + nejnovější v „Na čem dělám“)
- na `/blog/` (filtr Poznámky)
- na `/notes/`
- ve footeru jako „Poslední poznámka“

---

## Nový projekt

Soubor: `_projects/nazev.md`

URL: `/projects/nazev/` (z názvu souboru / `permalink`).

```yaml
---
layout: project
title: nedělejnic
slug: nedelejnic
status: VE VÝVOJI
icon: terminal
order: 1
lead: Krátký popis na kartě.
current_problem: Co právě řeším.
tech:
  - React
  - TypeScript
demo: false
---
```

### Co se dá vyplnit u projektu

| Pole | Povinné | Kde se zobrazí |
| --- | --- | --- |
| `layout: project` | ano | layout detailu |
| `title` | ano | karta, nadpis detailu |
| `slug` | ano (pro vazbu článků) | párování s `project:` u článků |
| `status` | doporučeno | štítek na kartě i detailu (`VE VÝVOJI`, `PRÁCE`, …) |
| `icon` | ne | ikona na kartě: `terminal` (`>_`), `gear` (⚙), `factory` (▣); jiné = `>_` |
| `order` | doporučeno | pořadí na homepage a `/projects/` (menší = výš) |
| `lead` | doporučeno | podnadpis na detailu + text na kartě |
| `current_problem` | ne | „Aktuálně řeším“ na kartě i detailu |
| `tech` | ne | sekce „Technologie“ na detailu (jen seznam) |
| `links` | ne | sekce „Odkazy“ na detailu projektu (ne na článcích) |
| `demo` | ne | banner „DEMO“ |

`links` je seznam na **stránce projektu** (repo, demo, web…). Na články se nekopírují — článek se napojí jen přes `project:`.

```yaml
links:
  - label: GitHub
    url: https://github.com/tanatos09/NedelejNic
  - label: Demo
    url: https://github.com/tanatos09/NedelejNic
```

Články s `project: <slug>` se na detailu projektu vypíšou jako „Související články“.

---

## Stránky (O mně, Kontakt, …)

Soubory v kořeni (`about.md`, `kontakt.md`, …) s `layout: page`.

| Pole | Kde se zobrazí |
| --- | --- |
| `title` | nadpis, menu (pevné odkazy), `<title>` |
| `permalink` | URL stránky |
| `description` | meta description / OG |
| `lead` | podnadpis pod H1 |
| `demo` | banner „DEMO“ |

Text stránky je tělo markdownu pod front matter.

---

## Kde se co bere na webu (přehled)

| Sekce webu | Zdroj |
| --- | --- |
| Homepage — Nejnovější | `_posts/` + `_notes/` (max 6) |
| Homepage — Na čem dělám | `_projects/` + nejnovější poznámka |
| Homepage — intro | pevný text v `index.html` |
| `/blog/` | všechny články + poznámky |
| `/notes/` | všechny poznámky |
| `/projects/` | všechny projekty |
| `/about/`, `/kontakt/` | `about.md`, `kontakt.md` |
| Footer — kategorie | `blog_categories` v `_config.yml` |
| Footer — poslední poznámka | nejnovější z `_notes/` |
| Menu | pevné odkazy v `_includes/header.html` |

Globální texty webu (`title`, `description`, `tagline`, `footer_note`, autor) jsou v `_config.yml`.
