import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AxisLinePage } from "./pages/AxisLinePage";
import { ChronoAxisPage } from "./pages/ChronoAxisPage";
import { ChronoLab } from "./pages/ChronoLab";
import { BreachLab } from "./pages/BreachLab";
import { GenesisLab } from "./pages/GenesisLab";
import { GoldenCaliperLab } from "./pages/GoldenCaliperLab";
import { GravityProductionRouteEntry } from "./pages/GravityProductionRouteEntry";
import { GravityDevelopmentFixtureRouteEntry } from "./pages/GravityDevelopmentFixtureRouteEntry";
import { HexagramCardLabPage } from "./pages/HexagramCardLabPage";
import { LaunchLab } from "./pages/LaunchLab";
import { LaunchPage } from "./pages/LaunchPage";
import { MotherLab } from "./pages/MotherLab";
import { StarbeastLab } from "./pages/StarbeastLab";
import { VisualSystemLabPage } from "./pages/VisualSystemLabPage";
import { previewRoutes } from "./router/previewRoutes";
import { GUANYAO_ROUTES, LEGACY_ROUTE_REDIRECTS } from "./routes/guanyaoRoutes";
import {
  failRealityEncounterAcceptance,
  readCurrentRealityEncounterIntent,
  retryRealityEncounterAcceptance,
} from "./services/xinmaiRealityEncounterIntentController";
import {
  createRealityExplicitLeaveRequestFromIntent,
  executeRealityExplicitLeaveTermination,
} from "./services/realityExplicitLeaveTerminationTransaction";
import {
  beginRealityExplicitLeaveNavigationDelivery,
  consumeReturningLifeWorldDeliveryOutcome,
  createIdleRealityExplicitLeaveNavigationDeliveryState,
  markRealityExplicitLeaveNavigationRequested,
  markRealityExplicitLeaveNavigationRetryable,
  retryRealityExplicitLeaveNavigationDelivery,
} from "./services/realityExplicitLeaveNavigationDeliveryTransition";
import {
  invokeRealityExplicitLeaveNavigation,
  projectRealityExplicitLeaveNavigationDeliveryTicket,
} from "./services/realityExplicitLeaveNavigationDeliveryRuntimePort";
import type {
  RealityExplicitLeaveRequest,
  RealityExplicitLeaveUiState,
  RealityProductionRouteEntryProps,
} from "./types/realityProductionRouteEntry";
import type {
  RealityExplicitLeaveNavigationDeliveryState,
  ReturningLifeWorldDeliveryOutcome,
} from "./types/realityExplicitLeaveNavigationDelivery";
import "./styles/reality-pressure-presentation.css";

const GenesisProductionRouteEntry = lazy(() =>
  import("./pages/GenesisProductionRouteEntry").then((module) => ({
    default: module.GenesisProductionRouteEntry,
  })),
);

const PersonalityRingPage = lazy(() =>
  import("./pages/PersonalityRingPage").then((module) => ({
    default: module.PersonalityRingPage,
  })),
);

const XinmaiLivedGrowthAcceptancePage = import.meta.env.DEV
  ? lazy(() =>
      import("./pages/XinmaiLivedGrowthAcceptancePage").then(
        (module) => ({
          default: module.XinmaiLivedGrowthAcceptancePage,
        }),
      ),
    )
  : null;

function LifeUniverseRouteFallback() {
  return (
    <div
      className="xinmai-continuous-scene-route-pending"
      role="status"
      aria-live="polite"
      data-continuous-scene-route-pending="TRUE"
    >
      正在确认旅程入口
    </div>
  );
}

function LegacyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />;
}

type RealityRouteLoadBoundaryProps = Readonly<{
  children: ReactNode;
  onRetry: () => void;
  explicitLeaveState: RealityExplicitLeaveUiState;
  onExplicitLeaveRequest: (
    request: RealityExplicitLeaveRequest,
  ) => void;
  onReturnToLifeWorld: () => void;
}>;

type RealityRouteLoadBoundaryState = Readonly<{
  failed: boolean;
}>;

class RealityRouteLoadBoundary extends Component<
  RealityRouteLoadBoundaryProps,
  RealityRouteLoadBoundaryState
