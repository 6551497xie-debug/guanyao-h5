import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { flowSteps } from "../data/mockFlow";
import type { ReactNode } from "react";
import { TimeSandglassReadout } from "./visual/TimeSandglassReadout";
import { XinmaiEntryThreshold } from "./XinmaiEntryThreshold";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const isXinmaiThresholdRoute =
    location.pathname === "/" ||
    location.pathname === "/launch" ||
    location.pathname === "/launch-lab";
  const isLaunchEntry =
    location.pathname === "/" ||
    location.pathname === "/launch" ||
    location.pathname === "/launch-lab" ||
    location.pathname === "/genesis" ||
    location.pathname === "/reality" ||
    location.pathname === "/launch-lab-preview" ||
    location.pathname === "/starbeast-genesis-renderer-slice-preview" ||
    location.pathname === "/personal-star-beast-webgl-prototype";
  const isProductionLifeUniverse =
    location.pathname === "/dynamics" || location.pathname === "/archive";

  if (isLaunchEntry || isProductionLifeUniverse) {
    const surface =
      location.pathname === "/genesis"
        ? "GENESIS"
        : location.pathname === "/reality"
          ? "REALITY"
          : location.pathname === "/dynamics"
            ? "REFLECTION"
            : location.pathname === "/archive"
              ? "ARCHIVE"
              : "ENTRY";
    const screenRange =
      surface === "ENTRY"
        ? "0-2"
        : surface === "GENESIS"
          ? "3-6"
          : surface === "REALITY"
            ? "7"
            : surface === "REFLECTION"
              ? "8-11"
              : "12";

    return (
      <div
        className="xinmai-life-app"
        data-xinmai-surface={surface}
        data-xinmai-screen-range={screenRange}
        data-xinmai-journey="ENTER_FIND_RECOGNIZE_ACCOMPANY_UNDERSTAND_RESPOND_SEDIMENT_BECOME"
      >
        <XinmaiEntryThreshold active={isXinmaiThresholdRoute} />
        {children}
      </div>
    );
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
