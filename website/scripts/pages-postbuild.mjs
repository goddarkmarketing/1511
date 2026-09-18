import { writeFileSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const outDir = join(process.cwd(), "out");
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/1511" : "";

if (!existsSync(outDir)) {
  console.error("pages-postbuild: out/ not found — run next build first");
  process.exit(1);
}

const target = "en/";
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <script>location.replace(${JSON.stringify(target)});</script>
    <title>Trang Voyage</title>
  </head>
  <body>
    <p><a href="${target}">Continue to Trang Voyage</a></p>
  </body>
</html>
`;

writeFileSync(join(outDir, "index.html"), html, "utf8");
writeFileSync(join(outDir, "404.html"), html, "utf8");
writeFileSync(join(outDir, ".nojekyll"), "", "utf8");

/** Next.js Image can omit basePath when unoptimized; fix public asset URLs in the export. */
function rewritePublicAssets(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".html", ".js", ".txt", ".json", ".css", ".xml"].includes(ext)) return false;
  if (!basePath) return false;

  const before = readFileSync(filePath, "utf8");
  const after = before
    .replace(/(["'`(=])\/images\//g, `$1${basePath}/images/`)
    .replace(/(["'`(=])\/favicon\.ico/g, `$1${basePath}/favicon.ico`);

  if (after !== before) {
    writeFileSync(filePath, after, "utf8");
    return true;
  }
  return false;
}

function walk(dir) {
  let changed = 0;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) changed += walk(full);
    else if (rewritePublicAssets(full)) changed += 1;
  }
  return changed;
}

const changed = walk(outDir);
console.log(
  `pages-postbuild: wrote index/404/.nojekyll; rewrote ${changed} files for basePath=${basePath || "(none)"}`,
);