> {
  state: RealityRouteLoadBoundaryState = Object.freeze({
    failed: false,
  });

  static getDerivedStateFromError(): RealityRouteLoadBoundaryState {
    return Object.freeze({ failed: true });
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    const currentIntent = readCurrentRealityEncounterIntent();
    if (
      currentIntent !== null &&
      (currentIntent.state === "READY_TO_ENTER_REALITY" ||
        currentIntent.state === "ACCEPTING_REALITY" ||
        currentIntent.state === "RECOVERING")
    ) {
      void failRealityEncounterAcceptance({
        intentReferenceId: currentIntent.intentReferenceId,
        encounterCycleId: currentIntent.encounterCycleId,
        intentRevision: currentIntent.revision,
        stage: "ROUTE_LOAD",
        reason: "ROUTE_LOAD_UNAVAILABLE",
      });
    }
  }

  private retry = async () => {
    const currentIntent = readCurrentRealityEncounterIntent();
    if (
      currentIntent === null ||
      currentIntent.state !== "FAILED_RETRYABLE"
    ) {
      return;
    }
    const retryResult = await retryRealityEncounterAcceptance({
      intentReferenceId: currentIntent.intentReferenceId,
    });
    if (retryResult.status !== "READY") return;
    this.setState({ failed: false }, this.props.onRetry);
  };

  private explicitLeave = () => {
    const currentIntent = readCurrentRealityEncounterIntent();
    const request =
      currentIntent === null
        ? null
        : createRealityExplicitLeaveRequestFromIntent(currentIntent);
    if (request === null) {
      this.props.onReturnToLifeWorld();
      return;
    }
    this.props.onExplicitLeaveRequest(request);
  };

  render() {
    if (!this.state.failed) return this.props.children;
    const currentIntent = readCurrentRealityEncounterIntent();
    const explicitLeavePending =
      this.props.explicitLeaveState.status === "PENDING";
    return (
      <main
        className="gy-reality-route-guard"
        data-production-reality-status="ROUTE_LOAD_UNAVAILABLE"
        data-reality-intent-authority={
          currentIntent?.state ?? "ABSENT"
        }
        data-reality-encounter-cycle-id={
          currentIntent?.encounterCycleId ?? "NONE"
        }
      >
        <p role="status">现实入口暂时无法打开。已有记录会保留，你可以重试或返回旅程入口。</p>
        <button
          type="button"
          data-interaction="RETRY_SAME_REALITY_ENCOUNTER"
          onClick={this.retry}
        >
          重试打开现实入口
        </button>
        <button
          type="button"
          data-interaction="REALITY_EXPLICIT_LEAVE"
          disabled={explicitLeavePending}
          onClick={this.explicitLeave}
        >
          {explicitLeavePending
            ? "正在退出当前现实情境"
            : "退出并返回旅程入口"}
        </button>
        {this.props.explicitLeaveState.status === "RETRYABLE" ? (
          <p role="status" data-reality-explicit-leave-feedback="RETRYABLE">
            这一轮还没有完整停下，可以再试一次。
          </p>
        ) : null}
      </main>
    );
  }
}

type RealityProductionRouteRuntimeProps = Readonly<{
  onExplicitLeaveTerminationConfirmed: (
    request: RealityExplicitLeaveRequest,
  ) => void;
}>;

