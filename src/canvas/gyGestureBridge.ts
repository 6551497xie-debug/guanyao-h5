// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 手势 → 物理映射层
// pointer/touch → PhysicsInput，不触发任何业务事件
// ═══════════════════════════════════════════════════════════════════

import type { PhysicsInput } from "./types";

export interface GestureBridgeOptions {
  target: HTMLElement;
  onInput: (input: PhysicsInput) => void;
  minSwipePx?:     number;  // 判定 swipe 最小位移，默认 6
  holdThresholdMs?: number; // 判定长按最短时长，默认 280
  holdTickMs?:      number; // 长按持续期间 tick 间隔，默认 80
}

interface PointerSession {
  id:          number;
  startX:      number;
  startY:      number;
  startTime:   number;
  lastX:       number;
  lastTime:    number;
  isHolding:   boolean;
  // 长按定时：先等 holdThresholdMs，然后每 holdTickMs 持续 emit
  holdInitTimer:   number | null;
  holdTickInterval: number | null;
}

function velPxMs(dx: number, dtMs: number): number {
  return dtMs > 0 ? Math.abs(dx) / dtMs : 0;
}
function normProgress(absDx: number, containerW: number): number {
  return Math.min(1, absDx / Math.max(1, containerW));
}

export class GyGestureBridge {
  private target:          HTMLElement;
  private onInput:         (input: PhysicsInput) => void;
  private minSwipePx:      number;
  private holdThresholdMs: number;
  private holdTickMs:      number;
  private sessions = new Map<number, PointerSession>();

  constructor(opts: GestureBridgeOptions) {
    this.target          = opts.target;
    this.onInput         = opts.onInput;
    this.minSwipePx      = opts.minSwipePx      ?? 6;
    this.holdThresholdMs = opts.holdThresholdMs ?? 280;
    this.holdTickMs      = opts.holdTickMs      ?? 80;
    this._bind();
  }

  private _bind(): void {
    this.target.addEventListener("pointerdown",   this._onDown,   { passive: true });
    this.target.addEventListener("pointermove",   this._onMove,   { passive: true });
    this.target.addEventListener("pointerup",     this._onUp,     { passive: true });
    this.target.addEventListener("pointercancel", this._onCancel, { passive: true });
  }

  private _onDown = (e: PointerEvent): void => {
    const s: PointerSession = {
      id: e.pointerId, startX: e.clientX, startY: e.clientY,
      startTime: e.timeStamp, lastX: e.clientX, lastTime: e.timeStamp,
      isHolding: false, holdInitTimer: null, holdTickInterval: null,
    };

    // 1. 初始等待 holdThresholdMs
    s.holdInitTimer = window.setTimeout(() => {
      s.isHolding = true;
      // 2. 首次 hold 事件
      this._emitHold(s, e.timeStamp);
      // 3. 持续 tick：每 holdTickMs 再次 emit，张力持续累积
      s.holdTickInterval = window.setInterval(() => {
        this._emitHold(s, performance.now());
      }, this.holdTickMs);
    }, this.holdThresholdMs);

    this.sessions.set(e.pointerId, s);
  };

  // 发送 hold-start，holdMs 取当前累计时间
  private _emitHold(s: PointerSession, nowMs: number): void {
    this.onInput({
      kind: "hold-start",
      progress: 0,
      holdMs: nowMs - s.startTime,
      velocityPxMs: 0,
    });
  }

  private _onMove = (e: PointerEvent): void => {
    const s = this.sessions.get(e.pointerId);
    if (!s) return;

    const dx = e.clientX - s.startX;
    const absDx = Math.abs(dx);

    // 未达到位移阈值：不算 swipe，保留 hold 计时
    if (absDx < this.minSwipePx) return;

    // 开始移动：取消长按初始计时（但已进入 hold 状态的不取消 tick）
    if (!s.isHolding && s.holdInitTimer !== null) {
      window.clearTimeout(s.holdInitTimer);
      s.holdInitTimer = null;
    }

    const dt  = e.timeStamp - s.lastTime;
    const vel = velPxMs(e.clientX - s.lastX, dt);
    const w   = this.target.offsetWidth;

    this.onInput({
      kind:         dx > 0 ? "swipe-right" : "swipe-left",
      progress:     normProgress(absDx, w),
      holdMs:       0,
      velocityPxMs: vel,
    });

    s.lastX    = e.clientX;
    s.lastTime = e.timeStamp;
  };

  private _onUp = (e: PointerEvent): void => {
    const s = this.sessions.get(e.pointerId);
    if (!s) return;
    this._clearHold(s);

    const dx    = e.clientX - s.startX;
    const absDx = Math.abs(dx);
    const dt    = e.timeStamp - s.startTime;
    const vel   = velPxMs(dx, dt);
    const w     = this.target.offsetWidth;
    const isTap = absDx < this.minSwipePx && !s.isHolding;

    if (isTap) {
      this.onInput({ kind: "tap", progress: 0, holdMs: 0, velocityPxMs: 0 });
    } else if (s.isHolding && absDx < this.minSwipePx) {
      // 纯长按松手
      this.onInput({ kind: "hold-release", progress: 0, holdMs: e.timeStamp - s.startTime, velocityPxMs: 0 });
    } else {
      // swipe 松手：补发末帧
      this.onInput({
        kind:         dx > 0 ? "swipe-right" : "swipe-left",
        progress:     normProgress(absDx, w),
        holdMs:       0,
        velocityPxMs: vel,
      });
    }

    this.sessions.delete(e.pointerId);
  };

  private _onCancel = (e: PointerEvent): void => {
    const s = this.sessions.get(e.pointerId);
    if (s) { this._clearHold(s); }
    this.sessions.delete(e.pointerId);
    this.onInput({ kind: "hold-release", progress: 0, holdMs: 0, velocityPxMs: 0 });
  };

  private _clearHold(s: PointerSession): void {
    if (s.holdInitTimer   !== null) { window.clearTimeout(s.holdInitTimer);     s.holdInitTimer   = null; }
    if (s.holdTickInterval !== null) { window.clearInterval(s.holdTickInterval); s.holdTickInterval = null; }
  }

  destroy(): void {
    this.target.removeEventListener("pointerdown",   this._onDown);
    this.target.removeEventListener("pointermove",   this._onMove);
    this.target.removeEventListener("pointerup",     this._onUp);
    this.target.removeEventListener("pointercancel", this._onCancel);
    for (const s of this.sessions.values()) this._clearHold(s);
    this.sessions.clear();
  }
}
