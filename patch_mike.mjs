import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/lib/chatTools.ts', 'utf8');

// Fix 1: single-doc insert in generateDocx
c = c.replace(
  `    const { data: docRow, error: docErr } = await db\n      .from("documents")\n      .insert({\n        project_id: options?.projectId ?? null,\n        user_id: userId,\n        status: "ready",\n      })`,
  `    const { data: docRow, error: docErr } = await db\n      .from("documents")\n      .insert({\n        project_id: options?.projectId ?? null,\n        user_id: userId,\n        filename: filename,\n        status: "ready",\n      })`
);

// Fix 2: bulk insert map using fn variable
c = c.replace(
  `            const docRows = filenames.map((fn) => ({\n              project_id: projectId,\n              user_id: userId,\n              status: "ready",\n            }));`,
  `            const docRows = filenames.map((fn) => ({\n              project_id: projectId,\n              user_id: userId,\n              filename: fn,\n              status: "ready",\n            }));`
);

writeFileSync('src/lib/chatTools.ts', c);
console.log('patched chatTools.ts');
