// 观爻 2.0 · 行为物理验证台
// Canvas 为唯一渲染源。DOM 只承载静态标注文字。
// 不读 LocalStorage · 不触发业务事件 · 不接主链路

import "../styles/guanyaoVisualTokens.css";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { GyCanvasLab } from "../canvas/GyCanvasLab";

export function VisualSystemLabPage() {
  return (
    <GyMobilePreviewFrame background="#000">
      {/* Canvas 占满全屏 */}
      <GyCanvasLab
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      />

      {/* 极小标注 — 只识别身份，不展示开发面板 */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        pointerEvents: "none",
      }}>
        <span style={{
          fontSize: 9,
          letterSpacing: "0.22em",
          color: "rgba(199,169,107,0.28)",
          fontFamily: "monospace",
        }}>
          观爻
        </span>
        <span style={{
          fontSize: 9,
          letterSpacing: "0.14em",
          color: "rgba(228,231,234,0.12)",
          fontFamily: "monospace",
        }}>
          行为的物理回声
        </span>
      </div>
    </GyMobilePreviewFrame>
  );
}
