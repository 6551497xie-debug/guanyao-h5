import { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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

const GenesisProductionRouteEntry = lazy(() =>
  import("./pages/GenesisProductionRouteEntry").then((module) => ({
    default: module.GenesisProductionRouteEntry,
  })),
);

const RealityProductionRouteEntry = lazy(() =>
  import("./pages/RealityProductionRouteEntry").then((module) => ({
    default: module.RealityProductionRouteEntry,
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
      const orbitPhase = universeSeconds * 0.025;
      context.strokeStyle = "rgba(147,172,211,0.14)";
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

// Production begins inside the already-living universe. The standalone brand
// prelude remains available at /genesis-lab as an isolated visual prototype.
function EntryRouter() {
  return <LaunchLab />;
}

export default function App() {
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
        <Route path="/launch-lab" element={<LaunchLab />} />
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
            <Suspense fallback={<LifeUniverseRouteFallback />}>
              <RealityProductionRouteEntry />
            </Suspense>
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
    </AppShell>
  );
}
