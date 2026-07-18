import { useNavigate } from "react-router-dom";
import { RealityProductionHost } from "../components/RealityProductionHost";
import { readGenesisProductionRealityEntryContext } from "../services/genesisProductionRecognitionRealityEntry";
import {
  authorizeRealityProductionRoute,
  REALITY_PRODUCTION_ROUTE_TARGET,
} from "../services/realityProductionRouteAuthorization";
import { readRealityRouteActivationSourceContext } from "../services/realityRouteActivationSourceContext";
import type { RealityProductionRouteEntryBoundary } from "../types/realityProductionRouteEntry";

export const REALITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY:
  RealityProductionRouteEntryBoundary = Object.freeze({
    productionRouteEntryOnly: true,
    exactRealityRouteOnly: true,
    inMemoryRealityEntryContextOnly: true,
    realityRouteActivationSourceContextRequired: true,
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

  if (
    authorization.status !== "READY" ||
    activationSourceContext === null ||
    activationSourceContext.sourceReferenceId !==
      authorization.sourceReferenceId
  ) {
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason={
          authorization.status !== "READY"
            ? authorization.guardReason
            : "REALITY_ACTIVATION_SOURCE_CONTEXT_NOT_AVAILABLE"
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
