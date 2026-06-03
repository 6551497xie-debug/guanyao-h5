import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ArchivePage } from "./pages/ArchivePage";
import { ChoicePage } from "./pages/ChoicePage";
import { ChronoPage } from "./pages/ChronoPage";
import { CollapsePage } from "./pages/CollapsePage";
import { ForcePage } from "./pages/ForcePage";
import { GravityPage } from "./pages/GravityPage";
import { IdentityPage } from "./pages/IdentityPage";
import { LaunchPage } from "./pages/LaunchPage";
import { MigrationPage } from "./pages/MigrationPage";
import { ScenePage } from "./pages/ScenePage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/chrono" element={<ChronoPage />} />
        <Route path="/identity" element={<IdentityPage />} />
        <Route path="/force" element={<ForcePage />} />
        <Route path="/scene" element={<ScenePage />} />
        <Route path="/gravity" element={<GravityPage />} />
        <Route path="/collapse" element={<CollapsePage />} />
        <Route path="/choice" element={<ChoicePage />} />
        <Route path="/migration" element={<MigrationPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </AppShell>
  );
}
