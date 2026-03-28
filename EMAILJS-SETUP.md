# Návod na aktivaci kontaktního formuláře s EmailJS

## ✅ TO JE HOTOVÉ
Formulář **už funguje v testovacím režimu** - můžete ho vyzkoušet a uvidíte data v alert okně.

## 📧 JAK NASTAVIT REÁLNÉ ODESÍLÁNÍ EMAILŮ

### Krok 1: Registrace na EmailJS (zdarma)
1. Jděte na: https://www.emailjs.com/
2. Klikněte **Sign Up** (lze přes Google účet)
3. Potvrďte email

### Krok 2: Přidání Email služby
1. V dashboardu klikněte **Email Services** → **Add New Service**
2. Vyberte **Gmail** nebo **Seznam.cz** (doporučuji Gmail)
3. Přihlaste se k vašemu emailu (franktomas@seznam.cz)
4. Zkopírujte **Service ID** (např. `service_abc123`)

### Krok 3: Vytvoření Email šablony
1. Klikněte **Email Templates** → **Create New Template**
2. Nastavte:
   - **Template Name**: `Portfolio Contact Form`
   - **Subject**: `Nová poptávka: {{project}}`
   - **Content** (zkopírujte tento text):

```
Nová poptávka z webu
=====================

KONTAKTNÍ ÚDAJE:
Jméno: {{name}}
Email: {{email}}

PROJEKT:
Typ: {{project}}
Rozpočet: {{budget}}

ZPRÁVA:
{{message}}

---
Odpovězte na: {{email}}
```

3. V **Settings**:
   - **To Email**: `{{to_email}}` (nebo přímo `franktomas@seznam.cz`)
   - **From Name**: `Portfolio Web`
   - **Reply To**: `{{email}}`
   
4. Zkopírujte **Template ID** (např. `template_xyz789`)

### Krok 4: Získání Public Key
1. V dashboardu jděte na **Account** → **General**
2. Zkopírujte **Public Key** (např. `abcDEF123xyz`)

### Krok 5: Aktualizace kódu
Otevřete soubor **index.html** a na řádku **38** změňte:

```javascript
publicKey: "YOUR_PUBLIC_KEY", // Změňte na váš Public Key
```

na:

```javascript
publicKey: "abcDEF123xyz", // Váš skutečný Public Key
```

Pak otevřete **script.js** a na **řádku 750** odkomentujte:

```javascript
// await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
```

Změňte na:

```javascript
await emailjs.send('service_abc123', 'template_xyz789', formData);
```

A **SMAŽTE** tyto testovací řádky (753-756):
```javascript
// Pro testování - simulace úspěchu po 1 sekundě
await new Promise(resolve => setTimeout(resolve, 1000));
```

A **SMAŽTE** i alert s testovacími daty (762-767).

## 🎉 HOTOVO!

Formulář teď posílá opravdové emaily na **franktomas@seznam.cz** zdarma (až 200 emailů/měsíc).

## 💡 TESTOVÁNÍ
1. Otevřete **index.html** v prohlížeči
2. Vyplňte formulář
3. Klikněte **Odeslat zprávu**
4. Email by měl dorazit do **1 minuty**

## ⚠️ POZNÁMKY
- EmailJS je **zdarma** do 200 emailů měsíčně
- Nepotřebujete PHP server
- Funguje i na GitHub Pages
- Email dorazí i se správným Reply-To adresou

---

**Potřebujete pomoc?** Napište mi na franktomas@seznam.cz
