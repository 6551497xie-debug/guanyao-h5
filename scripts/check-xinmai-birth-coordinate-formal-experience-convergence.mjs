import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const controls = read("src/components/XinmaiGenesisBirthCoordinateControls.tsx");
const resolver = read("src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts");
const styles = read("src/styles/xinmai-genesis-birth-coordinate-spatial-interaction.css");
const policy = read("src/services/xinmaiGenesisBirthCoordinatePresentationPolicy.ts");
const manifest = JSON.parse(read("package.json"));
const presentationEnabled = policy.includes('= "ENABLED";');

for (const token of [
  'type="date"',
  'type="time"',
  'value="EXACT"',
  'value="APPROXIMATE_RANGE"',
  'value="UNKNOWN"',
  'data-chrono-visual-shell="AXIS_GRAMMAR_REWIRED_TO_RAW_BIRTH_INPUT"',
  "系统确定性推导",
  "确认这组生命起点",
  "这个时间范围跨越了两个时辰",
  "onChange",
]) {
  assert(controls.includes(token), `Formal Birth experience token missing: ${token}`);
}
for (const forbidden of [
  "ChronoAxisDualEngine",
  "XINMAI_GENESIS_BIRTH_HOUR_BRANCHES",
  "hourBranch: event.target.value",
  "<canvas",
  "getContext(",
  "localStorage",
  "sessionStorage",
]) {
  assert(!controls.includes(forbidden), `Forbidden Birth presentation owner: ${forbidden}`);
}
assert(
  resolver.includes('primaryAction: "CONFIRM" as const') &&
    resolver.includes('confirmationEnabled: validation.status === "VALID"') &&
    resolver.includes('XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY !== "ENABLED"') &&
    resolver.includes('support: "既有生命事实仍被保留；新的出生坐标确认与下一段显现暂时不可用。"') &&
    resolver.includes("withheldSupport(input.failureReason)") &&
    resolver.includes("validationSupport(validation)"),
  "Typed validation and SAFE_WITHHELD recovery are not converged",
);
assert(
  styles.includes("min-height: 48px") &&
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
    styles.includes("grid-template-columns: 1fr") &&
    styles.includes("pointer-events: auto"),
  "Hit target, narrow viewport, or Reduced Motion contract is incomplete",
);
assert(
  manifest.scripts?.["check:xinmai-birth-coordinate-formal-experience-convergence"] ===
    "node scripts/check-xinmai-birth-coordinate-formal-experience-convergence.mjs",
  "Formal Birth experience gate is not registered",
);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "xinmai-birth-experience-gate-"));
try {
  const entry = path.join(temp, "entry.ts");
  const output = path.join(temp, "bundle.mjs");
  fs.writeFileSync(
    entry,
    `export * from ${JSON.stringify(path.join(root, "src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts"))};`,
  );
  await build({
    entryPoints: [entry],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${output}?t=${Date.now()}`);
  const start = runtime.beginXinmaiGenesisBirthCoordinateInput(
    runtime.createXinmaiGenesisBirthCoordinateInputSession(),
  );
  const decide = (draft) => {
    const session = runtime.updateXinmaiGenesisBirthCoordinateInput(start, Object.freeze(draft));
    return { session, decision: runtime.resolveXinmaiGenesisBirthCoordinatePresentation(session) };
  };

  const blank = runtime.resolveXinmaiGenesisBirthCoordinatePresentation(
    runtime.createXinmaiGenesisBirthCoordinateInputSession(),
  );
  if (!presentationEnabled) {
    const decisions = [
      ["blank", blank],
      ["exact", decide({ year: 1995, month: 6, day: 2, precision: "EXACT", exactLocalTime: "23:30", approximateRangeStart: "", approximateRangeEnd: "" }).decision],
      ["single-branch range", decide({ year: 1995, month: 6, day: 2, precision: "APPROXIMATE_RANGE", exactLocalTime: "", approximateRangeStart: "09:10", approximateRangeEnd: "10:50" }).decision],
      ["cross-branch range", decide({ year: 1995, month: 6, day: 2, precision: "APPROXIMATE_RANGE", exactLocalTime: "", approximateRangeStart: "00:40", approximateRangeEnd: "01:10" }).decision],
      ["unknown", decide({ year: 1995, month: 6, day: 2, precision: "UNKNOWN", exactLocalTime: "", approximateRangeStart: "", approximateRangeEnd: "" }).decision],
    ];
    for (const [name, decision] of decisions) {
      assert(decision.state === "SAFE_WITHHELD", `${name} escaped the forward policy`);
      assert(!decision.confirmationEnabled, `${name} enabled a new Birth confirmation`);
      assert(decision.primaryAction === "NONE", `${name} exposed a new Birth handoff`);
      assert(decision.sceneEnrichment === "SAFE_WITHHELD", `${name} claimed Scene success`);
      assert(decision.support.includes("既有生命事实仍被保留"), `${name} did not preserve existing facts`);
    }
    console.log("[XINMAI BIRTH COORDINATE FORMAL EXPERIENCE CONVERGENCE] PASS (SAFE_WITHHELD)");
  } else {
  assert(blank.state === "LIFE_WORLD_BASELINE" && !blank.confirmationEnabled, "Blank input claimed success");

  const exact = decide({
    year: 1995,
    month: 6,
    day: 2,
    precision: "EXACT",
    exactLocalTime: "23:30",
    approximateRangeStart: "",
    approximateRangeEnd: "",
  });
  assert(exact.decision.state === "BIRTH_COORDINATE_READY", "Exact time did not become ready");
  assert(exact.decision.confirmationEnabled, "Exact time confirmation remains disabled");
  assert(exact.decision.derivationReceipt?.derivedHourBranch === "子时", "Exact time did not derive 子时");

  const range = decide({
    year: 1995,
    month: 6,
    day: 2,
    precision: "APPROXIMATE_RANGE",
    exactLocalTime: "",
    approximateRangeStart: "09:10",
    approximateRangeEnd: "10:50",
  });
  assert(range.decision.state === "BIRTH_COORDINATE_READY", "Single-branch range did not become ready");
  assert(range.decision.confirmationEnabled, "Single-branch range confirmation remains disabled");
  assert(range.decision.derivationReceipt?.derivedHourBranch === "巳时", "Single-branch range derived the wrong branch");

  const crossing = decide({
    year: 1995,
    month: 6,
    day: 2,
    precision: "APPROXIMATE_RANGE",
    exactLocalTime: "",
    approximateRangeStart: "00:40",
    approximateRangeEnd: "01:10",
  });
  assert(crossing.decision.state === "BIRTH_COORDINATE_EDITING", "Cross-branch range claimed readiness");
  assert(!crossing.decision.confirmationEnabled, "Cross-branch range enabled confirmation");
  assert(crossing.decision.validation.reason === "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH", "Cross-branch reason is not typed");
  assert(crossing.decision.support.includes("跨越"), "Cross-branch recovery is not visible");

  const unknown = decide({
    year: 1995,
    month: 6,
    day: 2,
    precision: "UNKNOWN",
    exactLocalTime: "",
    approximateRangeStart: "",
    approximateRangeEnd: "",
  });
  assert(unknown.decision.state === "BIRTH_COORDINATE_EDITING", "Unknown time claimed readiness");
  assert(!unknown.decision.confirmationEnabled, "Unknown time enabled Identity-forming confirmation");
  assert(unknown.decision.validation.reason === "BIRTH_TIME_UNRESOLVED", "Unknown time reason is not typed");
  assert(unknown.decision.support.includes("日期可以保留"), "Unknown time preservation is not explained");

  const retrySession = runtime.markXinmaiGenesisBirthCoordinateSafeWithheld(
    exact.session,
    "ENGINE_UNAVAILABLE",
  );
  const retryDecision = runtime.resolveXinmaiGenesisBirthCoordinatePresentation(retrySession);
  assert(retryDecision.state === "SAFE_WITHHELD", "Failure is not safely withheld");
  assert(retryDecision.primaryAction === "CONFIRM" && retryDecision.confirmationEnabled, "Valid SAFE_WITHHELD input cannot recover or retry");

  console.log("[XINMAI BIRTH COORDINATE FORMAL EXPERIENCE CONVERGENCE] PASS");
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