function RealityProductionRouteRuntime({
  onExplicitLeaveTerminationConfirmed,
}: RealityProductionRouteRuntimeProps) {
  const navigate = useNavigate();
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [explicitLeaveState, setExplicitLeaveState] =
    useState<RealityExplicitLeaveUiState>(() =>
      Object.freeze({
        status: "IDLE" as const,
        transactionKey: null,
        reason: null,
      }),
    );
  const explicitLeaveInFlightRef = useRef<string | null>(null);
  const RealityProductionRouteEntry = useMemo(
    () =>
      lazy(() =>
        import("./pages/RealityProductionRouteEntry").then(
          (module) => ({
            default: module.RealityProductionRouteEntry,
          }),
        ),
    ),
    [loadAttempt],
  );
  const returnToLifeWorld = useCallback(() => {
    navigate("/launch-lab", { replace: true });
  }, [navigate]);
  const requestExplicitLeave = useCallback<
    RealityProductionRouteEntryProps["onExplicitLeaveRequest"]
  >(
    async (request) => {
      const transactionKey = [
        request.intentReferenceId,
        request.encounterCycleId,
        String(request.expectedIntentRevision),
        request.terminalReason,
      ].join("|");
      if (explicitLeaveInFlightRef.current !== null) return;
      explicitLeaveInFlightRef.current = transactionKey;
      setExplicitLeaveState(
        Object.freeze({
          status: "PENDING" as const,
          transactionKey,
          reason: null,
        }),
      );
      const result =
        await executeRealityExplicitLeaveTermination(request);
      if (result.status === "TERMINATED_AND_LEFT") {
        onExplicitLeaveTerminationConfirmed(request);
        return;
      }
      if (result.status === "NO_ACTIVE_ENCOUNTER") {
        navigate("/launch-lab", { replace: true });
        return;
      }
      explicitLeaveInFlightRef.current = null;
      setExplicitLeaveState(
        Object.freeze({
          status: "RETRYABLE" as const,
          transactionKey,
          reason: result.reason,
        }),
      );
    },
    [navigate, onExplicitLeaveTerminationConfirmed],
  );
  const retryRouteLoad = useCallback(() => {
    explicitLeaveInFlightRef.current = null;
    setExplicitLeaveState(
      Object.freeze({
        status: "IDLE" as const,
        transactionKey: null,
        reason: null,
      }),
    );
    setLoadAttempt((current) => current + 1);
  }, []);
  return (
    <RealityRouteLoadBoundary
      key={loadAttempt}
      onRetry={retryRouteLoad}
      explicitLeaveState={explicitLeaveState}
      onExplicitLeaveRequest={requestExplicitLeave}
      onReturnToLifeWorld={returnToLifeWorld}
    >
      <Suspense fallback={<LifeUniverseRouteFallback />}>
        <RealityProductionRouteEntry
          explicitLeaveState={explicitLeaveState}
          onExplicitLeaveRequest={requestExplicitLeave}
          onReturnToLifeWorld={returnToLifeWorld}
        />
      </Suspense>
    </RealityRouteLoadBoundary>
  );
}

// Production begins inside the already-living universe. The standalone brand
// prelude remains available at /genesis-lab as an isolated visual prototype.
function EntryRouter() {
  return <LaunchLab />;
}

