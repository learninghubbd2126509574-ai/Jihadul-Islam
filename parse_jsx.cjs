const fs = require('fs');
const content = fs.readFileSync('src/components/JobDetailModal.tsx', 'utf8');
const openCount = (content.match(/<div[^>]*[^\/]*?(?<!\/)>/g) || []).length;
const closeCount = (content.match(/<\/div>/g) || []).length;
console.log('Open:', openCount, 'Close:', closeCount);

let d = 0;
content.split('\n').forEach((line, i) => {
  const o = (line.match(/<div[^>]*[^\/]*?(?<!\/)>/g) || []).length;
  const c = (line.match(/<\/div>/g) || []).length;
  d += o - c;
});
console.log('Depth:', d);
