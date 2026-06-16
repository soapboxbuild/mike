import { readFileSync, writeFileSync } from 'fs';

// 1. Inject Resend invite helper into projects.ts
let p = readFileSync('src/routes/projects.ts', 'utf8');

// Add Resend import after existing imports
p = p.replace(
  `export const projectsRouter = Router();`,
  `export const projectsRouter = Router();

async function sendInviteEmails(
  inviterEmail: string,
  inviterName: string,
  projectName: string,
  newEmails: string[],
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || newEmails.length === 0) return;
  const mikeUrl = process.env.FRONTEND_URL ?? "https://legal.soapbox.build";
  await Promise.allSettled(
    newEmails.map((to) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: \`Bearer \${apiKey}\`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Mike Legal <mike@agents.soapbox.build>",
          to,
          subject: \`\${inviterName || inviterEmail} shared a project with you on Mike\`,
          html: \`<p>Hi,</p>
<p><strong>\${inviterName || inviterEmail}</strong> has shared the project <strong>\${projectName}</strong> with you on <a href="\${mikeUrl}">Mike Legal</a>.</p>
<p><a href="\${mikeUrl}" style="background:#0f172a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:8px;">Open Mike</a></p>
<p style="color:#6b7280;font-size:13px;margin-top:16px;">You'll need an account to access the project. If you don't have one yet, sign up at the link above.</p>\`,
        }),
      })
    )
  );
}`
);

// In PATCH handler: fetch previous shared_with, diff it, call sendInviteEmails
// Find the point after the access check and before the update — inject before the db.from("projects").update
p = p.replace(
  `  const db = createServerSupabase();
  const { data, error } = await db
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", userId)
    .select("*")
    .single();
  if (error || !data)
    return void res.status(404).json({ detail: "Project not found" });`,
  `  const db = createServerSupabase();

  // Capture previous shared_with so we can email newly-added members
  let prevSharedWith: string[] = [];
  if (Array.isArray(updates.shared_with)) {
    const { data: prev } = await db
      .from("projects")
      .select("shared_with, name")
      .eq("id", projectId)
      .eq("user_id", userId)
      .single();
    if (prev) prevSharedWith = Array.isArray(prev.shared_with) ? prev.shared_with : [];
  }

  const { data, error } = await db
    .from("projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", userId)
    .select("*")
    .single();
  if (error || !data)
    return void res.status(404).json({ detail: "Project not found" });

  // Send invite emails to newly-added members
  if (Array.isArray(updates.shared_with)) {
    const newEmails = (updates.shared_with as string[]).filter(
      (e) => !prevSharedWith.includes(e)
    );
    if (newEmails.length > 0) {
      const { data: profile } = await db
        .from("user_profiles")
        .select("display_name")
        .eq("user_id", userId)
        .single();
      sendInviteEmails(
        userEmail ?? "",
        profile?.display_name ?? userEmail ?? "",
        data.name ?? "a project",
        newEmails,
      ).catch(() => {/* fire-and-forget */});
    }
  }`
);

// In POST (create) handler: send invites to shared_with on new project
p = p.replace(
  `  if (error) return void res.status(500).json({ detail: error.message });
  res.status(201).json({ ...data, documents: [] });`,
  `  if (error) return void res.status(500).json({ detail: error.message });

  // Send invite emails to initial shared members
  if (cleanedSharedWith.length > 0) {
    const db2 = createServerSupabase();
    const { data: profile } = await db2
      .from("user_profiles")
      .select("display_name")
      .eq("user_id", userId)
      .single();
    sendInviteEmails(
      userEmail ?? "",
      profile?.display_name ?? userEmail ?? "",
      data.name ?? "a project",
      cleanedSharedWith,
    ).catch(() => {/* fire-and-forget */});
  }

  res.status(201).json({ ...data, documents: [] });`
);

writeFileSync('src/routes/projects.ts', p);
console.log('patched projects.ts with Resend invite emails (PATCH + POST)');
