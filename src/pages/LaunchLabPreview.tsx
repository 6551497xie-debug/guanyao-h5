import type { CSSProperties } from "react";

type PreviewUser = "new" | "old";

type PreviewVisualProfile = {
  modeText: string;
  primaryText: string;
  secondaryText: string;
  starOpacity: number;
  clusterOpacity: number;
  beastGlow: number;
  aggregationDuration: string;
  fieldBlur: number;
  starScale: number;
  clusterScale: number;
  dispersion: number;
  lineOpacity: number;
  focalPull: number;
};

const STAR_POINTS = [
  [48, 8],
  [42, 18],
  [56, 20],
  [36, 32],
  [52, 34],
  [66, 35],
  [44, 47],
  [58, 50],
  [39, 61],
  [62, 66],
  [50, 78],
];

const CLUSTER_POINTS = [
  [46, 34],
  [54, 36],
  [42, 46],
  [58, 49],
  [48, 58],
  [54, 64],
  [50, 72],
];

const PAGE_STYLE: CSSProperties = {
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
  padding: 24,
  background:
    "radial-gradient(circle at 50% 48%, rgba(192, 162, 103, 0.2), transparent 34%), #060410",
  color: "#f4e7cf",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const STARFIELD_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "radial-gradient(circle at 18% 20%, rgba(235, 218, 177, 0.36) 0 1px, transparent 2px), radial-gradient(circle at 82% 28%, rgba(235, 218, 177, 0.28) 0 1px, transparent 2px), radial-gradient(circle at 28% 78%, rgba(235, 218, 177, 0.22) 0 1px, transparent 2px), radial-gradient(circle at 72% 72%, rgba(235, 218, 177, 0.3) 0 1px, transparent 2px)",
  opacity: 0.68,
};

const CONTENT_STYLE: CSSProperties = {
  position: "relative",
  zIndex: 1,
  width: "min(560px, 100%)",
  display: "grid",
  gap: 28,
  justifyItems: "center",
  textAlign: "center",
};

const COPY_GROUP_STYLE: CSSProperties = {
  display: "grid",
  gap: 10,
};

const EYEBROW_STYLE: CSSProperties = {
  margin: 0,
  color: "rgba(244, 231, 207, 0.54)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0,
};

const TITLE_STYLE: CSSProperties = {
  margin: 0,
  color: "#f1d58c",
  fontSize: "clamp(30px, 8vw, 46px)",
  lineHeight: 1.14,
  letterSpacing: 0,
};

const BODY_STYLE: CSSProperties = {
  margin: 0,
  color: "rgba(244, 231, 207, 0.72)",
  fontSize: 15,
  lineHeight: 1.75,
};

const BEAST_FIELD_STYLE: CSSProperties = {
  position: "relative",
  width: "min(360px, 82vw)",
  aspectRatio: "1 / 1.22",
};

const BEAST_AURA_STYLE: CSSProperties = {
  position: "absolute",
  inset: "13% 9%",
  borderRadius: "48% 52% 46% 54%",
  background:
    "radial-gradient(circle at 50% 45%, rgba(240, 211, 151, 0.46), rgba(156, 122, 72, 0.18) 42%, transparent 70%)",
};

const POINT_STYLE: CSSProperties = {
  position: "absolute",
  width: 7,
  height: 7,
  marginLeft: -3.5,
  marginTop: -3.5,
  borderRadius: "50%",
  background: "#f4dfac",
  boxShadow: "0 0 18px rgba(244, 223, 172, 0.76)",
};

const LINE_STYLE: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "26%",
  width: 1,
  height: "54%",
  transformOrigin: "50% 100%",
  background:
    "linear-gradient(to bottom, transparent, rgba(242, 211, 139, 0.52), transparent)",
};

const STATUS_STYLE: CSSProperties = {
  display: "grid",
  gap: 8,
};

