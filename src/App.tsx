import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ArchivePage } from "./pages/ArchivePage";
import { ChoicePage } from "./pages/ChoicePage";
import { ChronoAxisPage } from "./pages/ChronoAxisPage";
import { ChronoPage } from "./pages/ChronoPage";
import { GravityPage } from "./pages/GravityPage";
import { HexagramCardLabPage } from "./pages/HexagramCardLabPage";
import { IdentityPage } from "./pages/IdentityPage";
import { LaunchPage } from "./pages/LaunchPage";
import { MigrationPage } from "./pages/MigrationPage";
import { MotherCodePage } from "./pages/MotherCodePage";
import { ScenePage } from "./pages/ScenePage";
import { VisualSystemLabPage } from "./pages/VisualSystemLabPage";
import { GUANYAO_ROUTES, LEGACY_ROUTE_REDIRECTS } from "./routes/guanyaoRoutes";

function LegacyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />;
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path={GUANYAO_ROUTES.launch} element={<LaunchPage />} />
        <Route path="/chrono-axis" element={<ChronoAxisPage />} />
        <Route path={GUANYAO_ROUTES.motherCode} element={<ChronoPage />} />
        <Route path={GUANYAO_ROUTES.pressureSeed} element={<ScenePage />} />
        <Route path={GUANYAO_ROUTES.pressureExposure} element={<IdentityPage />} />
        <Route path={GUANYAO_ROUTES.dynamics} element={<GravityPage />} />
        <Route path={GUANYAO_ROUTES.breachScan} element={<ChoicePage />} />
        <Route path={GUANYAO_ROUTES.yaoDevice} element={<MigrationPage />} />
        <Route path={GUANYAO_ROUTES.repairMethod} element={<MigrationPage />} />
        <Route path={GUANYAO_ROUTES.archive} element={<ArchivePage />} />
        <Route path="/hexagram-card-lab" element={<HexagramCardLabPage />} />
        <Route path="/visual-system-lab" element={<VisualSystemLabPage />} />
        <Route path="/chrono" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/chrono"]} />} />
        <Route path="/identity" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/identity"]} />} />
        <Route path="/force" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/force"]} />} />
        <Route path="/scene" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/scene"]} />} />
        <Route path="/gua-field" element={<MotherCodePage />} />
        <Route path="/gravity" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/gravity"]} />} />
        <Route path="/collapse" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/collapse"]} />} />
        <Route path="/choice" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/choice"]} />} />
        <Route path="/migration" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/migration"]} />} />
        <Route path="/result" element={<LegacyRedirect to={LEGACY_ROUTE_REDIRECTS["/result"]} />} />
      </Routes>
    </AppShell>
  );
}
