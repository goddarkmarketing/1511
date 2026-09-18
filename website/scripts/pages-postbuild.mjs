import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
if (!existsSync(outDir)) {
  console.error("pages-postbuild: out/ not found — run next build first");
  process.exit(1);
}

const target = process.env.GITHUB_PAGES === "true" ? "en/" : "en/";
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

// GitHub Pages serves 404.html for unknown paths; send users to the English home.
if (!existsSync(join(outDir, "404.html"))) {
  writeFileSync(join(outDir, "404.html"), html, "utf8");
}

// Ensure .nojekyll so paths with underscores are not ignored by GitHub Pages.
writeFileSync(join(outDir, ".nojekyll"), "", "utf8");

console.log("pages-postbuild: wrote out/index.html, out/404.html, out/.nojekyll");
