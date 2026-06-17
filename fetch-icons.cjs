const https = require('https');
const fs = require('fs');

const icons = {
  "finder.png": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png",
  "safari.png": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Safari_browser_logo.png",
  "photos.png": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Apple_Photos_Icon.png",
  "contacts.png": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Contacts_icon_%28macOS%29.png",
  "terminal.png": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png",
  "trash.png": "https://upload.wikimedia.org/wikipedia/commons/3/30/Trash_Icon.png"
};

fs.mkdirSync('./public/icons', { recursive: true });

Object.keys(icons).forEach(name => {
  const file = fs.createWriteStream(`./public/icons/${name}`);
  https.get(icons[name], {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  }, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name} (${fs.statSync(`./public/icons/${name}`).size} bytes)`);
    });
  }).on('error', err => {
    fs.unlink(`./public/icons/${name}`);
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
