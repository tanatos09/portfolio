---
layout: post
title: "Chtěl jsem jen projekt do portfolia. Teď mám problém."
date: 2026-09-01
category: "Programování"
project: nedelejnic
excerpt: "Kocovina, gauč a nápad na hru, ve které se nemá nic dělat. Chtěl jsem tři levely do portfolia. Mám engine, dabing a plán na demo. A pořád nevím, jestli je to blbost nebo byznys."
image: "/assets/images/posts/lenovontb.webp"
image_alt: "Lenovo ThinkPad T14s s otevřeným editorem kódu."
reading_time: 12
demo: false
---

Víkend.

Kocovina, jako kdybych zapil absint vodkou a pak mě přes noc zpátečkou přejel pásový traktor. A ráno mi ještě přišla faktura za naftu.

Ležel jsem na gauči. Nedělal nic.

Aspoň v tom jsem byl opravdu dobrý.

Ani pro pivo jsem nešel do lednice. Pivo na vyprostění by znamenalo vstát, dojít, otevřít — a to byl plán na minimálně tři kroky víc, než jsem byl ochotný řešit.

Takže jsem ležel. Přemýšlel. A pak mě napadlo:

> Nebyla by sranda sledovat lidi, jak trpí kocovinou?

Chvíli jsem nad tím přemýšlel. Pak mi došlo, že bych sledoval jen člověka, jak leží a přemýšlí, proč existuje.

Což je vlastně můj běžný víkendový program i bez kocoviny.

Tahle myšlenka měla zůstat v zapomnění.

Tam, kam patří většina moudrých nápadů z kocoviny.

Jenže neposlouchala.

> Co kdyby existovala hra, ve které je cílem nedělat nic?

---

## V té době jsem hledal projekt

Ne z noblesních důvodů. Potřeboval jsem něco vytvořit.

Za sebou jsem měl pár let, kdy se toho moc nepovedlo. Rekvalifikační kurz na programování. Rok na neschopence s kolenem. Živnost jako zámečník a programátor — skvělá kombinace, která fungovala přesně tak dobře, jak zní. Pak konec živnosti a návrat na kontrolu kvality, odkud jsem původně utíkal.

Programování mě ale nepustilo. A já pořád doufám, že mě jednou bude živit — jen zatím živí výroba a já po večerech sedím u klávesnice jako u druhé směny, která se nevyplácí.

Takže jsem hledal projekt. Něco na čem si vyzkouším Node.js a React. Něco, co dokončím. Ideálně ještě za svého života.

Měl jsem za sebou pár pokusů. Některé byly technicky zajímavé. Některé dokonce fungovaly. Což je bohužel ještě neudělalo hotovými.

Všechny skončily ve složce s názvem, který by mohl vyhrát literární soutěž:

`projekt_final_v2_oprava_final_fakt_tentokrat_final`

Takže jsem hledal něco, u čeho nebude tolik vadit, když to nedodělám. Nejlíp něco, co stejně nikdo nebude potřebovat — pak na tom aspoň nezáleží.

---

## Hrozný nápad. Což je dobré znamení.

Normální nápady jsem už zkoušel. Tak proč to nezkusit jinak?

Hra, ve které je cílem nedělat nic. Kde tě hra nutí něco dělat — a ty musíš odolat. Kde každé zbytečné pohnutí může být chyba.

Původní plán byl skromný. Pár levelů. Naučit se technologie. Nahodit to někam. Poslat to pár lidem, co mi ještě nezablokovali kontakt.

Možná se tomu někdo zasměje. Možná ne. V té fázi mi to bylo dost jedno.

Plán byl dokonalý.

Což znamenalo, že neměl šanci přežít první týden.

---

## Proč zrovna nicnedělání

Pracuju jako THP na oddělení kvality v průmyslu.

Pro ty, co nevědí, co to znamená — znamená to řešit chyby jiných lidí. Komunikovat s lidmi přesvědčenými, že kontrolor celý den nic nedělá a pije kafe. A pak psát zprávy o tom, proč se to celé dojebalo.

Krásná práce. Opravdu.

Jednou jsem si říkal, že by stála za to hra o tom. Simulátor kontrolora kvality. Sedíš u pásu, schvaluješ díly, řešíš sračky druhých a pomalu ztrácíš vůli žít. Jenže simulátor kontrolora je desktopová aplikace, desktopové aplikace jsem nikdy nedělal, a tohle nebyla správná nálada na začínání něčeho nového.

Nápad zůstal v hlavě. Pocit, že práce vypadá jako nic a přitom tě pomalu zabíjí, zůstal ve výrobě.

V kvalitě platí jedno nepsané pravidlo: nejlepší den je ten, kdy se nic nestane. Jakmile někdo něco posere, začne se to řetězit. Jedna věc za druhou. Najednou řešíte věci z minulého týdne a nikdo vám nedá pokoj.

