---
layout: post
title: "[DEMO] Databáze navržená blbě"
date: 2026-08-12
category: "Programování"
excerpt: "Tři hodiny práce a jeden cizí klíč, který neměl existovat. Pak nový začátek."
image: "/assets/images/posts/programovani.webp"
image_alt: "Notebook s editorem kódu na stole."
reading_time: 5
demo: true
---

Tento článek je **ukázkový**.

## Jak to dopadlo

Udělal jsem tabulky podle toho, jak mi to znělo v hlavě. Ne podle toho, jak se s daty bude pracovat.

Pak jsem potřeboval jednu historii. A zjistil jsem, že ji z tohohle modelu nedostanu, ani kdybych se na ni díval hodinu.

## Co s tím

Zahodit. Ne „ještě jeden sloupec“. Zahodit.

```sql
CREATE TABLE gauges (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);
```

Až bude skutečný problém, napíšu ho sem i s tím, proč první návrh nefungoval.