const STATUS_MAIN_STYLE: CSSProperties = {
  margin: 0,
  color: "#f1d58c",
  fontSize: 24,
  fontWeight: 800,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const STATUS_SUB_STYLE: CSSProperties = {
  margin: 0,
  color: "rgba(244, 231, 207, 0.6)",
  fontSize: 14,
  lineHeight: 1.6,
};

function getPreviewUser(): PreviewUser {
  if (typeof window === "undefined") return "new";

  const value = new URLSearchParams(window.location.search).get("previewUser");
  return value === "old" ? "old" : "new";
}

function getVisualProfile(previewUser: PreviewUser): PreviewVisualProfile {
  if (previewUser === "old") {
    return {
      modeText: "OLD_USER / PRESSURE_SEED_LOADING",
      primaryText: "压力正在聚合…",
      secondaryText: "光点被更强的中心拉力收紧，压力密度正在成形。",
      starOpacity: 0.82,
      clusterOpacity: 1,
      beastGlow: 1,
      aggregationDuration: "1.8s",
      fieldBlur: 0,
      starScale: 1.08,
      clusterScale: 1.35,
      dispersion: 0.18,
      lineOpacity: 0.92,
      focalPull: 1,
    };
  }

  return {
    modeText: "NEW_USER / ORIGINAL_COORDINATE_LOADING",
    primaryText: "坐标正在生成…",
    secondaryText: "星光保持更大的空间距离，中心收束更柔和。",
    starOpacity: 0.34,
    clusterOpacity: 0.38,
    beastGlow: 0.48,
    aggregationDuration: "6.4s",
    fieldBlur: 1.4,
    starScale: 0.78,
    clusterScale: 0.72,
    dispersion: 1,
    lineOpacity: 0.36,
    focalPull: 0,
  };
}

function resolvePointPosition(
  left: number,
  top: number,
  profile: PreviewVisualProfile
) {
  const centerX = 50;
  const centerY = 50;
  const spread = profile.dispersion * 9;
  const pull = profile.focalPull * 5;
  const xFromCenter = left - centerX;
  const yFromCenter = top - centerY;

  return {
    left: left + (xFromCenter / 50) * spread - (xFromCenter / 50) * pull,
    top: top + (yFromCenter / 50) * spread - (yFromCenter / 50) * pull,
  };
}

export function LaunchLabPreview() {
  const previewUser = getPreviewUser();
  const profile = getVisualProfile(previewUser);

  return (
    <main style={PAGE_STYLE} aria-label="Entry user path preview">
      <div style={STARFIELD_STYLE} aria-hidden="true" />

      <section style={CONTENT_STYLE}>
        <div style={COPY_GROUP_STYLE}>
          <p style={EYEBROW_STYLE}>SIMULATION ONLY</p>
          <h1 style={TITLE_STYLE}>光兽入口路径预览</h1>
          <p style={BODY_STYLE}>
            新用户与老用户共用同一片星空，只在装填强度与压力密度上分化。
          </p>
        </div>

        <div style={BEAST_FIELD_STYLE} aria-hidden="true">
          <div
            style={{
              ...BEAST_AURA_STYLE,
              opacity: profile.beastGlow,
              filter: `blur(${profile.fieldBlur}px)`,
              transition: `opacity ${profile.aggregationDuration} ease, filter ${profile.aggregationDuration} ease`,
            }}
          />

          {[0, 24, -24, 42, -42].map((rotate) => (
            <span
              key={rotate}
              style={{
                ...LINE_STYLE,
                transform: `rotate(${rotate}deg)`,
                opacity: profile.lineOpacity,
                transition: `opacity ${profile.aggregationDuration} ease`,
              }}
            />
          ))}

          {STAR_POINTS.map(([left, top]) => {
            const point = resolvePointPosition(left, top, profile);

            return (
              <span
                key={`${left}-${top}`}
                style={{
                  ...POINT_STYLE,
                  left: `${point.left}%`,
                  top: `${point.top}%`,
                  width: 7 * profile.starScale,
                  height: 7 * profile.starScale,
                  marginLeft: -(7 * profile.starScale) / 2,
                  marginTop: -(7 * profile.starScale) / 2,
                  opacity: profile.starOpacity,
                  transition: `opacity ${profile.aggregationDuration} ease, left ${profile.aggregationDuration} ease, top ${profile.aggregationDuration} ease`,
                }}
              />
            );
          })}

          {CLUSTER_POINTS.map(([left, top]) => (
            <span
              key={`cluster-${left}-${top}`}
              style={{
                ...POINT_STYLE,
                left: `${left}%`,
                top: `${top}%`,
                width: 7 * profile.clusterScale,
                height: 7 * profile.clusterScale,
                marginLeft: -(7 * profile.clusterScale) / 2,
                marginTop: -(7 * profile.clusterScale) / 2,
                opacity: profile.clusterOpacity,
                transition: `opacity ${profile.aggregationDuration} ease`,
              }}
            />
          ))}
        </div>

        <div style={STATUS_STYLE}>
          <p style={EYEBROW_STYLE}>{profile.modeText}</p>
          <p style={STATUS_MAIN_STYLE}>{profile.primaryText}</p>
          <p style={STATUS_SUB_STYLE}>{profile.secondaryText}</p>
        </div>
      </section>
    </main>
  );
}

export default LaunchLabPreview;