Hra o nicnedělání dávala najednou smysl. A to myslím vážně.

---

## Neměl jsem peníze

Jakmile jsem měl nápad, narazil jsem na realitu.

Jsem normální člověk s normální výplatou. Nemám investora. Nemám budget. A nemám chuť vysvětlovat bance, proč potřebuju server na nicnedělání.

Takže jsem si změnil otázku. Ne *co postavit*, ale *jak to provozovat tak levně, aby to nebyl další finanční projekt s názvem katastrofa.*

Začal jsem přemýšlet nad architekturou. A pak mi došlo něco nepříjemného — většina hry vlastně nepotřebuje server.

Je to jako večer v hospodě. Hospoda je to místo, kde se věci dějí „na dálku“. Ty jsi host, co chce hlavně klid. Objednáš si pivo, číšník ti ho přinese. Pak si ho v klidu vypiješ, popovídáš si, vyřešíš světové problémy — a teprve když je sklenice prázdná, padá další objednávka. A zase ti ji přinesou. Víc hospoda od tebe nepotřebuje.

To důležité se neděje u výčepu. Děje se to u tebe, mezi jednotlivými pivy.

U hry je to stejné. Na začátku kola jednou řekneš, že chceš hrát — a dostaneš, co potřebuješ. Na konci kola jednou pošleš výsledek — a dostaneš potvrzení, že to přišlo. Mezi tím nikdo neřeší každý tvůj pohyb, každé kliknutí, každé zablikání. Celá hra běží u tebe.

Najednou jsem měl systém, který by zvládl tisíce hráčů, aniž by mě to finančně zabilo.

A tehdy mi to docvaklo. Nešlo už o to, ušetřit pár korun na serveru. Šlo o to, že jsem najednou neměl výmluvu, proč to neudělat větší, než jsem chtěl.

Projekt do portfolia se v tu chvíli tiše překlopil na něco jiného.

---

## Hospodský plán

Když jsem měl základ a pár testovacích levelů, poslal jsem nápad několika kamarádům.

Většina se nevyjádřila. Nebo napsala „jo“ a od té doby jsme si ani nepsali. Jeden jediný se do toho pustil.

Nulové programování. Žádné zkušenosti s vývojem her. Za to spousta šílených nápadů, které by nikdo normální do hry nechtěl. Přesně ten typ člověka, kterého potřebuješ, když už ti začíná připadat, že tvůj nápad dává smysl.

Sešli jsme se v místní restauraci. Pár lahváčů doma dopředu, protože do hospody se přece nechodí na lačno a hospodské pivo za šedesát pak chutná líp, když na to máte základ. Pracovní meeting. Dalo se tomu tak říkat.

Za večer sedm piv — byli jsme tam pracovně, tak jsme to nepřehnali — a několik diskuzí o tom, jestli konkrétní nápad je geniální nebo naprostý nesmysl, jsme měli osnovu prvních deseti levelů. Pevný řád. Smysluplný příběh. První náznaky toho, co se bude dít. Většina těch nápadů patřila do koše. Několik ne.

Zapsal jsem vše do sešitu.

Pak jsme šli domů. Já jsem se dorazil lahváčem z lednice.

Ráno jsem sešit chvíli nemohl najít. Když jsem ho konečně vytáhl, většinu zápisků jsem nepřečetl. Čmáranice. Věty, které dávaly smysl jen proto, že jsem věděl, co tam mělo být.

Z toho, co šlo přečíst, co si vzpomenu, nebo co si klidně domyslím, jsem poskládal použitelný plán. Některé věci, co jsme ten večer sesmolili, budou v demu. Možná i ve finální verzi. Netuším proč zrovna ty.

To byl asi první moment, kdy mi došlo, že tohle už není jen můj blbý nápad z gauče. Někdo další do toho vložil čas. A to je horší, než když to necháš ležet jen u tebe.

---

## Kdy se z malé hry stal vlastní engine

Začal jsem psát levely jeden po druhém. Fungovalo to — dokud jsem nezačal psát stejnou věc potřetí, čtvrté, páté. Opakující se struktury. Opakující se logika. Opakující se pocit, že znovu píšu kód, který už jednou fungoval.

Jsem líný kvalitář. Nechce se mi dělat věci dvakrát, když je můžu udělat jednou a pak už jen kopírovat. Jenže tady kopírování znamenalo kopírovat kód — a to je přesně ta práce, kvůli které jsem utekl do programování.

Uvědomil jsem si, že bych tam uživil vlastní engine. Nikdy jsem nic takového nedělal. Ale situace si to vyžádala víc, než by rozumný člověk u projektu do portfolia toleroval.

Tak jsem přepsal celou aplikaci od základu — ne kvůli jiným technologiím, pořád TypeScript, Node.js, Express, React. Jen aby to tahalo z enginu, ne aby každý level žil vlastním životem.

