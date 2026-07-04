import type { CSSProperties } from "react";

type PreviewUser = "new" | "old";

type PreviewStep = {
  label: string;
  detail: string;
};

const PAGE_STYLE: CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: 24,
  background:
    "radial-gradient(circle at 50% 35%, rgba(205, 178, 115, 0.16), transparent 34%), #070512",
  color: "#f5ead6",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const PANEL_STYLE: CSSProperties = {
  width: "min(680px, 100%)",
  display: "grid",
  gap: 24,
};

const EYEBROW_STYLE: CSSProperties = {
  margin: 0,
  color: "rgba(245, 234, 214, 0.58)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0,
};

const TITLE_STYLE: CSSProperties = {
  margin: 0,
  fontSize: 36,
  lineHeight: 1.12,
  letterSpacing: 0,
};

const COPY_STYLE: CSSProperties = {
  margin: 0,
  maxWidth: 560,
  color: "rgba(245, 234, 214, 0.72)",
  fontSize: 15,
  lineHeight: 1.7,
};

const MODE_STYLE: CSSProperties = {
  width: "fit-content",
  padding: "8px 12px",
  border: "1px solid rgba(245, 234, 214, 0.18)",
  borderRadius: 8,
  color: "#e6c983",
  background: "rgba(245, 234, 214, 0.06)",
  fontSize: 14,
  fontWeight: 700,
};

const FLOW_STYLE: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 0,
  margin: 0,
  listStyle: "none",
};

const STEP_STYLE: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 18,
  border: "1px solid rgba(245, 234, 214, 0.14)",
  borderRadius: 8,
  background: "rgba(255, 255, 255, 0.035)",
};

const STEP_LABEL_STYLE: CSSProperties = {
  margin: 0,
  color: "#f1d58c",
  fontSize: 16,
  fontWeight: 800,
};

const STEP_DETAIL_STYLE: CSSProperties = {
  margin: 0,
  color: "rgba(245, 234, 214, 0.66)",
  fontSize: 14,
  lineHeight: 1.55,
};

function getPreviewUser(): PreviewUser {
  if (typeof window === "undefined") return "new";

  const value = new URLSearchParams(window.location.search).get("previewUser");
  return value === "old" ? "old" : "new";
}

function getPreviewSteps(previewUser: PreviewUser): PreviewStep[] {
  if (previewUser === "old") {
    return [
      {
        label: "OLD_USER",
        detail: "Existing baseline context is simulated.",
      },
      {
        label: "PRESSURE_SEED_LOADING",
        detail: "Preview enters pressure seed loading directly.",
      },
    ];
  }

  return [
    {
      label: "NEW_USER",
      detail: "No baseline context is simulated.",
    },
    {
      label: "ORIGINAL_COORDINATE_LOADING",
      detail: "Preview loads original coordinate setup first.",
    },
    {
      label: "PRESSURE_FLOW",
      detail: "Preview continues into pressure seed flow after baseline setup.",
    },
  ];
}

export function LaunchLabPreview() {
  const previewUser = getPreviewUser();
  const steps = getPreviewSteps(previewUser);

  return (
    <main style={PAGE_STYLE} aria-label="Entry user path preview">
      <section style={PANEL_STYLE}>
        <div>
          <p style={EYEBROW_STYLE}>SIMULATION ONLY</p>
          <h1 style={TITLE_STYLE}>ENTRY USER PATH PREVIEW</h1>
        </div>

        <p style={COPY_STYLE}>
          Pure visualization mock. It does not read localStorage, mutate ENTRY
          state, use runtime bridge logic, or modify STARBEAST rendering.
        </p>

        <div style={MODE_STYLE}>previewUser={previewUser}</div>

        <ol style={FLOW_STYLE}>
          {steps.map((step, index) => (
            <li key={step.label} style={STEP_STYLE}>
              <p style={STEP_LABEL_STYLE}>
                {index + 1}. {step.label}
              </p>
              <p style={STEP_DETAIL_STYLE}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default LaunchLabPreview;
