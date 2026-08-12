import { XINMAI_SEMANTIC_CONSTITUTION_FORMAL_STATE_MATRIX } from "./xinmaiSemanticConstitutionFormalStateMatrix";

export type XinmaiFormalStateConsumerBinding = Readonly<{
  area: (typeof XINMAI_SEMANTIC_CONSTITUTION_FORMAL_STATE_MATRIX)[number]["area"];
  state: string;
  resolverOwner: string;
  formalConsumer: string;
  publicChannels: readonly ("VISIBLE" | "STATUS" | "ARIA")[];
  applicability: "WIRED" | "PROTOCOL_ONLY_NOT_APPLICABLE";
  notApplicableReason: string | null;
}>;

const owners = Object.freeze({
  BIRTH: Object.freeze({ resolverOwner: "XinmaiSemanticConstitutionFormalStatePresentationResolver", formalConsumer: "XinmaiGenesisBirthCoordinateControls" }),
  GENESIS: Object.freeze({ resolverOwner: "XinmaiSemanticConstitutionFormalStatePresentationResolver", formalConsumer: "GenesisProductionExperiencePage" }),
  REALITY: Object.freeze({ resolverOwner: "XinmaiRealityEntryPresentationResolver", formalConsumer: "RealityProductionRouteEntry" }),
  SIX_DIMENSION: Object.freeze({ resolverOwner: "XinmaiSemanticConstitutionFormalStatePresentationResolver", formalConsumer: "GravityPage+XinmaiLifeReflectionGuide" }),
  CHOICE: Object.freeze({ resolverOwner: "XinmaiSemanticConstitutionFormalStatePresentationResolver", formalConsumer: "GravityPage" }),
  RETURN: Object.freeze({ resolverOwner: "XinmaiLivedResponseCheckpointPresentationResolver", formalConsumer: "XinmaiLivedResponseReturnSurface" }),
  OWNERSHIP: Object.freeze({ resolverOwner: "XinmaiSemanticConstitutionFormalStatePresentationResolver", formalConsumer: "XinmaiCrystalFormationOwnershipMoment+PersonalityRingPage" }),
  ARCHIVE: Object.freeze({ resolverOwner: "XinmaiSemanticConstitutionFormalStatePresentationResolver", formalConsumer: "PersonalityRingPage" }),
});

export const XINMAI_FORMAL_STATE_CONSUMER_BINDINGS: readonly XinmaiFormalStateConsumerBinding[] =
  Object.freeze(
    XINMAI_SEMANTIC_CONSTITUTION_FORMAL_STATE_MATRIX.map((row) => {
      const owner = owners[row.area];
      const formalConsumer =
        row.area === "CHOICE" &&
        (row.state === "COMMITTED" ||
          row.state === "DEPARTURE_PREPARING" ||
          row.state === "DEPARTED")
          ? "XinmaiLivedResponseCheckpointPresentationResolver+XinmaiLivedResponseReturnSurface"
          : owner.formalConsumer;
      return Object.freeze({
        area: row.area,
        state: row.state,
        resolverOwner: owner.resolverOwner,
        formalConsumer,
        publicChannels: Object.freeze(["VISIBLE", "STATUS", "ARIA"] as const),
        applicability: "WIRED" as const,
        notApplicableReason: null,
      });
    }),
  );

export const XinmaiSemanticConstitutionFormalStateConsumerMap = Object.freeze({
  bindings: XINMAI_FORMAL_STATE_CONSUMER_BINDINGS,
  unknownConsumers: 0 as const,
  runtimeOnly: true as const,
  writesAuthority: false as const,
});
