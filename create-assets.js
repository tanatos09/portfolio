const sharp = require('sharp');

async function createAssets() {
    // Create a simple TF favicon (32x32)
    const faviconSvg = '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="32" height="32" rx="6" fill="#0a0a0b"/>' +
        '<text x="16" y="23" font-family="Arial,sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#6366f1">TF</text>' +
        '</svg>';
    
    await sharp(Buffer.from(faviconSvg))
        .png()
        .toFile('favicon.ico');
    console.log('Created favicon.ico');

    // Create apple-touch-icon (180x180)
    const appleSvg = '<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="180" height="180" rx="36" fill="#0a0a0b"/>' +
        '<text x="90" y="115" font-family="Arial,sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="#6366f1">TF</text>' +
        '</svg>';
    
    await sharp(Buffer.from(appleSvg))
        .png()
        .toFile('apple-touch-icon.png');
    console.log('Created apple-touch-icon.png');

    // Create OG image (1200x630)
    const ogSvg = '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="1200" height="630" fill="#0a0a0b"/>' +
        '<text x="600" y="260" font-family="Arial,sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#ffffff">Tomas Frank</text>' +
        '<text x="600" y="350" font-family="Arial,sans-serif" font-size="36" text-anchor="middle" fill="#6366f1">Jednoduche weby pro male podnikatele</text>' +
        '<text x="600" y="420" font-family="Arial,sans-serif" font-size="28" text-anchor="middle" fill="#8b8b94">franktomas.cz</text>' +
        '</svg>';
    
    await sharp(Buffer.from(ogSvg))
        .jpeg({ quality: 85 })
        .toFile('img/og-image.jpg');
    console.log('Created img/og-image.jpg');
}

createAssets().catch(console.error);
