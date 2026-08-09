import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relative) =>
  fs.readFileSync(path.join(root, relative), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const distAssets = path.join(root, "dist", "assets");

assert(
  fs.existsSync(path.join(root, "dist", "index.html")) &&
    fs.existsSync(distAssets),
  "hashed Production build is required before the hit-target gate",
);

const assetNames = fs.readdirSync(distAssets);
const cssNames = assetNames.filter((name) =>
  /^.+-[A-Za-z0-9_-]+\.css$/.test(name),
);
const jsNames = assetNames.filter((name) =>
  /^.+-[A-Za-z0-9_-]+\.js$/.test(name),
);
assert(cssNames.length > 0, "Production build has no hashed CSS assets");
assert(jsNames.length > 0, "Production build has no hashed JS assets");

const compiledCss = cssNames
  .map((name) => fs.readFileSync(path.join(distAssets, name), "utf8"))
  .join("\n");
const invitationRules =
  compiledCss.match(
    /\.gy-genesis-production-experience__origin-invitation[^{}]*\{[^{}]*\}/g,
  ) ?? [];
assert(invitationRules.length > 0, "Production CSS lost the origin control");
assert(
  invitationRules.some((rule) => /pointer-events:\s*auto/.test(rule)),
  "Production CSS does not make the origin BUTTON hit-testable",
);
assert(
  !invitationRules.some((rule) => /pointer-events:\s*none/.test(rule)),
  "A compiled CSS chunk can still remove the origin BUTTON from hit testing",
);
assert(
  invitationRules.some(
    (rule) =>
      /min-width:\s*128px/.test(rule) &&
      /min-height:\s*44px/.test(rule),
  ),
  "Production CSS lost the minimum native hit target",
);
assert(
  compiledCss.includes(
    ".gy-genesis-production-experience__origin-invitation:focus-visible",
  ) &&
    compiledCss.includes(
      ".xinmai-continuous-scene-route-pending{",
    ),
  "Production CSS lost focus or route-pending protection",
);

const pageSource = read("src/pages/GenesisProductionExperiencePage.tsx");
const canvasHostSource = read(
  "src/components/GenesisProductionRendererCanvasHost.tsx",
);
const genesisCssSource = read("src/styles/genesis-production-experience.css");
const sceneCssSource = read("src/styles/xinmai-continuous-scene.css");
const indexHtml = read("dist/index.html");
const packageJson = JSON.parse(read("package.json"));

assert(
  pageSource.includes('className="gy-genesis-production-experience__origin-invitation"') &&
    pageSource.includes('disabled={false}') &&
    pageSource.includes('aria-disabled={undefined}') &&
    pageSource.includes('tabIndex={0}'),
  "native control attributes are not frozen on the Page owner",
);
assert(
  !canvasHostSource.includes("onLifeOriginDiscoveryRequest") &&
    !canvasHostSource.includes("<button"),
  "CanvasHost retained an old callback or native control",
);
assert(
  genesisCssSource.includes("pointer-events: auto") &&
    !sceneCssSource.includes(
      ".gy-genesis-production-experience__origin-invitation",
    ) &&
    /\.xinmai-continuous-scene-route-pending\s*\{[^}]*pointer-events:\s*none;/s.test(
      sceneCssSource,
    ),
  "CSS chunk ownership or overlay pass-through is not deterministic",
);
assert(
  /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.gy-genesis-production-experience__origin-invitation,[\s\S]*\.gy-genesis-production-experience__origin-identity[\s\S]*animation:\s*none;/.test(
    genesisCssSource,
  ),
  "Reduced Motion does not preserve static native-control semantics",
);
assert(
  /\/assets\/.+-[A-Za-z0-9_-]+\.js/.test(indexHtml) &&
    !indexHtml.includes("/@vite/client") &&
    !indexHtml.includes("/src/main.tsx"),
  "Production index is not a hashed bundle",
);
assert(
  packageJson.scripts?.[
    "check:xinmai-genesis-life-origin-native-control-production-hit-target"
  ] ===
    "node scripts/check-xinmai-genesis-life-origin-native-control-production-hit-target.mjs",
  "Production hit-target gate is not registered",
);

console.log(
  `[XINMAI GENESIS LIFE ORIGIN PRODUCTION HIT TARGET] PASS | css=${cssNames.length} js=${jsNames.length}`,
);
