import { useNavigate } from "react-router-dom";
import { RealityProductionHost } from "../components/RealityProductionHost";
import { readGenesisProductionRealityEntryContext } from "../services/genesisProductionRecognitionRealityEntry";
import {
  authorizeRealityProductionRoute,
  REALITY_PRODUCTION_ROUTE_TARGET,
} from "../services/realityProductionRouteAuthorization";
import { readRealityRouteActivationSourceContext } from "../services/realityRouteActivationSourceContext";
import { bridgeRealityRouteToPressureCandidateActivation } from "../services/realityRoutePressureCandidateActivationBridge";
import { bridgeRealityRouteCandidateRequestContext } from "../services/realityRouteCandidateRequestContextBridge";
import { bridgeRealityRouteDeliveryOrchestration } from "../services/realityRouteDeliveryOrchestrationBridge";
import type { RealityProductionRouteEntryBoundary } from "../types/realityProductionRouteEntry";

export const REALITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY:
  RealityProductionRouteEntryBoundary = Object.freeze({
    productionRouteEntryOnly: true,
    exactRealityRouteOnly: true,
    inMemoryRealityEntryContextOnly: true,
    realityRouteActivationSourceContextRequired: true,
    pressureCandidateActivationContextRequired: true,
    pressureCandidateRequestContextRequired: true,
    pressureDeliveryOrchestrationRequired: true,
    routeAuthorizationRequired: true,
    sourceNotReadyRecoveryRequired: true,
    sourceReferenceExcludedFromUrl: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noSourceRecalculation: true,
    noStorageRead: true,
    noStorageWrite: true,
    noGenesisNavigationMutation: true,
  });

export function RealityProductionRouteEntry() {
  const navigate = useNavigate();
  const entryContext = readGenesisProductionRealityEntryContext();
  const activationSourceContext =
    readRealityRouteActivationSourceContext();
  const authorization = authorizeRealityProductionRoute({
    routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
    sourceReferenceId: entryContext?.sourceReferenceId ?? null,
  });
  const candidateActivationResult =
    authorization.status === "READY" && activationSourceContext !== null
      ? bridgeRealityRouteToPressureCandidateActivation({
          routeAuthorization: authorization,
          routeActivationSourceContext: activationSourceContext,
        })
      : null;
  const candidateRequestResult = candidateActivationResult
    ? bridgeRealityRouteCandidateRequestContext({
        routeCandidateActivationResult: candidateActivationResult,
      })
    : null;
  const deliveryResult =
    authorization.status === "READY" && candidateRequestResult
      ? bridgeRealityRouteDeliveryOrchestration({
          routeAuthorization: authorization,
          routeCandidateRequestResult: candidateRequestResult,
        })
      : null;

  if (
    authorization.status !== "READY" ||
    activationSourceContext === null ||
    activationSourceContext.sourceReferenceId !==
      authorization.sourceReferenceId ||
    candidateActivationResult?.status !== "READY"
    || candidateRequestResult?.status !== "READY" ||
    deliveryResult?.status !== "READY"
  ) {
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason={
          authorization.status !== "READY"
            ? authorization.guardReason
            : activationSourceContext === null ||
              activationSourceContext.sourceReferenceId !==
                authorization.sourceReferenceId
            ? "REALITY_ACTIVATION_SOURCE_CONTEXT_NOT_AVAILABLE"
            : candidateActivationResult?.status !== "READY"
            ? candidateActivationResult?.reason ??
              "PRESSURE_CANDIDATE_ACTIVATION_NOT_READY"
            : candidateRequestResult?.status !== "READY"
            ? candidateRequestResult?.reason ??
              "PRESSURE_CANDIDATE_REQUEST_NOT_READY"
            : deliveryResult?.status !== "READY"
            ? deliveryResult?.reason ??
              "PRESSURE_DELIVERY_ORCHESTRATION_NOT_READY"
            : null
        }
      >
        <p role="status">SOURCE_NOT_READY</p>
        <button
          type="button"
          onClick={() => navigate("/launch-lab", { replace: true })}
        >
          返回出生信息
        </button>
      </main>
    );
  }

  return <RealityProductionHost routeAuthorization={authorization} />;
}
