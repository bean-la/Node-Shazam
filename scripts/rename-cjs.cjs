"use strict";
/**
 * After tsc emits CJS to dist/cjs/*.js, renames them to *.cjs and updates
 * require() paths so Node treats the files as CommonJS (avoids ESM/CJS mismatch
 * when package has "type": "module").
 */
const fs = require("fs");
const path = require("path");

const distCjs = path.resolve(__dirname, "..", "dist", "cjs");

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full, out);
    } else if (e.name.endsWith(".js") && !e.name.endsWith(".d.ts")) {
      out.push(full);
    }
  }
}

const jsFiles = [];
walk(distCjs, jsFiles);

for (const jsPath of jsFiles) {
  let content = fs.readFileSync(jsPath, "utf8");
  content = content.replace(/require\("(\.\/[^"]+?)\.js"\)/g, 'require("$1.cjs")');
  const cjsPath = jsPath.replace(/\.js$/, ".cjs");
  fs.writeFileSync(cjsPath, content, "utf8");
  fs.unlinkSync(jsPath);
}

console.log("Renamed", jsFiles.length, "CJS files to .cjs");
