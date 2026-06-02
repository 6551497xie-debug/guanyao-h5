type GravityWaveProps = {
  intensity?: "normal" | "pressure";
  variant?: "legacy" | "core";
};

export function GravityWave({ intensity = "normal", variant = "legacy" }: GravityWaveProps) {
  if (variant === "core") {
    return (
      <div className="gy-gravity-wave gyBreath" data-intensity={intensity} aria-hidden="true">
        <div className="gy-core-ring gy-core-ring--outer gyOrbitSlow" />
        <div className="gy-core-ring gy-core-ring--middle" />
        <div className="gy-core-ring gy-core-ring--inner gyPressurePulse" />
        <div className="gy-core-dot" />
      </div>
    );
  }

  return (
    <div className="gravity-wave" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
