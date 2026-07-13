import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const gravityPageSource = fs.readFileSync(path.join(rootDir, "src/pages/GravityPage.tsx"), "utf8");

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }

  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }

  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertNotIncludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }

  console.log(`PASS | ${name} | forbidden=absent`);
};

const routingCases = [
  {
    space: "body",
    fixtureKey: "body",
    smoke: "body-awareness",
    unit: "bodyAwarenessChangeExperienceUnit",
    presentation: "bodyAwarenessChangeExperiencePresentation",
    dimensionMapping: 'if (layerLabel === "身体") return "body";',
  },
  {
    space: "emotion",
    fixtureKey: "emotion",
    smoke: "emotion-change",
    unit: "emotionChangeAwarenessChangeExperienceUnit",
    presentation: "emotionChangeAwarenessChangeExperiencePresentation",
    dimensionMapping: 'if (layerLabel === "情绪") return "emotion";',
  },
  {
    space: "thought",
    fixtureKey: "thought",
    smoke: "thought-change",
    unit: "thoughtChangeCognitionChangeExperienceUnit",
    presentation: "thoughtChangeCognitionChangeExperiencePresentation",
    dimensionMapping: 'if (layerLabel === "思想" || layerLabel === "思维") return "thought";',
  },
  {
    space: "action",
    fixtureKey: "behavior",
    smoke: "action-five",
    unit: "actionFiveAwarenessChangeExperienceUnit",
    presentation: "actionFiveAwarenessChangeExperiencePresentation",
    dimensionMapping: 'if (layerLabel === "行动" || layerLabel === "行为") return "action";',
  },
  {
    space: "memory",
    fixtureKey: "memory",
    smoke: "memory-wisdom",
    unit: "memoryWisdomChangeExperienceUnit",
    presentation: "memoryWisdomChangeExperiencePresentation",
    dimensionMapping: 'if (layerLabel === "记忆") return "memory";',
  },
  {
    space: "motivation",
    fixtureKey: "motivation",
    smoke: "motivation-drive",
    unit: "motivationDriveChangeExperienceUnit",
    presentation: "motivationDriveChangeExperiencePresentation",
    dimensionMapping: 'if (layerLabel === "动机" || layerLabel === "目标") return "motivation";',
  },
];

assertEqual("gravity change experience route count", routingCases.length, 6);
assertEqual(
  "gravity change experience route uniqueness",
  new Set(routingCases.map(({ space }) => space)).size,
  6,
);

routingCases.forEach(({ space, fixtureKey, smoke, unit, presentation, dimensionMapping }) => {
  assertIncludes(`${space} unit is connected`, gravityPageSource, unit);
  assertIncludes(`${space} presentation is connected`, gravityPageSource, presentation);
  assertIncludes(`${space} smoke is connected`, gravityPageSource, `experienceSmokeFixture === "${smoke}"`);
  assertIncludes(`${space} fixture route is connected`, gravityPageSource, `fixtureKey === "${fixtureKey}"`);
  assertIncludes(`${space} layer maps to persona dimension`, gravityPageSource, dimensionMapping);
});

assertIncludes(
  "gravity presentation marker follows actual dimension",
  gravityPageSource,
  'data-change-experience-presentation={changeExperienceUnit?.dimension ?? "inactive"}',
);
assertNotIncludes(
  "gravity presentation marker is not action hardcoded",
  gravityPageSource,
  'data-change-experience-presentation={changeExperiencePresentation ? "action-five-awareness" : "inactive"}',
);

console.log("[GRAVITY CHANGE EXPERIENCE ROUTING] PASS");
