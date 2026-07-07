const fs = require('fs');
const content = fs.readFileSync('src/components/JobDetailModal.tsx', 'utf8');
let depth = 0;
const lines = content.split('\n');
lines.forEach((line, i) => {
  const openCount = (line.match(/<div/g) || []).length;
  const closeCount = (line.match(/<\/div/g) || []).length;
  if (openCount > 0 || closeCount > 0) {
    console.log(`${i+1}: ${'  '.repeat(depth)}${line.trim()}`);
    depth += (openCount - closeCount);
  }
});
console.log('Final depth:', depth);
