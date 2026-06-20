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
          // 自适应：高度永远铺满（手机无竖向黑边）；宽度 = min(满屏, 竖屏 9:16 列)
          //   手机(竖屏比例 ≤ 9:16) → 宽度取满 = 满屏；桌面(横向) → 居中竖屏列、填满高度。
          width: "min(100vw, calc(100dvh * 9 / 16))",
          height: "100dvh",
          overflow: "hidden",
          background,
        }}
      >
        {children}
      </div>
    </div>
  );
}
