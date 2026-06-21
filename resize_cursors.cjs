const fs = require('fs');
const Jimp = require('jimp');

const files = ['cursor.png', 'cursor-click.png', 'cursor-move.png', 'cursor-waiting.png'];

async function resizeImages() {
  for (const file of files) {
    const filePath = `./public/${file}`;
    if (!fs.existsSync(filePath)) {
      console.log(`${file} does not exist. Skipping.`);
      continue;
    }
    try {
      const image = await Jimp.read(filePath);
      const newWidth = Math.max(1, Math.floor(image.bitmap.width / 2));
      const newHeight = Math.max(1, Math.floor(image.bitmap.height / 2));
      
      await image.resize(newWidth, newHeight).writeAsync(filePath);
      console.log(`Resized ${file} to ${newWidth}x${newHeight}`);
    } catch (err) {
      console.error(`Error resizing ${file}:`, err);
    }
  }
}

resizeImages();