Fungovalo to. Engine byl brutální — v dobrém i špatném smyslu slova. Levely se najednou daly skládat jednoduše. Tak jednoduše, že jsem začal přemýšlet o grafickém editoru levelů, ne jen o ručně psaném JSONu. Což je úroveň, na kterou jsem rozhodně nechtěl dojít u projektu, který měl být hotový za víkend.

A pak mi došlo něco horšího.

Problém už nebude v kódu. Programování je skoro u konce. Základní testy taky. Teď musím vymýšlet, tvořit, nadabovat a hlavně komplet otestovat jednotlivé levely. A z toho se kurva poseru.

A tehdy mi došlo, jak velký projekt jsem na sebe vzal. Ne kvůli enginu — ten běží. Kvůli zbytku. Hra už není „projekt, co možná dodělám“. Je to desítky levelů, které musí někdo vymyslet, nadabovat a třikrát otestovat, než to pustí ven. A to všechno mezi směnou ve výrobě a životem, který se nedá odložit do backlogu.

Logický člověk by v tu chvíli začal makat.

Já jsem si dal pauzu.

---

## Jak jsem půl roku skoro nic neudělal

Pauza trvala asi půl roku.

Nová práce. Stěhování. Rodina. Chata. Zahrada. Do toho skočilo najednou víc věcí, než se vejde do jednoho odstavce — a většina z nich měla vyšší prioritu než hra, kterou zatím nikdo nečeká.

Jenže nešlo jen o čas. Bavil mě ten projekt, dokud šlo přemýšlet a programovat. Nápady na levely by i byly. Jenže mezitím se ukázalo, co všechno k hře patří kromě kódu — a to už je úplně jiná práce.

Časování dabingu. Přepisování textů, protože věta, která vypadá dobře na papíře, zní v nahrávce jako hovno na talíři. Kontrola, jestli level dává smysl i po třetím průchodu. Věci, které se musí dělat podle návodu, krok za krokem, bez momentu, kdy ti něco v hlavě cvakne a najednou to funguje.

Výroba. Ne vymýšlení.

Takže jsem někdy neměl čas. Někdy neměl náladu. Někdy měl obojí — a šel jsem místo toho na pivo, pak na druhé, a z večera, kdy jsem měl sedět u dabingu, byl večer u seriálu. Někdy mě zase chytila nemoc jménem kocovina. Léčba pivem pak trvala do druhého dne.

Ironický kruh.

Hra o nicnedělání. A půl roku jsem na obsahu skoro nic neudělal. Jako kdybys šel na pohovor do ministerstva nicnedělání.

> **Ministerstvo nicnedělání**
>
> — Je pravda, že jste tento měsíc jste na projektu neudělal nic?
>
> — Ano.
>
> — A minulý měsíc taky nic?
>
> — Ano.
>
> — Výborně — koncept zvládáte dokonale. Škoda, že jste projekt chtěl i dodělat.

Ne proto, že bych neměl nápady. Výroba prostě nebaví jako kód — a disciplínu na ni nemám.

Ale projekt žije. Engine běží. Ministerstvo nicnedělání by bylo spokojené. Já míň.

---

## Kde jsem teď

Mám pevný základ. Engine, první levely s dabingem, plán na padesát levelů pro první demo — a kód, na který si troufám říct, že na první spuštění není špatný. Možná dokonce dobrý. To si říkám hlavně proto, abych nemusel přemýšlet o zbytku.

Plán. Ne hotové levely. Rozdíl je větší, než by člověk čekal, když mu jeden level technicky jde nasadit za odpoledne.

Programování je skoro u konce. Základní testy taky. Co zbývá, je lidská síla — projít každý level, nadabovat, přepsat, znovu nadabovat, sladit časování, otestovat, najít, co nesedí, opravit, znovu otestovat. Podle návodu. Opakovaně. Bez pocitu, že stavíš něco nového. Spíš že něco dokončuješ.

Engine to zjednodušil. Nepřenesl to na mě.

A mám kámoše z hospody, co do toho dal večery a nápady, i když kód nenapsal ani řádku.

Tohle už není projekt do portfolia, co nahodíš na GitHub a pošleš třem lidem. Je to hra. Se systémem, závazkem a frontou práce, která vypadá jako výroba — jen bez pásky na zemi a bez kolegy, co ti řekne, že máš špatně vyplněný formulář.

Nevím, jestli z toho bude hotové demo, nebo jednou něco víc. Živnost. Lidi, co by na tom chtěli pracovat. Peníze odjinud. Možná nic z toho.

Chtěl jsem malý projekt do portfolia.

Místo toho mám engine, hromadu práce, která není programování, a pořád otevřenou otázku, jestli to vůbec dává smysl.

Ale v tuhle chvíli už je trochu pozdě to řešit.
