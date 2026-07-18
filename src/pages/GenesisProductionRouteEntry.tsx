import { useNavigate } from "react-router-dom";
import { GenesisProductionExperiencePage } from "./GenesisProductionExperiencePage";
import {
  authorizeGenesisProductionRoute,
  GENESIS_PRODUCTION_ROUTE_TARGET,
} from "../services/genesisProductionRouteAuthorization";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import type { GenesisProductionRouteEntryBoundary } from "../types/genesisProductionRouteEntry";
import "../styles/genesis-production-experience.css";

export const GENESIS_PRODUCTION_ROUTE_ENTRY_BOUNDARY:
  GenesisProductionRouteEntryBoundary = Object.freeze({
    productionRouteEntryOnly: true,
    exactGenesisRouteOnly: true,
    inMemoryRealUserContextOnly: true,
    routeAuthorizationRequired: true,
    sourceNotReadyRecoveryRequired: true,
    sourceReferenceExcludedFromUrl: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noSourceRecalculation: true,
    noStorageRead: true,
    noStorageWrite: true,
    noLaunchNavigationMutation: true,
  });

export function GenesisProductionRouteEntry() {
  const navigate = useNavigate();
  const context = readRealUserGenesisVisualSourceContext();
  const authorization = authorizeGenesisProductionRoute({
    routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET,
    sourceReferenceId: context?.sourceReferenceId ?? null,
  });

  if (authorization.status !== "READY") {
    return (
      <main
        className="gy-genesis-production-experience gy-genesis-production-experience--source-not-ready"
        data-production-genesis-status="SOURCE_NOT_READY"
        data-guard-reason={authorization.guardReason}
      >
        <div className="gy-genesis-production-experience__recovery">
          <p role="status">SOURCE_NOT_READY</p>
          <button
            type="button"
            onClick={() => navigate("/launch-lab", { replace: true })}
          >
            返回出生信息
          </button>
        </div>
      </main>
    );
  }

  return (
    <GenesisProductionExperiencePage
      sourceReferenceId={authorization.sourceReferenceId}
    />
  );
}
