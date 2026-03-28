const fs = require('fs');
const { execSync } = require('child_process');

// Critical CSS line ranges (1-indexed) from style.css
const CRITICAL_RANGES = [
    [1, 107],     // Variables, reset, skip-link, html, body, container
    [269, 276],   // .glass
    [280, 502],   // Navbar, mobile nav, buttons
    [507, 700],   // Hero section
    [1046, 1140], // scroll-indicator, animate-in, slideUp, hero responsive
    [3195, 3215], // .reveal, .reveal.active
    [3703, 3715], // .magnetic-btn
    [5011, 5029], // @media (prefers-reduced-motion: reduce)
];

const cssLines = fs.readFileSync('style.css', 'utf8').split('\n');
let criticalCSS = '';
for (const [start, end] of CRITICAL_RANGES) {
    criticalCSS += cssLines.slice(start - 1, end).join('\n') + '\n\n';
}

fs.writeFileSync('critical.css', criticalCSS);
console.log(`Extracted critical CSS: ${(criticalCSS.length / 1024).toFixed(1)}KB`);

execSync('npx csso critical.css --output critical.min.css', { stdio: 'pipe' });
const minified = fs.readFileSync('critical.min.css', 'utf8');
console.log(`Minified critical CSS: ${(minified.length / 1024).toFixed(1)}KB`);

let html = fs.readFileSync('index.html', 'utf8');

const SYNC_LINK = '    <link rel="stylesheet" href="style.min.css">';
const MARKER_START = '<!-- CRITICAL CSS -->';
const MARKER_END = '<!-- /CRITICAL CSS -->';

const newBlock = `${MARKER_START}\n    <style>${minified}</style>\n    <link rel="preload" href="style.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="style.min.css"></noscript>\n    ${MARKER_END}`;

if (html.includes(MARKER_START)) {
    const re = new RegExp(MARKER_START.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '[\\s\\S]*?' + MARKER_END.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    html = html.replace(re, newBlock);
    console.log('Updated existing critical CSS block');
} else if (html.includes(SYNC_LINK)) {
    html = html.replace(SYNC_LINK, '    ' + newBlock);
    console.log('Replaced sync CSS link with critical CSS + async');
} else {
    console.log('ERROR: Could not find insertion point');
    process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');
fs.unlinkSync('critical.css');
fs.unlinkSync('critical.min.css');
console.log('Done!');
