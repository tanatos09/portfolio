---
layout: post
title: "[DEMO] Jak vznikal nedeljnic"
date: 2026-08-24
category: "Projekty"
project: nedeljnic
excerpt: "První kroky projektu. Nic hotového, spíš rozhodnutí, která jsem udělal dřív, než jsem měl nárok je dělat."
image: "/assets/images/posts/nedeljnic.webp"
image_alt: "Zápisník se skicami rozhraní a notebook na stole."
reading_time: 8
tags:
  - nedeljnic
  - django
demo: true
---

Tento článek je **ukázkový**. Není to skutečný vývojový zápis.

## Proč tenhle projekt existuje

Měl jsem v hlavě problém. A Excel, který ho předstíral, že řeší.

Tak jsem začal stavět vlastní věc. Ne proto, že to je „inovativní“. Proto, že mě štvalo, že to pořád nikdo neudělal pořádně.

## První rozhodnutí

Než jsem napsal první model, už jsem měl tři názory na databázi. Dva z nich byly špatně. Ten třetí taky, jen jsem na to přišel později.

> Tady jsem zjistil, že jsem si databázi navrhl úplně blbě. Tři hodiny práce v prdeli. Takže jsem to zahodil a udělal znovu.

## Co z toho plyne

- Nejdřív problém, pak tabulky.
- Když model drhne, je lepší ho zahodit než ho týden opravovat.
- Deník je od toho, aby bylo vidět, kde jsem se sekl.

```python
class Thing(models.Model):
    name = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
```

Tohle je jen ukázka, že články umí kód. Skutečný kód z projektu sem přijde, až bude o čem psát.
