/**
 * Minification build script
 * Minifies CSS and JS for production
 * 
 * Usage: node minify.js
 */

const fs = require('fs');
const path = require('path');
const { minify: terserMinify } = require('terser');

async function minifyJS() {
    const inputFile = path.join(__dirname, 'script.js');
    const outputFile = path.join(__dirname, 'script.min.js');
    
    const code = fs.readFileSync(inputFile, 'utf8');
    
    const result = await terserMinify(code, {
        compress: {
            drop_console: false,
            passes: 2,
            dead_code: true,
            unused: true
        },
        mangle: true,
        format: {
            comments: false
        }
    });
    
    fs.writeFileSync(outputFile, result.code);
    
    const origSize = Buffer.byteLength(code);
    const minSize = Buffer.byteLength(result.code);
    const savings = ((1 - minSize / origSize) * 100).toFixed(1);
    
    console.log(`✅ script.js → script.min.js (${(origSize/1024).toFixed(1)}KB → ${(minSize/1024).toFixed(1)}KB, -${savings}%)`);
}

async function minifyCSS() {
    const inputFile = path.join(__dirname, 'style.css');
    const outputFile = path.join(__dirname, 'style.min.css');
    
    // Simple CSS minification without external dep
    let css = fs.readFileSync(inputFile, 'utf8');
    
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove whitespace
    css = css.replace(/\s+/g, ' ');
    // Remove spaces around special chars
    css = css.replace(/\s*([{}:;,>~+])\s*/g, '$1');
    // Remove trailing semicolons before closing braces
    css = css.replace(/;}/g, '}');
    // Remove leading/trailing whitespace
    css = css.trim();
    
    fs.writeFileSync(outputFile, css);
    
    const origSize = Buffer.byteLength(fs.readFileSync(inputFile));
    const minSize = Buffer.byteLength(css);
    const savings = ((1 - minSize / origSize) * 100).toFixed(1);
    
    console.log(`✅ style.css → style.min.css (${(origSize/1024).toFixed(1)}KB → ${(minSize/1024).toFixed(1)}KB, -${savings}%)`);
}

async function main() {
    console.log('📦 Minifying assets...\n');
    
    try {
        await minifyCSS();
        await minifyJS();
        console.log('\n✅ Done! Update index.html to use .min.css and .min.js files for production.');
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

main();
