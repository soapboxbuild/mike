import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/lib/chatTools.ts', 'utf8');

// (Previously patched documents inserts to include filename, but documents.filename
// was dropped by the oss_schema_diff migration — filename now lives on document_versions,
// which the upstream code already handles correctly.)

writeFileSync('src/lib/chatTools.ts', c);
console.log('patched chatTools.ts');
