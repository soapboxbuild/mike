import re, sys

content = open('src/lib/chatTools.ts').read()

# Fix 1: single-doc insert in generateDocx (line ~1295)
# Pattern: inside generateDocx, after uploadFile call, the documents insert missing filename
content = content.replace(
    "    const { data: docRow, error: docErr } = await db\n"
    "      .from(\"documents\")\n"
    "      .insert({\n"
    "        project_id: options?.projectId ?? null,\n"
    "        user_id: userId,\n"
    "        status: \"ready\",\n"
    "      })",
    "    const { data: docRow, error: docErr } = await db\n"
    "      .from(\"documents\")\n"
    "      .insert({\n"
    "        project_id: options?.projectId ?? null,\n"
    "        user_id: userId,\n"
    "        filename: filename,\n"
    "        status: \"ready\",\n"
    "      })"
)

# Fix 2: bulk insert in copy-documents handler (line ~3304)
content = content.replace(
    "            const docRows = filenames.map((fn) => ({\n"
    "              project_id: projectId,\n"
    "              user_id: userId,\n"
    "              status: \"ready\",\n"
    "            }));",
    "            const docRows = filenames.map((fn) => ({\n"
    "              project_id: projectId,\n"
    "              user_id: userId,\n"
    "              filename: fn,\n"
    "              status: \"ready\",\n"
    "            }));"
)

open('src/lib/chatTools.ts', 'w').write(content)
print("patched")
