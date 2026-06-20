import type { ReactNode } from "react";

type GyMobilePreviewFrameProps = {
  background?: string;
  children: ReactNode;
};

export function GyMobilePreviewFrame({ background = "#000", children }: GyMobilePreviewFrameProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(100vw, calc(100dvh * 9 / 16))",
          height: "min(100dvh, calc(100vw * 16 / 9))",
          maxWidth: "100vw",
          maxHeight: "100dvh",
          overflow: "hidden",
          background,
        }}
      >
        {children}
      </div>
    </div>
  );
}
