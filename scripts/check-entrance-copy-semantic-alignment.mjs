import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const paths = Object.freeze({
  homepage: "src/pages/GenesisLab.tsx",
  launch: "src/pages/LaunchLab.tsx",
  genesis: "src/pages/GenesisProductionExperiencePage.tsx",
  app: "src/App.tsx",
  runtime: "src/services/genesisProductionRuntimeConsumer.ts",
  rendererHost: "src/renderers/genesisProductionRendererHost.ts",
  rendererCore: "src/renderers/genesisWebGLRendererCore.ts",
  packageManifest: "package.json",
});

const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${name} expected=${String(expected)} actual=${String(actual)}`,
    );
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};

const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

const extractBetween = (text, startMarker, endMarker) => {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) {
    throw new Error(`unable to extract ${startMarker} -> ${endMarker}`);
  }
  return text.slice(start, end);
};

try {
  [
    "你来到世界时，已经带着自己的生命坐标。",
    "先看见它从哪里来，再看见现实如何作用于你。",
    "进入观爻",
  ].forEach((marker) =>
    assertIncludes("homepage expresses Life Coordinate", source.homepage, marker),
  );
  [
    "困住你的，",
    "不是现实，",
    "是你的惯性反应",
    "见自己   观变化   寻规律   破心魔",
  ].forEach((marker) =>
    assertExcludes("homepage no longer leads with Reality problem semantics", source.homepage, marker),
  );

  const newUserCopy = extractBetween(source.launch, "NEW_USER: {", "OLD_USER: {");
  [
    'kicker: "生命坐标"',
    'topPrimary: "你的时间正在寻找位置"',
    'topSecondary: "确认后进入生命显化"',
    'bodyPrimary: "建立你的生命坐标"',
    'actionPrimary: "上下调频，找到生命坐标"',
    'actionConfirm: "右滑确认，让星河开始回应"',
    'lockText: "生命坐标已定"',
  ].forEach((marker) =>
    assertIncludes("new-user Launch establishes Life Coordinate", newUserCopy, marker),
  );
  ["原始坐标", "现实压力", "显影母码"].forEach((marker) =>
    assertExcludes("Reality semantics do not leak into new-user Launch", newUserCopy, marker),
  );

  [
    "星河已经在那里，等待你的时间进入。",
    "把时间交给星河",
  ].forEach((marker) =>
    assertIncludes("Genesis entrance expresses manifestation", source.genesis, marker),
  );
  assertIncludes(
    "Genesis entrance copy is limited to Dormant",
    source.genesis,
    'currentState === "DORMANT"',
  );

  [
    'path="/" element={<EntryRouter />} />',
    'navigate("/launch-lab")',
    'path="/launch-lab" element={<LaunchLab />} />',
    "GUANYAO_ROUTES.genesis",
  ].forEach((marker) =>
    assertIncludes("formal entrance route remains continuous", source.app, marker),
  );

  const semanticMarkers = [
    "ENTRANCE_COPY",
    "星河已经在那里，等待你的时间进入。",
  ];
  semanticMarkers.forEach((marker) => {
    assertExcludes("Runtime remains independent from entrance copy", source.runtime, marker);
    assertExcludes("Renderer Host remains independent from entrance copy", source.rendererHost, marker);
    assertExcludes("Renderer Core remains independent from entrance copy", source.rendererCore, marker);
  });

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "entrance copy alignment gate is registered",
    packageJson.scripts?.["check-entrance-copy-semantic-alignment"],
    "node scripts/check-entrance-copy-semantic-alignment.mjs",
  );

  console.log("\n[ENTRANCE COPY SEMANTIC ALIGNMENT] PASS");
} catch (error) {
  console.error("[ENTRANCE COPY SEMANTIC ALIGNMENT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
