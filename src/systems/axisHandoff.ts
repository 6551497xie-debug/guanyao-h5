// 粒子守恒转场 / 一线贯穿（The One Line）：
//   上一屏沙化时把粒子快照（以视口比例存储，跨屏分辨率无关）存入本单例；
//   下一屏入场时取出，让这些粒子「重新凝结」进入场轴线 —— 视觉上同一根 1px 线贯穿全链，粒子守恒。
//   纯逻辑、无 DOM；只读真理源，刻意与各屏解耦。

export type HandoffParticle = { fx: number; fy: number; vx: number; vy: number; color: string };

let pending: { particles: HandoffParticle[]; at: number } | null = null;

// 上一屏沙化 → 写入交接（particles 用视口比例 fx/fy ∈ [0,1]）
export function setAxisHandoff(particles: HandoffParticle[]) {
  pending = { particles, at: Date.now() };
}

// 下一屏入场 → 取出并消费一次；仅接受 2.5s 内的新鲜交接（直接深链进入某屏时不误触发）
export function takeAxisHandoff(): HandoffParticle[] | null {
  if (!pending) return null;
  const fresh = Date.now() - pending.at < 2500;
  const out = fresh ? pending.particles : null;
  pending = null;
  return out;
}
