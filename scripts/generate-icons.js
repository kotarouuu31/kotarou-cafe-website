const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = path.join(__dirname, '../public/icons/icon.svg');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  console.log('PWA用アイコンを生成中...');
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(inputSvg)
        .resize(size, size)
        .png({
          quality: 100,
          compressionLevel: 6
        })
        .toFile(outputPath);
      
      console.log(`✓ ${size}x${size} アイコンを生成しました`);
    } catch (error) {
      console.error(`✗ ${size}x${size} アイコンの生成に失敗しました:`, error.message);
    }
  }
  
  console.log('アイコン生成完了！');
}

generateIcons().catch(console.error);
