export type LifeWhisperRelationshipFact =
  | "NONE"
  | "WHISPER_SUBMITTED"
  | "WHISPER_SKIPPED";

export type LifeWhisperRelationshipResponsePhase =
  | "DORMANT"
  | "RESPONDING"
  | "SETTLED"
  | "UNAVAILABLE"
  | "SKIPPED";

export type LifeWhisperRelationshipVisualFact = Readonly<{
  lifeWhisperFact: LifeWhisperRelationshipFact;
  lifeWhisperResponsePhase: LifeWhisperRelationshipResponsePhase;
  responseCycleId: string | null;
}>;

export const DORMANT_LIFE_WHISPER_RELATIONSHIP_VISUAL_FACT:
  LifeWhisperRelationshipVisualFact = Object.freeze({
    lifeWhisperFact: "NONE",
    lifeWhisperResponsePhase: "DORMANT",
    responseCycleId: null,
  });

export type LifeWhisperRendererVisualResponseOutcome =
  | Readonly<{
      responseCycleId: string;
      status: "MOTION_RESPONSE_STARTED" | "MOTION_RESPONSE_COMPLETED";
      surfaceMode: "WEBGL_MOTION";
    }>
  | Readonly<{
      responseCycleId: string;
      status: "VISUAL_RESPONSE_UNAVAILABLE";
      surfaceMode: "WEBGL_MOTION";
      reason: "WEBGL_CONTEXT_LOST";
    }>;

export type LifeWhisperSurfaceVisualResponseOutcome =
  | Readonly<{
      responseCycleId: string;
      sourceReferenceId: string;
      status: "MOTION_RESPONSE_STARTED" | "MOTION_RESPONSE_COMPLETED";
      surfaceMode: "WEBGL_MOTION";
    }>
  | Readonly<{
      responseCycleId: string;
      sourceReferenceId: string;
      status: "STATIC_RESPONSE_PRESENTED";
      surfaceMode: "SEMANTIC_STATIC_FALLBACK";
      reason:
        | "CANVAS_REQUIRED"
        | "WEBGL2_UNAVAILABLE"
        | "REDUCED_MOTION_REQUESTED"
        | "RENDERER_INITIALIZATION_FAILED";
    }>
  | Readonly<{
      responseCycleId: string;
      sourceReferenceId: string;
      status: "VISUAL_RESPONSE_UNAVAILABLE";
      surfaceMode: "WEBGL_MOTION" | "SEMANTIC_STATIC_FALLBACK";
      reason:
        | "WEBGL_CONTEXT_LOST"
        | "SURFACE_BLOCKED"
        | "OUTCOME_WATCHDOG_EXPIRED";
    }>;

export type LifeWhisperUnavailableContinuation =
  | "NONE"
  | "CONTINUE_WITHOUT_CONFIRMED_RESPONSE";
