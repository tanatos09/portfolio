/**
 * Build script pro portfolio
 * Spojuje HTML sekce z src/sections/ do index.html
 * 
 * Použití: node build.js
 */

const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'src', 'sections');
const OUTPUT_FILE = path.join(__dirname, 'index.html');

// Získej všechny sekce seřazené podle čísla
function getSectionFiles() {
    const files = fs.readdirSync(SECTIONS_DIR)
        .filter(f => f.endsWith('.html'))
        .sort((a, b) => {
            const numA = parseInt(a.split('-')[0]);
            const numB = parseInt(b.split('-')[0]);
            return numA - numB;
        });
    
    return files;
}

// Načti a spoj všechny sekce
function buildHtml() {
    const sectionFiles = getSectionFiles();
    let html = '';
    
    console.log('📦 Spojuji sekce...\n');
    
    sectionFiles.forEach(file => {
        const filePath = path.join(SECTIONS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        html += content + '\n';
        console.log(`  ✅ ${file}`);
    });
    
    return html;
}

// Hlavní build funkce
function build() {
    console.log('🚀 Portfolio Build\n');
    console.log('='.repeat(40));
    
    try {
        const html = buildHtml();
        
        // Záloha původního souboru
        if (fs.existsSync(OUTPUT_FILE)) {
            const backupPath = OUTPUT_FILE.replace('.html', '.backup.html');
            fs.copyFileSync(OUTPUT_FILE, backupPath);
            console.log(`\n📋 Záloha: index.backup.html`);
        }
        
        // Zápis výsledku
        fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
        
        console.log('\n' + '='.repeat(40));
        console.log(`✨ Hotovo! Výstup: index.html`);
        console.log(`📊 Velikost: ${(Buffer.byteLength(html, 'utf8') / 1024).toFixed(2)} KB`);
        
    } catch (error) {
        console.error('❌ Chyba:', error.message);
        process.exit(1);
    }
}

build();
