const fs = require('fs');
const path = require('path');

const cjsDir = './dist/cjs';

// Recursive function to process all files in directory and subdirectories
function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(itemPath);
    } else if (item.endsWith('.js')) {
      // Rename .js files to .cjs
      const newPath = itemPath.replace('.js', '.cjs');
      fs.renameSync(itemPath, newPath);
    }
  });
}

// Rename all .js files to .cjs (recursively)
processDirectory(cjsDir);

// Recursive function to update require statements in .cjs files
function updateRequireStatements(dir) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      updateRequireStatements(itemPath);
    } else if (item.endsWith('.cjs')) {
      // Update require statements in .cjs files
      let content = fs.readFileSync(itemPath, 'utf8');

      // Replace require('./filename.js') with require('./filename.cjs')
      content = content.replace(/require\(['"`]\.\/([^'"`]+)\.js['"`]\)/g, "require('./$1.cjs')");

      fs.writeFileSync(itemPath, content);
    }
  });
}

// Update require statements in .cjs files (recursively)
updateRequireStatements(cjsDir);

console.log('Renamed CommonJS files and updated require statements');