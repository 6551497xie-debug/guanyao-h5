import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-genesis-source-recovery-"),
);
const entryPath = path.join(tempDir, "entry.ts");
const outputPath = path.join(tempDir, "bundle.mjs");
const modulePath = (relative) => JSON.stringify(path.join(rootDir, relative));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

class MemoryStorage {
  #values = new Map();
  getItem(key) {
    return this.#values.has(key) ? this.#values.get(key) : null;
  }
  setItem(key, value) {
    this.#values.set(key, String(value));
  }
  removeItem(key) {
    this.#values.delete(key);
  }
  clear() {
    this.#values.clear();
  }
}

try {
  fs.writeFileSync(
    entryPath,
    [
      `export { resolveLaunchOriginMotherSourceResults } from ${modulePath("src/services/guanyaoLaunchOriginMotherInputAdapter.ts")};`,
      `export { createLaunchLifeSourceSession } from ${modulePath("src/services/launchLifeSourceSession.ts")};`,
      `export { deriveXinmaiGenesisBirthSource } from ${modulePath("src/services/xinmaiGenesisBirthSourceDerivationController.ts")};`,
      `export { XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY } from ${modulePath("src/services/xinmaiGenesisBirthSourceDerivationPolicy.ts")};`,
      `export { resolveBirthCalendarFromGregorianDate } from ${modulePath("src/services/guanyaoBirthCalendarService.ts")};`,
      `export { createXinmaiBirthSourceReceiptReferenceId, deriveXinmaiHourBranchFromExactLocalTime } from ${modulePath("src/services/xinmaiBirthTimeDerivationService.ts")};`,
      `export { persistLaunchLifeSourceSession, readPersistedLaunchLifeSourceRecoveryRepresentations } from ${modulePath("src/services/sessionService.ts")};`,
      `export { writeOriginMotherContext } from ${modulePath("src/services/guanyaoOriginMotherContextPersistenceAdapter.ts")};`,
      `export { recoverXinmaiGenesisBirthSource } from ${modulePath("src/services/xinmaiGenesisBirthSourceRecoveryController.ts")};`,
      `export { clearRealUserGenesisVisualSourceContext } from ${modulePath("src/services/realUserGenesisVisualSourceContext.ts")};`,
    ].join("\n"),
  );
  await build({
    entryPoints: [entryPath],
    outfile: outputPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const runtime = await import(`file://${outputPath}?t=${Date.now()}`);
  const localStorage = new MemoryStorage();
  globalThis.window = { localStorage };

  const createSession = (sourceReferenceId, year, month, day, hourBranch) => {
    const input = {
      birth: { year, month, day, hourBranch },
      periodIndex: 0,
      geo: { province: "未采集", city: "未采集" },
      starbeast: {
        nodeCount: 28,
        primaryNodeIndex: 14,
        originLightTrace: "28光兽入口",
      },
    };
    const sources = runtime.resolveLaunchOriginMotherSourceResults(input);
    const result = runtime.createLaunchLifeSourceSession({
      sourceReferenceId,
      birthCoordinate: input.birth,
      ...sources,
    });
    assert(result.status === "AVAILABLE", "public source session setup blocked");
    return result.session;
  };

  const sourceA = createSession("launch:recovery:a", 1988, 8, 8, "辰时");
  const sourceB = createSession("launch:recovery:b", 1992, 2, 2, "午时");
  const reset = () => {
    localStorage.clear();
    runtime.clearRealUserGenesisVisualSourceContext();
  };

  const receiptResult = runtime.deriveXinmaiGenesisBirthSource({
    inputRevision: 7,
    rawInput: {
      localCivilGregorianDate: { year: 1995, month: 6, day: 2 },
      precision: "EXACT",
      exactLocalTime: "23:30",
      approximateRangeStart: null,
      approximateRangeEnd: null,
      localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION",
    },
  });
  let existingV2Receipt;
  if (runtime.XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY === "ENABLED") {
    assert(receiptResult.status === "READY", "V2 receipt did not derive");
    existingV2Receipt = receiptResult.receipt;
  } else {
    assert(
      receiptResult.status === "SAFE_WITHHELD" && receiptResult.receipt === null,
      "Counter formed a new receipt",
    );
    const calendar = runtime.resolveBirthCalendarFromGregorianDate({ year: 1995, month: 6, day: 2 });
    const branch = runtime.deriveXinmaiHourBranchFromExactLocalTime("23:30");
    assert(calendar.status === "READY" && branch === "子时", "existing receipt fixture inputs invalid");
    existingV2Receipt = Object.freeze({
      schemaVersion: "XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_V1",
      receiptReferenceId: runtime.createXinmaiBirthSourceReceiptReferenceId({ gregorianBirthDate: calendar.gregorianBirthDate, precision: "EXACT", inputEvidence: "23:30", hourBranch: branch }),
      inputRevision: 7,
      rawInput: Object.freeze({ localCivilGregorianDate: Object.freeze({ year: 1995, month: 6, day: 2 }), precision: "EXACT", exactLocalTime: "23:30", approximateRangeStart: null, approximateRangeEnd: null, localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION" }),
      canonicalGregorianBirthDate: calendar.gregorianBirthDate,
      calendarResolution: calendar,
      derivedHourBranch: branch,
      derivedHourBranchOrdinal: 1,
      rules: Object.freeze({ timeDerivation: "XINMAI_LOCAL_CIVIL_HOUR_BRANCH_V1", ziHour: "23:00_TO_00:59", civilDate: "USER_GREGORIAN_DATE_UNCHANGED", calendar: "GUANYAO_BIRTH_CALENDAR_V1", noBirthplaceOrTimezoneConversion: true }),
      authority: Object.freeze({ rawInputUserConfirmed: true, branchAndLunarDeterministicallyDerived: true, immutableReceipt: true, noDirectDerivedValueWrite: true }),
    });
  }
  const v2Input = {
    birth: { year: 1995, month: 6, day: 2, hourBranch: existingV2Receipt.derivedHourBranch },
    periodIndex: existingV2Receipt.derivedHourBranchOrdinal - 1,
    geo: { province: "未采集", city: "未采集" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 14, originLightTrace: "28光兽入口" },
  };
  const v2Sources = runtime.resolveLaunchOriginMotherSourceResults(v2Input);
  const v2SourceReferenceId = `launch:v2:${existingV2Receipt.receiptReferenceId}`;
  const v2SessionResult = runtime.createLaunchLifeSourceSession({
    sourceReferenceId: v2SourceReferenceId,
    birthCoordinate: v2Input.birth,
    birthSourceDerivationReceipt: existingV2Receipt,
    ...v2Sources,
  });
  assert(v2SessionResult.status === "AVAILABLE", "V2 source session setup blocked");

  reset();
  runtime.persistLaunchLifeSourceSession(v2SessionResult.session);
  runtime.writeOriginMotherContext({ lifeSourceSession: v2SessionResult.session });
  const recoveredV2 = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: v2SourceReferenceId,
  });
  assert(
    recoveredV2.status === "READY" &&
      recoveredV2.sourceReferenceId === v2SourceReferenceId &&
      recoveredV2.lifeSourceSession.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V2" &&
      recoveredV2.lifeSourceSession.birthSourceDerivationReceipt.receiptReferenceId === existingV2Receipt.receiptReferenceId,
    "V2 typed receipt did not survive persistence recovery",
  );

  reset();
  const missing = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
  });
  assert(
    missing.status === "SOURCE_NOT_READY" &&
      missing.reason === "PERSISTED_SOURCE_NOT_FOUND",
    "missing source does not remain not-ready",
  );

  runtime.persistLaunchLifeSourceSession(sourceA);
  const primaryOnly = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(
    primaryOnly.status === "READY" &&
      primaryOnly.sourceReferenceId === sourceA.sourceReferenceId &&
      primaryOnly.proof === "PRIMARY",
    "canonical primary cannot recover exact source",
  );

  runtime.writeOriginMotherContext({ lifeSourceSession: sourceA });
  const matched = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(
    matched.status === "READY" &&
      matched.sourceReferenceId === sourceA.sourceReferenceId &&
      matched.proof === "PRIMARY_AND_ORIGIN_MATCHED",
    "matching primary and mirror do not converge",
  );

  reset();
  runtime.persistLaunchLifeSourceSession(sourceA);
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceB });
  const conflictState =
    runtime.readPersistedLaunchLifeSourceRecoveryRepresentations();
  const conflict = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
  });
  assert(conflictState.status === "CONFLICT", "reference conflict not typed");
  assert(
    conflict.status === "SAFE_WITHHELD" &&
      conflict.reason === "PERSISTED_SOURCE_CONFLICT",
    "persisted reference conflict selects a silent winner",
  );

  reset();
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceA });
  const mirrorGenesis = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
  });
  assert(
    mirrorGenesis.status === "SOURCE_NOT_READY" &&
      mirrorGenesis.reason === "PRIMARY_SOURCE_REQUIRED",
    "origin-only mirror authorizes a new Genesis route",
  );
  const mirrorReturning = runtime.recoverXinmaiGenesisBirthSource({
    intent: "RESTORE_RETURNING_LIFE",
    recognizedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(
    mirrorReturning.status === "READY" &&
      mirrorReturning.proof === "LEGACY_RECOGNIZED_MATCH",
    "recognized legacy mirror cannot recover through typed proof",
  );

  reset();
  runtime.persistLaunchLifeSourceSession(sourceA);
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceA });
  const activeA = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(activeA.status === "READY", "source A did not become active");
  runtime.persistLaunchLifeSourceSession(sourceB);
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceB });
  const fencedB = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceB.sourceReferenceId,
  });
  assert(
    fencedB.status === "SAFE_WITHHELD" &&
      fencedB.reason === "ACTIVE_SOURCE_REFERENCE_CONFLICT",
    "different source replaced the active source without fencing",
  );

  console.log("[XINMAI GENESIS BIRTH SOURCE REFRESH RECOVERY] PASS");
} finally {
  delete globalThis.window;
  fs.rmSync(tempDir, { recursive: true, force: true });
}
