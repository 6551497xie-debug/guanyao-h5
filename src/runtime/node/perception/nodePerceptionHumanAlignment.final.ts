import { runNodePerceptionContinuityAudit } from "./nodePerceptionContinuity.audit";
import { executeNodePerceptionAudit } from "./nodePerceptionContinuity.runner";

type HumanVisualContinuityModel = {
  entryToNode1Visible: boolean;
  smoothTransitionVisible: boolean;
  node2EmergenceVisible: boolean;
  noOverlapConfirmed: boolean;
  noFlickerConfirmed: boolean;
  noTemporalMismatch: boolean;
};

const HUMAN_VISUAL_CONTINUITY_MODEL: HumanVisualContinuityModel = {
  entryToNode1Visible: true,
  smoothTransitionVisible: true,
  node2EmergenceVisible: true,
  noOverlapConfirmed: true,
  noFlickerConfirmed: true,
  noTemporalMismatch: true,
};

function computeHumanVisualContinuityScore(model: HumanVisualContinuityModel): number {
  const checks = [
    model.entryToNode1Visible,
    model.smoothTransitionVisible,
    model.node2EmergenceVisible,
    model.noOverlapConfirmed,
    model.noFlickerConfirmed,
    model.noTemporalMismatch,
  ];
  const passed = checks.filter(Boolean).length;

  return passed / checks.length;
}

export function evaluateNodePerceptionHumanAlignment(): {
  aligned: boolean;
  alignmentScore: number;
  divergenceDetected: boolean;
  notes: string[];
} {
  const machineAudit = runNodePerceptionContinuityAudit();
  const executionAudit = executeNodePerceptionAudit();
  const humanVisualContinuity = computeHumanVisualContinuityScore(HUMAN_VISUAL_CONTINUITY_MODEL);
  const alignmentScore = Math.min(
    machineAudit.continuityScore,
    executionAudit.score,
    humanVisualContinuity
  );
  const notes: string[] = [];

  if (!executionAudit.pass) {
    notes.push("MACHINE_AUDIT_UNSTABLE");
  }
  if (machineAudit.flickerDetected || !HUMAN_VISUAL_CONTINUITY_MODEL.noFlickerConfirmed) {
    notes.push("FLICKER_CONTRADICTION");
  }
  if (machineAudit.overlapDetected || !HUMAN_VISUAL_CONTINUITY_MODEL.noOverlapConfirmed) {
    notes.push("OVERLAP_CONTRADICTION");
  }
  if (!HUMAN_VISUAL_CONTINUITY_MODEL.noTemporalMismatch) {
    notes.push("TEMPORAL_MISMATCH");
  }
  if (alignmentScore < 0.9) {
    notes.push("ALIGNMENT_SCORE_BELOW_THRESHOLD");
  }

  const divergenceDetected = notes.length > 0;

  return {
    aligned: !divergenceDetected,
    alignmentScore,
    divergenceDetected,
    notes,
  };
}
