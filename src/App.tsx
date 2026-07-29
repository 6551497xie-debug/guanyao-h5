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
import { GravityPage } from "./pages/GravityPage";
import { HexagramCardLabPage } from "./pages/HexagramCardLabPage";
import { LaunchLab } from "./pages/LaunchLab";
import { LaunchPage } from "./pages/LaunchPage";
import { MotherLab } from "./pages/MotherLab";
import { StarbeastLab } from "./pages/StarbeastLab";
import { VisualSystemLabPage } from "./pages/VisualSystemLabPage";
import { previewRoutes } from "./router/previewRoutes";
import { GUANYAO_ROUTES, LEGACY_ROUTE_REDIRECTS } from "./routes/guanyaoRoutes";
import {
  drawLifeUniverseDeepSpace2D,
  drawLifeUniverseCore2D,
} from "./renderers/lifeUniverseStarField";
import { readRealUserGenesisVisualSourceContext } from "./services/realUserGenesisVisualSourceContext";
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

function LifeUniverseRouteFallback() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;

    let animationFrame = 0;
    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      const targetWidth = Math.round(width * pixelRatio);
      const targetHeight = Math.round(height * pixelRatio);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const universeSeconds = performance.now() / 1000;
      drawLifeUniverseDeepSpace2D(
        context,
        width,
        height,
        universeSeconds,
      );
      const lifeSourceContext = readRealUserGenesisVisualSourceContext();
      const birthMansionIndex =
        lifeSourceContext?.lifeSourceSession.starbeastDerivationResult.mansionIndex ?? -1;
      const coreX = width * 0.5;
      const coreY = height * 0.48;
      const orbitRadiusX = Math.min(width * 0.43, 168);
      const orbitRadiusY = Math.min(width * 0.19, 74);
      // The accessible fallback preserves the same 28-mansion topology without
      // turning it into a rotating astrological dial. Time is carried by the
      // shared field and core breath, not by an orbiting interface.
      const orbitPhase = 0;
      context.strokeStyle = "rgba(147,172,211,0.07)";
      context.lineWidth = 1;
      context.beginPath();
      for (let index = 0; index < 28; index += 1) {
        const angle = (index / 28) * Math.PI * 2 - Math.PI / 2 + orbitPhase;
        const x = coreX + Math.cos(angle) * orbitRadiusX;
        const y = coreY + Math.sin(angle) * orbitRadiusY;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.stroke();
      for (let index = 0; index < 28; index += 1) {
        const angle = (index / 28) * Math.PI * 2 - Math.PI / 2 + orbitPhase;
        const x = coreX + Math.cos(angle) * orbitRadiusX;
        const y = coreY + Math.sin(angle) * orbitRadiusY;
        const isBirthMansion = index === birthMansionIndex;
        context.fillStyle = isBirthMansion
          ? "rgba(255,247,228,0.94)"
          : "rgba(185,203,236,0.3)";
        context.shadowColor = isBirthMansion
          ? "rgba(255,247,228,0.82)"
          : "rgba(185,203,236,0.24)";
        context.shadowBlur = isBirthMansion ? 18 : 3;
        context.beginPath();
        context.arc(x, y, isBirthMansion ? 4.2 : 1.2, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
      drawLifeUniverseCore2D(
        context,
        width,
        height,
        universeSeconds,
        0.72,
      );
      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", background: "#020306" }}
    />
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
      failRealityEncounterAcceptance({
        intentReferenceId: currentIntent.intentReferenceId,
        encounterCycleId: currentIntent.encounterCycleId,
        intentRevision: currentIntent.revision,
        stage: "ROUTE_LOAD",
        reason: "ROUTE_LOAD_UNAVAILABLE",
      });
    }
  }

  private retry = () => {
    const currentIntent = readCurrentRealityEncounterIntent();
    if (
      currentIntent === null ||
      currentIntent.state !== "FAILED_RETRYABLE"
    ) {
      return;
    }
    const retryResult = retryRealityEncounterAcceptance({
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
        <p role="status">现实入口暂时没有完整打开。</p>
        <button
          type="button"
          data-interaction="RETRY_SAME_REALITY_ENCOUNTER"
          onClick={this.retry}
        >
          继续这一轮
        </button>
        <button
          type="button"
          data-interaction="REALITY_EXPLICIT_LEAVE"
          disabled={explicitLeavePending}
          onClick={this.explicitLeave}
        >
          {explicitLeavePending
            ? "正在让这一轮安静下来"
            : "这一轮先到这里"}
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
    (request) => {
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
        executeRealityExplicitLeaveTermination(request);
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
        <Route path={GUANYAO_ROUTES.pressureSeed} element={<LegacyRedirect to={GUANYAO_ROUTES.dynamics} />} />
        <Route path={GUANYAO_ROUTES.hexagramStamp} element={<LegacyRedirect to={GUANYAO_ROUTES.dynamics} />} />
        <Route path={GUANYAO_ROUTES.dynamics} element={<GravityPage />} />
        <Route path={GUANYAO_ROUTES.breachScan} element={<LegacyRedirect to={GUANYAO_ROUTES.dynamics} />} />
        <Route path={GUANYAO_ROUTES.yaoDevice} element={<LegacyRedirect to={GUANYAO_ROUTES.dynamics} />} />
        <Route path={GUANYAO_ROUTES.repairMethod} element={<LegacyRedirect to={GUANYAO_ROUTES.dynamics} />} />
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
          <p>这一轮已经停下。</p>
          <strong>回到同一片生命星河。</strong>
          {explicitLeaveNavigationDelivery.status ===
          "NAVIGATION_RETRYABLE" ? (
            <button
              type="button"
              data-interaction="RETRY_LIFE_WORLD_NAVIGATION"
              onClick={retryLifeWorldNavigation}
            >
              回到生命世界
            </button>
          ) : (
            <small>正在回到生命世界</small>
          )}
        </section>
      ) : null}
    </AppShell>
  );
}
