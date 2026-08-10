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
const adapter = read("src/services/xinmaiGenesisBirthNativeInputAdapter.ts");
const manifest = JSON.parse(read("package.json"));

for (const field of [
  "CIVIL_DATE",
  "PRECISION",
  "EXACT_LOCAL_TIME",
  "APPROXIMATE_RANGE_START",
  "APPROXIMATE_RANGE_END",
]) {
  assert(controls.includes(`field: "${field}"`), `${field} is not wired through the native-input adapter`);
}
for (const name of [
  "xinmai-birth-civil-date",
  "xinmai-birth-exact-time",
  "xinmai-birth-range-start",
  "xinmai-birth-range-end",
]) {
  assert(controls.includes(`name="${name}"`), `${name} is not a stable formal control`);
}
assert((controls.match(/onInput=/g) ?? []).length === 5, "Every date/time/precision control must consume standard input");
assert((controls.match(/onChange=/g) ?? []).length === 5, "Every date/time/precision control must consume standard change");
assert(controls.includes("latestDraftRef.current = result.draft"), "Sequential native events can still merge against a stale draft");
assert(adapter.includes('status: "UNCHANGED"'), "Duplicate input/change events are not idempotent");
assert(!adapter.includes("localStorage") && !adapter.includes("sessionStorage"), "Native-input adapter must not compensate through Storage");
assert(
  manifest.scripts?.["check:xinmai-birth-native-input-event-synchronization"] ===
    "node scripts/check-xinmai-birth-native-input-event-synchronization.mjs",
  "Native-input synchronization gate is not registered",
);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "xinmai-birth-native-input-gate-"));
try {
  const output = path.join(temp, "adapter.mjs");
  await build({
    entryPoints: [path.join(root, "src/services/xinmaiGenesisBirthNativeInputAdapter.ts")],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${output}?t=${Date.now()}`);
  const blank = Object.freeze({
    year: null,
    month: null,
    day: null,
    precision: "EXACT",
    exactLocalTime: "",
    approximateRangeStart: "",
    approximateRangeEnd: "",
  });
  const date = runtime.syncXinmaiGenesisBirthNativeInput(blank, { field: "CIVIL_DATE", value: "1990-01-15" });
  if (runtime.XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY === "SAFE_WITHHELD") {
    assert(date.status === "SAFE_WITHHELD" && date.draft === blank, "Counter did not safely pause the new native-input presentation path");
    assert(controls.includes('fieldset disabled={XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY !== "ENABLED"}'), "Counter can expose an inert editable form");
    console.log("[XINMAI BIRTH NATIVE INPUT EVENT SYNCHRONIZATION] PASS (SAFE_WITHHELD)");
  } else {
    assert(date.status === "UPDATED" && date.draft.year === 1990 && date.draft.month === 1 && date.draft.day === 15, "Date input did not update the typed draft");
    const duplicateDate = runtime.syncXinmaiGenesisBirthNativeInput(date.draft, { field: "CIVIL_DATE", value: "1990-01-15" });
    assert(duplicateDate.status === "UNCHANGED" && duplicateDate.draft === date.draft, "input/change duplicate produced a second draft write");
    const exact = runtime.syncXinmaiGenesisBirthNativeInput(date.draft, { field: "EXACT_LOCAL_TIME", value: "10:00" });
    assert(exact.status === "UPDATED" && exact.draft.year === 1990 && exact.draft.exactLocalTime === "10:00", "Exact time overwrote the civil date");
    const rangePrecision = runtime.syncXinmaiGenesisBirthNativeInput(exact.draft, { field: "PRECISION", value: "APPROXIMATE_RANGE" });
    assert(rangePrecision.draft.year === 1990 && rangePrecision.draft.precision === "APPROXIMATE_RANGE", "Precision switch overwrote the current date");
    const rangeStart = runtime.syncXinmaiGenesisBirthNativeInput(rangePrecision.draft, { field: "APPROXIMATE_RANGE_START", value: "10:10" });
    const rangeEnd = runtime.syncXinmaiGenesisBirthNativeInput(rangeStart.draft, { field: "APPROXIMATE_RANGE_END", value: "10:50" });
    assert(rangeEnd.draft.approximateRangeStart === "10:10" && rangeEnd.draft.approximateRangeEnd === "10:50", "Range endpoints did not merge into one draft");
    console.log("[XINMAI BIRTH NATIVE INPUT EVENT SYNCHRONIZATION] PASS");
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
