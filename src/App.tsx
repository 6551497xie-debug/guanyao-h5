import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ArchivePage } from "./pages/ArchivePage";
import { AxisLinePage } from "./pages/AxisLinePage";
import { ChoicePage } from "./pages/ChoicePage";
import { ChronoAxisPage } from "./pages/ChronoAxisPage";
import { ChronoLab } from "./pages/ChronoLab";
import { BreachLab } from "./pages/BreachLab";
import { GenesisLab } from "./pages/GenesisLab";
import { GoldenCaliperLab } from "./pages/GoldenCaliperLab";
import { GravityPage } from "./pages/GravityPage";
import { HexagramCardLabPage } from "./pages/HexagramCardLabPage";
import { HexagramStampPage } from "./pages/HexagramStampPage";
import { LaunchLab } from "./pages/LaunchLab";
import { LaunchPage } from "./pages/LaunchPage";
import { MigrationPage } from "./pages/MigrationPage";
import { MotherCodePage } from "./pages/MotherCodePage";
import { MotherLab } from "./pages/MotherLab";
import { ScenePage } from "./pages/ScenePage";
import { StarbeastLab } from "./pages/StarbeastLab";
import { VisualSystemLabPage } from "./pages/VisualSystemLabPage";
import { GUANYAO_ROUTES, LEGACY_ROUTE_REDIRECTS } from "./routes/guanyaoRoutes";

function LegacyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />;
}

// 创世序幕（00）作为正式首屏：序幕完成 → 进入母码生成流程（/mother-code）
function GenesisLaunchPage() {
  const navigate = useNavigate();
  return <GenesisLab onComplete={() => navigate(GUANYAO_ROUTES.motherCode)} />;
}

// 入口统一走星宿首屏；旧的回访坡道不再进入主链路。
function EntryRouter() {
  return <GenesisLaunchPage />;
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<EntryRouter />} />
        <Route path={GUANYAO_ROUTES.launch} element={<EntryRouter />} />
        <Route path="/launch-legacy" element={<LaunchPage />} />
        <Route path="/chrono-axis" element={<ChronoAxisPage />} />
        <Route path={GUANYAO_ROUTES.motherCode} element={<MotherLab />} />
        <Route path={GUANYAO_ROUTES.pressureSeed} element={<ScenePage />} />
        <Route path={GUANYAO_ROUTES.hexagramStamp} element={<HexagramStampPage />} />
        <Route path={GUANYAO_ROUTES.dynamics} element={<GravityPage />} />
        <Route path={GUANYAO_ROUTES.breachScan} element={<ChoicePage />} />
        <Route path={GUANYAO_ROUTES.yaoDevice} element={<MigrationPage />} />
        <Route path={GUANYAO_ROUTES.repairMethod} element={<MigrationPage />} />
        <Route path={GUANYAO_ROUTES.archive} element={<ArchivePage />} />
        <Route path="/hexagram-card-lab" element={<HexagramCardLabPage />} />
        <Route path="/visual-system-lab" element={<VisualSystemLabPage />} />
        <Route path="/axis-lab" element={<AxisLinePage />} />
        <Route path="/golden-lab" element={<GoldenCaliperLab />} />
        <Route path="/genesis-lab" element={<GenesisLab />} />
        <Route path="/chrono-lab" element={<ChronoLab />} />
        <Route path="/return-lab" element={<LegacyRedirect to="/launch-lab" />} />
        <Route path="/return-entry" element={<LegacyRedirect to="/launch-lab" />} />
        <Route path="/new-entry" element={<GenesisLaunchPage />} />
        <Route path="/mother-lab" element={<MotherLab />} />
        <Route path="/breach-lab" element={<BreachLab />} />
        <Route path="/starbeast-lab" element={<StarbeastLab />} />
        <Route path="/launch-lab" element={<LaunchLab />} />
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
