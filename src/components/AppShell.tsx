import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { flowSteps } from "../data/mockFlow";
import type { ReactNode } from "react";
import { TimeSandglassReadout } from "./visual/TimeSandglassReadout";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const isLaunchEntry = location.pathname === "/" || location.pathname === "/launch" || location.pathname === "/launch-lab";
  const isProductionDynamics = location.pathname === "/dynamics";

  if (isLaunchEntry || isProductionDynamics) {
    return <>{children}</>;
  }

  return (
    <div className="gy-mobile-preview-viewport">
      <div className="app-shell guanyao-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">GUANYAO SANDBOX H5</p>
            <h1>观爻 1.0 体验母版</h1>
          </div>
          <nav className="flow-nav" aria-label="主链路">
            {flowSteps.map((step) => (
              <NavLink key={step.path} to={step.path}>
                {step.code}
              </NavLink>
            ))}
          </nav>
        </header>
        <TimeSandglassReadout />
        <main>{children}</main>
      </div>
    </div>
  );
}
