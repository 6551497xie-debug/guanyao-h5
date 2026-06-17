import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSession } from "../../services/sessionService";
import { getTimeSandglassState } from "../../services/timeSandglassService";
import type { TimeSandglassState } from "../../types";

const statusLabel: Record<TimeSandglassState["status"], string> = {
  stable: "稳定",
  low: "低位",
  empty: "空置",
  recharging: "回充",
  mock_paid: "已确认",
};

function readCurrentSandglass(): TimeSandglassState | null {
  const session = getSession();
  return session.timeSandglass ?? session.energyState ?? getTimeSandglassState();
}

export function TimeSandglassReadout() {
  const location = useLocation();
  const [sandglass, setSandglass] = useState<TimeSandglassState | null>(() => readCurrentSandglass());

  useEffect(() => {
    const refreshSandglass = () => setSandglass(readCurrentSandglass());
    refreshSandglass();
    window.addEventListener("storage", refreshSandglass);
    window.addEventListener("guanyao:timeSandglass", refreshSandglass);

    return () => {
      window.removeEventListener("storage", refreshSandglass);
      window.removeEventListener("guanyao:timeSandglass", refreshSandglass);
    };
  }, [location.pathname]);

  if (!sandglass || location.pathname === "/") {
    return null;
  }

  return (
    <aside className="gy-time-sandglass-readout" aria-label="时间沙漏">
      <span>时间沙漏</span>
      <strong>
        {sandglass.currentEnergy}
        {sandglass.unitName}
      </strong>
      <em>{statusLabel[sandglass.status]}</em>
    </aside>
  );
}
