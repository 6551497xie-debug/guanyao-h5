import type {
  RealityProductionHostBoundary,
  RealityProductionHostProps,
} from "../types/realityProductionRouteEntry";

export const REALITY_PRODUCTION_HOST_BOUNDARY:
  RealityProductionHostBoundary = Object.freeze({
    productionRealityHostOnly: true,
    authorizedRealitySourceOnly: true,
    entryReadyPresentationOnly: true,
    pressureRecognitionNotStarted: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noLegacyDynamicsRuntime: true,
    noSourceMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
    noNavigationMutation: true,
  });

export function RealityProductionHost({
  routeAuthorization,
}: RealityProductionHostProps) {
  const sourceContext = routeAuthorization.sourceContext;

  return (
    <main
      data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"
      data-reality-production-host-state="ENTRY_READY"
      data-source-experience-mode={sourceContext.sourceExperienceMode}
      data-source-provenance={sourceContext.sourceProvenance}
      data-source-reference-id={sourceContext.sourceReferenceId}
      data-pressure-recognition-state={sourceContext.pressureRecognitionState}
    >
      <p role="status">REALITY_ENTRY_READY</p>
    </main>
  );
}
