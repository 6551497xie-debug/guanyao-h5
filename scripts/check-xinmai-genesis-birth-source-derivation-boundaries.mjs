import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { build } from "esbuild";
const root = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "xinmai-birth-derivation-"));
const entry = path.join(temp, "entry.ts");
const bundle = path.join(temp, "bundle.mjs");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
try {
  fs.writeFileSync(entry, [
    `export * from ${JSON.stringify(path.join(root, "src/services/xinmaiGenesisBirthSourceDerivationController.ts"))};`,
    `export { XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY } from ${JSON.stringify(path.join(root, "src/services/xinmaiGenesisBirthSourceDerivationPolicy.ts"))};`,
  ].join("\n"));
  await build({ entryPoints: [entry], outfile: bundle, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtime = await import(`file://${bundle}?t=${Date.now()}`);
  const exact = (time) => runtime.deriveXinmaiGenesisBirthSource({ inputRevision: 1, rawInput: { localCivilGregorianDate: { year: 2024, month: 2, day: 10 }, precision: "EXACT", exactLocalTime: time, approximateRangeStart: null, approximateRangeEnd: null, localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION" } });
  if (runtime.XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY === "SAFE_WITHHELD") {
    const counterResult = exact("23:00");
    assert(
      counterResult.status === "SAFE_WITHHELD" &&
        counterResult.reason === "DERIVATION_POLICY_SAFE_WITHHELD" &&
        counterResult.receipt === null,
      "Forward Counter formed a new birth receipt",
    );
    console.log("[XINMAI GENESIS BIRTH SOURCE DERIVATION BOUNDARIES] PASS (COUNTER)");
  } else {
  for (const [time, branch] of [["22:59", "亥时"], ["23:00", "子时"], ["00:59", "子时"], ["01:00", "丑时"]]) {
    const result = exact(time);
    assert(result.status === "READY" && result.receipt.derivedHourBranch === branch, `${time} boundary failed`);
    assert(result.receipt.canonicalGregorianBirthDate === "2024-02-10", `${time} changed civil date`);
  }
  const range = (start, end) => runtime.deriveXinmaiGenesisBirthSource({ inputRevision: 2, rawInput: { localCivilGregorianDate: { year: 2024, month: 2, day: 10 }, precision: "APPROXIMATE_RANGE", exactLocalTime: null, approximateRangeStart: start, approximateRangeEnd: end, localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION" } });
  assert(range("23:10", "00:40").status === "READY", "same 子时 range blocked");
  assert(range("00:40", "01:10").status === "BIRTH_TIME_UNRESOLVED", "cross-branch range guessed");
  const unknown = runtime.deriveXinmaiGenesisBirthSource({ inputRevision: 3, rawInput: { localCivilGregorianDate: { year: 2024, month: 2, day: 10 }, precision: "UNKNOWN", exactLocalTime: null, approximateRangeStart: null, approximateRangeEnd: null, localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION" } });
  assert(unknown.status === "BIRTH_TIME_UNRESOLVED" && unknown.receipt === null, "unknown time formed receipt");
  assert(exact("12:00").receipt.calendarResolution.lunarBirthDate !== null, "lunar derivation missing");
  const leapMonth = runtime.deriveXinmaiGenesisBirthSource({ inputRevision: 4, rawInput: { localCivilGregorianDate: { year: 2023, month: 3, day: 22 }, precision: "EXACT", exactLocalTime: "12:00", approximateRangeStart: null, approximateRangeEnd: null, localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION" } });
  assert(
    leapMonth.status === "READY" &&
      leapMonth.receipt.calendarResolution.lunarBirthDate.month === 2 &&
      leapMonth.receipt.calendarResolution.lunarBirthDate.isLeapMonth === true,
    "leap-month calendar derivation failed",
  );
  console.log("[XINMAI GENESIS BIRTH SOURCE DERIVATION BOUNDARIES] PASS");
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
