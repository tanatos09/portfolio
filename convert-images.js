const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertImages() {
    const imgDir = path.join(__dirname, 'img');
    const dirs = ['motogarage', 'pubhouse', 'realityplus'];
    
    for (const dir of dirs) {
        const dirPath = path.join(imgDir, dir);
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.png'));
        
        for (const file of files) {
            const inputPath = path.join(dirPath, file);
            const outputPath = path.join(dirPath, file.replace('.png', '.webp'));
            
            const stats = fs.statSync(inputPath);
            
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            const newStats = fs.statSync(outputPath);
            const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
            console.log(`✅ ${dir}/${file} → .webp (${(stats.size/1024).toFixed(0)}KB → ${(newStats.size/1024).toFixed(0)}KB, -${savings}%)`);
        }
    }
    
    // Also optimize avatar if needed
    const avatarJpg = path.join(imgDir, 'avatar.jpg');
    if (fs.existsSync(avatarJpg)) {
        const avatarWebp = path.join(imgDir, 'avatar.webp');
        // Re-optimize the webp from the original jpg
        await sharp(avatarJpg)
            .webp({ quality: 80 })
            .resize(400, 400, { fit: 'cover' })
            .toFile(avatarWebp + '.tmp');
        
        const origSize = fs.statSync(avatarWebp).size;
        const newSize = fs.statSync(avatarWebp + '.tmp').size;
        
        if (newSize < origSize) {
            fs.renameSync(avatarWebp + '.tmp', avatarWebp);
            console.log(`✅ avatar.webp optimized (${(origSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB)`);
        } else {
            fs.unlinkSync(avatarWebp + '.tmp');
            console.log(`ℹ️ avatar.webp already optimal`);
        }
    }
}

convertImages().catch(console.error);