export default function App() {
  const navigate = useNavigate();
  const [
    explicitLeaveNavigationDelivery,
    setExplicitLeaveNavigationDelivery,
  ] = useState<RealityExplicitLeaveNavigationDeliveryState>(
    createIdleRealityExplicitLeaveNavigationDeliveryState,
  );
  const navigationRequestKeyRef = useRef<string | null>(null);

  const confirmExplicitLeaveTermination = useCallback(
    (request: RealityExplicitLeaveRequest) => {
      setExplicitLeaveNavigationDelivery((current) => {
        const next = beginRealityExplicitLeaveNavigationDelivery(
          request,
          new Date().toISOString(),
        );
        if (
          current.status !== "IDLE" &&
          current.ticket.deliveryReferenceId ===
            next.ticket.deliveryReferenceId
        ) {
          return current;
        }
        if (
          current.status !== "IDLE" &&
          current.status !== "LIFE_WORLD_DELIVERED"
        ) {
          return current;
        }
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    if (
      explicitLeaveNavigationDelivery.status !==
      "TERMINATION_CONFIRMED_NAVIGATION_PENDING"
    ) {
      return;
    }
    const ticket = explicitLeaveNavigationDelivery.ticket;
    const requestKey = `${ticket.deliveryReferenceId}:${ticket.deliveryAttempt}`;
    if (navigationRequestKeyRef.current === requestKey) return;
    navigationRequestKeyRef.current = requestKey;
    setExplicitLeaveNavigationDelivery((current) =>
      current.status ===
        "TERMINATION_CONFIRMED_NAVIGATION_PENDING" &&
      current.ticket.deliveryReferenceId ===
        ticket.deliveryReferenceId &&
      current.ticket.deliveryAttempt === ticket.deliveryAttempt
        ? markRealityExplicitLeaveNavigationRequested(
            current,
            new Date().toISOString(),
          )
        : current,
    );
    try {
      invokeRealityExplicitLeaveNavigation(navigate, ticket);
    } catch {
      setExplicitLeaveNavigationDelivery((current) =>
        current.status !== "IDLE" &&
        current.ticket.deliveryReferenceId ===
          ticket.deliveryReferenceId &&
        current.ticket.deliveryAttempt === ticket.deliveryAttempt
          ? markRealityExplicitLeaveNavigationRetryable(
              current,
              "NAVIGATION_INVOCATION_FAILED",
            )
          : current,
      );
    }
  }, [explicitLeaveNavigationDelivery, navigate]);

  useEffect(() => {
    if (
      explicitLeaveNavigationDelivery.status !==
      "NAVIGATION_REQUESTED"
    ) {
      return;
    }
    const ticket = explicitLeaveNavigationDelivery.ticket;
    const watchdog = window.setTimeout(() => {
      setExplicitLeaveNavigationDelivery((current) =>
        current.status === "NAVIGATION_REQUESTED" &&
        current.ticket.deliveryReferenceId ===
          ticket.deliveryReferenceId &&
        current.ticket.deliveryAttempt === ticket.deliveryAttempt
          ? markRealityExplicitLeaveNavigationRetryable(
              current,
              "NAVIGATION_OUTCOME_WATCHDOG_EXPIRED",
            )
          : current,
      );
    }, 8_000);
    return () => window.clearTimeout(watchdog);
  }, [explicitLeaveNavigationDelivery]);

  const consumeLifeWorldDeliveryOutcome = useCallback(
    (outcome: ReturningLifeWorldDeliveryOutcome) => {
      setExplicitLeaveNavigationDelivery((current) => {
        const consumption =
          consumeReturningLifeWorldDeliveryOutcome(
            current,
            outcome,
          );
        return consumption.state;
      });
    },
    [],
  );

  useEffect(() => {
    if (
      explicitLeaveNavigationDelivery.status !==
      "LIFE_WORLD_DELIVERED"
    ) {
      return;
    }
    navigationRequestKeyRef.current = null;
    setExplicitLeaveNavigationDelivery(
      createIdleRealityExplicitLeaveNavigationDeliveryState(),
    );
  }, [explicitLeaveNavigationDelivery]);

  const retryLifeWorldNavigation = useCallback(() => {
    setExplicitLeaveNavigationDelivery((current) =>
      retryRealityExplicitLeaveNavigationDelivery(current),
    );
  }, []);

  const launchDeliveryTicket =
    explicitLeaveNavigationDelivery.status ===
    "NAVIGATION_REQUESTED"
      ? projectRealityExplicitLeaveNavigationDeliveryTicket(
          explicitLeaveNavigationDelivery.ticket,
        )
      : null;
  const navigationDeliveryVisible =
    explicitLeaveNavigationDelivery.status ===
      "TERMINATION_CONFIRMED_NAVIGATION_PENDING" ||
    explicitLeaveNavigationDelivery.status ===
      "NAVIGATION_REQUESTED" ||
    explicitLeaveNavigationDelivery.status ===
      "NAVIGATION_RETRYABLE";

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<EntryRouter />} />
        <Route path={GUANYAO_ROUTES.launch} element={<EntryRouter />} />
        <Route path="/launch-legacy" element={<LaunchPage />} />
        <Route path="/chrono-axis" element={<ChronoAxisPage />} />
        <Route path={GUANYAO_ROUTES.motherCode} element={<LegacyRedirect to="/launch-lab" />} />
        <Route path={GUANYAO_ROUTES.pressureSeed} element={<LegacyRedirect to="/launch-lab" />} />
        <Route path={GUANYAO_ROUTES.hexagramStamp} element={<LegacyRedirect to="/launch-lab" />} />
        <Route path={GUANYAO_ROUTES.dynamics} element={<GravityProductionRouteEntry />} />
        {import.meta.env.DEV ? (
          <>
            <Route
              path="/dynamics-dev"
              element={<GravityDevelopmentFixtureRouteEntry />}
            />
            <Route
              path="/xinmai-lived-growth-acceptance"
              element={
                XinmaiLivedGrowthAcceptancePage ? (
                  <Suspense fallback={<LifeUniverseRouteFallback />}>
                    <XinmaiLivedGrowthAcceptancePage />
                  </Suspense>
                ) : null
              }
            />
          </>
        ) : null}
        <Route path={GUANYAO_ROUTES.breachScan} element={<LegacyRedirect to="/launch-lab" />} />
        <Route path={GUANYAO_ROUTES.yaoDevice} element={<LegacyRedirect to="/launch-lab" />} />
        <Route path={GUANYAO_ROUTES.repairMethod} element={<LegacyRedirect to="/launch-lab" />} />
        <Route
          path={GUANYAO_ROUTES.archive}
          element={
            <Suspense fallback={<LifeUniverseRouteFallback />}>
              <PersonalityRingPage />
            </Suspense>
          }
        />
        <Route path="/hexagram-card-lab" element={<HexagramCardLabPage />} />
        <Route path="/visual-system-lab" element={<VisualSystemLabPage />} />
        <Route path="/axis-lab" element={<AxisLinePage />} />
        <Route path="/golden-lab" element={<GoldenCaliperLab />} />
        <Route path="/genesis-lab" element={<GenesisLab />} />
        <Route path="/chrono-lab" element={<ChronoLab />} />
        <Route path="/return-lab" element={<LegacyRedirect to="/launch-lab" />} />
        <Route path="/return-entry" element={<LegacyRedirect to="/launch-lab" />} />
        <Route path="/new-entry" element={<EntryRouter />} />
        <Route path="/mother-lab" element={<MotherLab />} />
        <Route path="/breach-lab" element={<BreachLab />} />
        <Route path="/starbeast-lab" element={<StarbeastLab />} />
        <Route
          path="/launch-lab"
          element={
            <LaunchLab
              explicitLeaveNavigationDeliveryTicket={
                launchDeliveryTicket
              }
              onExplicitLeaveNavigationDeliveryOutcome={
                consumeLifeWorldDeliveryOutcome
              }
            />
          }
        />
        <Route
          path={GUANYAO_ROUTES.genesis}
          element={
            <Suspense fallback={null}>
              <Suspense fallback={<LifeUniverseRouteFallback />}>
                <GenesisProductionRouteEntry />
              </Suspense>
            </Suspense>
          }
        />
        <Route
          path={GUANYAO_ROUTES.reality}
          element={
            <RealityProductionRouteRuntime
              onExplicitLeaveTerminationConfirmed={
                confirmExplicitLeaveTermination
              }
            />
          }
        />
        {previewRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/chrono" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/chrono"]} />} />
        <Route path="/identity" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/identity"]} />} />
        <Route path="/force" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/force"]} />} />
        <Route path="/scene" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/scene"]} />} />
        <Route path="/gua-field" element={<LegacyRedirect to="/launch-lab" />} />
        <Route path="/gravity" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/gravity"]} />} />
        <Route path="/collapse" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/collapse"]} />} />
        <Route path="/choice" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/choice"]} />} />
        <Route path="/migration" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/migration"]} />} />
        <Route path="/result" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/result"]} />} />
      </Routes>
      {navigationDeliveryVisible ? (
        <section
          className="gy-reality-navigation-delivery"
          role="status"
          aria-live="polite"
          data-reality-navigation-delivery={
            explicitLeaveNavigationDelivery.status
          }
        >
          <p>当前现实情境已经退出，已有记录会保留。</p>
          <strong>正在返回旅程入口。</strong>
          {explicitLeaveNavigationDelivery.status ===
          "NAVIGATION_RETRYABLE" ? (
            <button
              type="button"
              data-interaction="RETRY_LIFE_WORLD_NAVIGATION"
              onClick={retryLifeWorldNavigation}
            >
              重试返回旅程入口
            </button>
          ) : (
            <small>正在返回旅程入口</small>
          )}
        </section>
      ) : null}
    </AppShell>
  );
}
