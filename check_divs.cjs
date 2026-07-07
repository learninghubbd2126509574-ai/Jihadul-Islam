const fs = require('fs');
const content = fs.readFileSync('src/components/JobDetailModal.tsx', 'utf8');
let depth = 0;
const lines = content.split('\n');
lines.forEach((line, i) => {
  const openCount = (line.match(/<div/g) || []).length;
  const closeCount = (line.match(/<\/div/g) || []).length;
  if (openCount > closeCount) {
    depth += (openCount - closeCount);
    console.log(`${i+1}: ${'+'.repeat(openCount - closeCount)} ${depth} ${line.trim()}`);
  } else if (closeCount > openCount) {
    depth += (openCount - closeCount);
    console.log(`${i+1}: ${'-'.repeat(closeCount - openCount)} ${depth} ${line.trim()}`);
  }
});
console.log('Final depth:', depth);
