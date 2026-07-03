import type { UiComponentCandidate } from "./guanyaoUiComponentCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type ComponentImplementationCandidateReadiness = "NOT_READY" | "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL";

export type ComponentImplementationCandidate = {
  status: "COMPONENT_IMPLEMENTATION_CANDIDATE";
  sourceUiComponentStatus: "UI_COMPONENT_CANDIDATE";
  readiness: ComponentImplementationCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  implementationSections: {
    starbeastImplementation: boolean;
    forceIdentityImplementation: boolean;
    pressureTraceImplementation: boolean;
    sixNodeTraceImplementation: boolean;
    imprintImplementation: boolean;
  };
  implementationTone: string;
  implementationCandidateReason: string;
  safeComponentStubProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const notReadyImplementationCandidateReason = "这局资产卡组件还在靠近实现候选层。它会先停留为组件候选，不急着生成组件。";
const readyImplementationCandidateReason =
  "这局资产卡组件已具备进入实现候选的条件。它仍不是正式组件，下一步需要安全组件桩协议确认实现边界。";

export function resolveComponentImplementationCandidate(input: UiComponentCandidate): ComponentImplementationCandidate {
  const readiness: ComponentImplementationCandidateReadiness =
    input.readiness === "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL" &&
    input.componentImplementationProtocolRequired === true &&
    input.routeForbidden === true &&
    input.forbiddenLegacyRoute === true &&
    input.commercialPayloadForbidden === true
      ? "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL"
      : "NOT_READY";

  return {
    status: "COMPONENT_IMPLEMENTATION_CANDIDATE",
    sourceUiComponentStatus: "UI_COMPONENT_CANDIDATE",
    readiness,
    primaryDimension: input.primaryDimension,
    implementationSections: {
      starbeastImplementation: Boolean(input.componentSections.starbeastComponent),
      forceIdentityImplementation: Boolean(input.componentSections.forceIdentityComponent),
      pressureTraceImplementation: Boolean(input.componentSections.pressureTraceComponent),
      sixNodeTraceImplementation: Boolean(input.componentSections.sixNodeTraceComponent),
      imprintImplementation: Boolean(input.componentSections.imprintComponent),
    },
    implementationTone: input.componentTone,
    implementationCandidateReason:
      readiness === "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL" ? readyImplementationCandidateReason : notReadyImplementationCandidateReason,
    safeComponentStubProtocolRequired: true,
    routeForbidden: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
