import type {
  HexagramCrystalAdapterInput,
  HexagramCrystalAdapterNotReady,
  HexagramCrystalAdapterNotReadyReason,
  HexagramCrystalAdapterResult,
  HexagramCrystalAdapterSuccess,
  HexagramCrystalInput,
  PersonaDimension,
} from "../types/personaTransmission";

const PERSONA_DIMENSIONS: readonly PersonaDimension[] = [
  "body",
  "emotion",
  "thought",
  "action",
  "memory",
  "motivation",
];

const createNotReadyResult = (
  reason: HexagramCrystalAdapterNotReadyReason,
): HexagramCrystalAdapterNotReady => ({
  status: "NOT_READY",
  reason,
});

const createGuardrails = (): HexagramCrystalInput["guardrails"] => ({
  noStorageWrite: true,
  noHexagramGeneration: true,
  noCurrentCrystalEndStateMutation: true,
  noCrystalEngineMutation: true,
  noCollectibleAsset: true,
  noScore: true,
  noLevel: true,
  noGrowthValue: true,
  noPetGrowth: true,
  no384Yao: true,
  noArchive: true,
  noOldR8: true,
});

const hasHexagramStructure = (hexagram: HexagramCrystalInput["sourceHexagram"]): boolean =>
  Boolean(
    hexagram.lowerTrigram &&
      hexagram.upperTrigram &&
      (hexagram.hexagramCode || hexagram.hexagramName || hexagram.hexagramTitle),
  );

const resolvePersonaDimension = (value?: string): PersonaDimension | undefined => {
  if (!value) return undefined;
  return PERSONA_DIMENSIONS.includes(value as PersonaDimension) ? (value as PersonaDimension) : undefined;
};

const createReadyResult = (input: HexagramCrystalAdapterInput): HexagramCrystalAdapterSuccess => {
  const sourceCrystal = input.sourceCrystal;

  if (!sourceCrystal) {
    throw new Error("HexagramCrystalAdapterService invariant violated: sourceCrystal is required.");
  }

  const completedNodeCount = sourceCrystal.transmission?.completedNodeCount;
  const primaryDimension = resolvePersonaDimension(sourceCrystal.transmission?.primaryDimension);

  return {
    status: "READY",
    input: {
      sourceCrystal: {
        source: "currentCrystalEndState",
        status: "CRYSTALLIZED",
        crystalMeaning: sourceCrystal.crystal.copy,
      },
      sourceHexagram: sourceCrystal.hexagram,
      migrationTrace: {
        traceLine: `完成 ${completedNodeCount} 个六维节点后形成本局结晶。`,
        ...(primaryDimension ? { dimension: primaryDimension } : {}),
      },
      dominantShift: {
        fromModel: "本局自动反应",
        toResponse: sourceCrystal.crystal.copy,
        deflectionVector: "currentCrystalEndState → HexagramCrystalInput",
      },
      crystalMeaning: sourceCrystal.crystal.copy,
      readiness: "READY_FOR_HEXAGRAM_CRYSTAL",
      source: input.source,
      guardrails: createGuardrails(),
    },
  };
};

export const adaptHexagramCrystalInput = (
  input: HexagramCrystalAdapterInput,
): HexagramCrystalAdapterResult => {
  const { sourceCrystal } = input;

  if (!sourceCrystal || sourceCrystal.source !== "dynamics") {
    return createNotReadyResult("CURRENT_CRYSTAL_END_STATE_MISSING");
  }

  if (sourceCrystal.status !== "CRYSTALLIZED") {
    return createNotReadyResult("CURRENT_CRYSTAL_END_STATE_NOT_CRYSTALLIZED");
  }

  if (!hasHexagramStructure(sourceCrystal.hexagram)) {
    return createNotReadyResult("HEXAGRAM_STRUCTURE_MISSING");
  }

  if (!sourceCrystal.crystal.copy || !sourceCrystal.transmission?.completedNodeCount) {
    return createNotReadyResult("MOVEMENT_TRACE_MISSING");
  }

  return createReadyResult(input);
};

export const HexagramCrystalAdapterService = {
  adaptHexagramCrystalInput,
} as const;
