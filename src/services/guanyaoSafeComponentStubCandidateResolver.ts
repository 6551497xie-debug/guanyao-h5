import type { ComponentImplementationCandidate } from "./guanyaoComponentImplementationCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type SafeComponentStubCandidateReadiness = "NOT_READY" | "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION";

export type SafeComponentStubCandidate = {
  status: "SAFE_COMPONENT_STUB_CANDIDATE";
  sourceComponentImplementationStatus: "COMPONENT_IMPLEMENTATION_CANDIDATE";
  readiness: SafeComponentStubCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  stubSections: {
    starbeastStub: boolean;
    forceIdentityStub: boolean;
    pressureTraceStub: boolean;
    sixNodeTraceStub: boolean;
    imprintStub: boolean;
  };
  stubTone: string;
  stubCandidateReason: string;
  safeStubImplementationAllowed: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const notReadyStubCandidateReason = "这局资产卡组件还在靠近安全组件桩候选层。它会先停留为实现候选，不急着生成组件桩。";
const readyStubCandidateReason =
  "这局资产卡组件已具备进入安全组件桩候选的条件。它仍不是正式组件，下一步需要安全组件桩实现确认边界。";

export function resolveSafeComponentStubCandidate(input: ComponentImplementationCandidate): SafeComponentStubCandidate {
  const readiness: SafeComponentStubCandidateReadiness =
    input.readiness === "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL" &&
    input.safeComponentStubProtocolRequired === true &&
    input.routeForbidden === true &&
    input.forbiddenLegacyRoute === true &&
    input.commercialPayloadForbidden === true
      ? "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION"
      : "NOT_READY";

  return {
    status: "SAFE_COMPONENT_STUB_CANDIDATE",
    sourceComponentImplementationStatus: "COMPONENT_IMPLEMENTATION_CANDIDATE",
    readiness,
    primaryDimension: input.primaryDimension,
    stubSections: {
      starbeastStub: Boolean(input.implementationSections.starbeastImplementation),
      forceIdentityStub: Boolean(input.implementationSections.forceIdentityImplementation),
      pressureTraceStub: Boolean(input.implementationSections.pressureTraceImplementation),
      sixNodeTraceStub: Boolean(input.implementationSections.sixNodeTraceImplementation),
      imprintStub: Boolean(input.implementationSections.imprintImplementation),
    },
    stubTone: input.implementationTone,
    stubCandidateReason: readiness === "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION" ? readyStubCandidateReason : notReadyStubCandidateReason,
    safeStubImplementationAllowed: true,
    routeForbidden: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
