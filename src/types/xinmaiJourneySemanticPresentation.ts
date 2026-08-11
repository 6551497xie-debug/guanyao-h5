export type XinmaiJourneySemanticNodeId =
  | "BIRTH_COORDINATE" | "GENESIS_FORMATION" | "STAR_BEAST_CONTINUITY"
  | "WHISPER" | "NAMING" | "REALITY_SELECTION" | "SIX_DIMENSION_ENTRY"
  | "BODY" | "EMOTION" | "THOUGHT" | "ACTION" | "MEMORY" | "GOAL"
  | "RESPONSE_MAP" | "CHOICE" | "DEPARTURE" | "RETURN"
  | "NOT_ATTEMPTED" | "USER_REJECTED_RECORD" | "FORMATION"
  | "CRYSTAL_OWNERSHIP" | "ARCHIVE" | "FRESH_REALITY";

export type XinmaiJourneySemanticPresentation = Readonly<{
  nodeId: XinmaiJourneySemanticNodeId;
  purpose: string;
  explanation: string;
  primaryAction: string;
  secondaryAction: string;
  consequence: string;
  atmosphere: string | null;
  presentationMode: "FULL" | "SAFE_STATIC";
  writesAuthority: false;
}>;
