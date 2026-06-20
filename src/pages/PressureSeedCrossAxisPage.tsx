import { useEffect, useMemo, useRef } from "react";
import {
  getPressureSeedSceneTriplet,
  type GuanyaoPressureSeedTriplet,
} from "../services/guanyaoPressureSeedSceneBindingService";
import type { SceneSeed } from "../types";
import type { GuanyaoAgeSegment, GuanyaoPressureSeed } from "../types/guanyaoPressureSeed";

export type PressureSeedCrossAxisSeed = {
  id: string;
  num: string;
  main: string;
  sub: string;
  seed: GuanyaoPressureSeed;
  seedIndex: SceneSeed["seedIndex"];
};

type CrossAxisState =
  | "SEED_SELECT"
  | "SEED_LOCKED"
  | "SEED_SANDIFY"
  | "WELD_TYPING"
  | "WELD_INTERACT"
  | "WELD_LOCKED"
  | "WELD_SANDIFY";

type Particle = {
  x: number;
  y: number;
  vy: number;
  alpha: number;
  color: string;
};

const color = {
  bg: "#000000",
  bone: "#555555",
  boneDark: "#222222",
  white: "#f6f3ec",
  blue: "#00B8D4",
  gold: "#C7A96B",
};

function buildCrossAxisSeeds(triplet: GuanyaoPressureSeedTriplet): PressureSeedCrossAxisSeed[] {
  return triplet.frontStage.slice(0, 3).map((frontStageSeed, index) => ({
    id: frontStageSeed.id,
    num: String(index + 1).padStart(2, "0"),
    main: frontStageSeed.surface,
    sub: frontStageSeed.shell,
    seed: triplet.seeds.find((candidate) => candidate.id === frontStageSeed.id) ?? triplet.seeds[index],
    seedIndex: (index + 1) as SceneSeed["seedIndex"],
  }));
}

function buildCrossAxisSeedGroup(excludeSeedIds: string[] = [], ageSegment?: GuanyaoAgeSegment): PressureSeedCrossAxisSeed[] {
  return buildCrossAxisSeeds(getPressureSeedSceneTriplet({ ageSegment, excludeSeedIds }));
}

type PressureSeedCrossAxisPageProps = {
  ageSegment?: GuanyaoAgeSegment;
  onComplete: (seed: PressureSeedCrossAxisSeed | undefined) => void;
};

export function PressureSeedCrossAxisPage({ ageSegment, onComplete }: PressureSeedCrossAxisPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const seeds = useMemo(() => buildCrossAxisSeedGroup([], ageSegment), [ageSegment]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const surface = canvas;

    const context = surface.getContext("2d");
    if (!context) return undefined;
    const ctx = context;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let appState: CrossAxisState = "SEED_SELECT";
    let currentSeeds = seeds;
    let groupHistory = [seeds];
    let groupIndex = 0;
    let excludedSeedIds = seeds.map((seed) => seed.id);
    let selectedSeedIndex = Math.min(1, Math.max(0, seeds.length - 1));
    let touchStartY = 0;
    let isSwitchingGroup = false;
    let verticalKnobY = 0;
    let verticalKnobTargetY = 0;
    let seedDragMode: "idle" | "load" = "idle";
    let loadProgress = 0;
    let currentLoadProgress = 0;
    let sandifyTimer = 0;
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let typeTimer = 0;
    let displayedLines = ["", "", "", ""];
    const sandParticles: Particle[] = [];
    const textLines = ["你刚刚拦住的，", "不是一个情绪。", "它是一件已经发生的事。", "这一局，已经开始成形。"];
    const rail = {
      x: 0,
      y: 0,
      w: 0,
      progress: 0,
      currentProgress: 0,
      isDragging: false,
    };
    const stage = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      pad: 0,
      axisX: 0,
    };

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      surface.width = Math.floor(width * ratio);
      surface.height = Math.floor(height * ratio);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stage.w = Math.min(width, 430);
      stage.h = height;
      stage.x = (width - stage.w) / 2;
      stage.y = 0;
      stage.pad = Math.max(28, stage.w * 0.09);
      rail.x = stage.x + stage.pad;
      rail.y = height * 0.68;
      stage.axisX = rail.x + stage.w * 0.5;
      rail.w = stage.axisX - rail.x + Math.max(10, stage.w * 0.032);
      if (appState === "SEED_SELECT") setRailToSelectedSeed();
    }

    function getSeedSelectionEndX() {
      return stage.axisX - Math.max(36, stage.w * 0.095);
    }

    function getSeedSelectionWidth() {
      return Math.max(1, getSeedSelectionEndX() - rail.x);
    }

    function getSliderX() {
      if (appState === "SEED_SELECT" && (seedDragMode === "load" || currentLoadProgress > 0.01)) {
        const startX = getSelectedSeedX();
        return startX + (rail.x + rail.w - startX) * currentLoadProgress;
      }

      if (appState === "SEED_LOCKED") {
        return rail.x + rail.w;
      }

      if (appState === "SEED_SELECT") {
        return rail.x + getSeedSelectionWidth() * rail.currentProgress;
      }

      return rail.x + rail.w * rail.currentProgress;
    }

    function getAxisTop() {
      return height * 0.25;
    }

    function getAxisBottom() {
      return rail.y + height * 0.04;
    }

    function clampVerticalKnob(y: number) {
      return Math.max(getAxisTop(), Math.min(getAxisBottom(), y));
    }

    function getSeedProgress(index: number) {
      const denominator = Math.max(1, currentSeeds.length - 1);
      return index / denominator;
    }

    function getSelectedSeedX() {
      return rail.x + getSeedSelectionWidth() * getSeedProgress(selectedSeedIndex);
    }

    function resetRail() {
      rail.progress = 0;
      rail.currentProgress = 0;
      rail.isDragging = false;
      seedDragMode = "idle";
      loadProgress = 0;
      currentLoadProgress = 0;
    }

    function setRailToSelectedSeed() {
      const denominator = Math.max(1, currentSeeds.length - 1);
      rail.progress = selectedSeedIndex / denominator;
      rail.currentProgress = rail.progress;
      loadProgress = 0;
      currentLoadProgress = 0;
    }

    function switchSeedGroup(direction: 1 | -1) {
      if (direction > 0 && groupIndex >= groupHistory.length - 1) {
        const nextGroup = buildCrossAxisSeedGroup(excludedSeedIds, ageSegment);
        const stableGroup = nextGroup.length > 0 ? nextGroup : buildCrossAxisSeedGroup([], ageSegment);
        groupHistory = [...groupHistory, stableGroup];
        excludedSeedIds = [...excludedSeedIds, ...stableGroup.map((seed) => seed.id)].slice(-36);
      }

      if (direction < 0 && groupIndex <= 0) {
        const previousGroup = buildCrossAxisSeedGroup(excludedSeedIds, ageSegment);
        const stableGroup = previousGroup.length > 0 ? previousGroup : buildCrossAxisSeedGroup([], ageSegment);
        groupHistory = [stableGroup, ...groupHistory];
        excludedSeedIds = [...excludedSeedIds, ...stableGroup.map((seed) => seed.id)].slice(-36);
        groupIndex = 1;
      }

      groupIndex = Math.max(0, Math.min(groupHistory.length - 1, groupIndex + direction));
      currentSeeds = groupHistory[groupIndex];
      selectedSeedIndex = Math.min(1, Math.max(0, currentSeeds.length - 1));
      setRailToSelectedSeed();
    }

    function getSeedHitIndex(x: number, y: number) {
      const startY = height * 0.335;
      const rowGap = Math.min(112, Math.max(92, height * 0.108));
      const maxTextWidth = Math.max(132, stage.axisX - rail.x - 16);
      if (x < rail.x - 18 || x > rail.x + maxTextWidth + 18) return -1;

      for (let index = 0; index < currentSeeds.length; index += 1) {
        const seedY = startY + index * rowGap;
        if (y >= seedY - 40 && y <= seedY + 58) return index;
      }

      return -1;
    }

    function spawnSandParticles(mode: "blue" | "gold") {
      sandParticles.length = 0;
      for (let index = 0; index < 260; index += 1) {
        sandParticles.push({
          x: rail.x + Math.random() * rail.w,
          y: height * 0.11 + Math.random() * height * 0.7,
          vy: 2.1 + Math.random() * 3.8,
          alpha: 1,
          color: mode === "gold" ? (Math.random() > 0.18 ? color.gold : color.white) : Math.random() > 0.18 ? color.bone : color.blue,
        });
      }
    }

    function wrapTextLines(text: string, maxWidth: number, maxLines: number) {
      const source = Array.from(text);
      const lines: string[] = [];
      let current = "";

      for (const character of source) {
        const next = `${current}${character}`;
        if (current && ctx.measureText(next).width > maxWidth) {
          lines.push(current);
          current = character;
          if (lines.length >= maxLines) break;
        } else {
          current = next;
        }
      }

      if (current && lines.length < maxLines) lines.push(current);
      return lines.slice(0, maxLines);
    }

    function splitSentence(text: string) {
      const normalized = text.replace(/^[-—\s]+/, "");
      return normalized.match(/[^。]+。?/g) ?? [normalized];
    }

    function buildSeedTextLines(main: string, sub: string, maxWidth: number) {
      const clauses = [...splitSentence(main), ...splitSentence(sub)];
      const lines: string[] = [];

      clauses.forEach((clause) => {
        if (lines.length >= 3) return;
        if (ctx.measureText(clause).width > maxWidth) {
          const wrapped = wrapTextLines(clause, maxWidth, 3 - lines.length);
          lines.push(...wrapped.slice(0, Math.max(0, 3 - lines.length)));
        } else {
          lines.push(clause);
        }
      });

      return lines.slice(0, 3);
    }

    function drawSeedStage() {
      ctx.fillStyle = color.bone;
      ctx.font = "10px monospace";
      ctx.fillText("SYSTEM: 04_SEED_INTERCEPT", rail.x, height * 0.06);

      ctx.fillStyle = color.white;
      ctx.font = "bold 24px monospace";
      ctx.fillText("选择当前压力种子", rail.x, height * 0.12);

      if (appState === "SEED_SANDIFY") return;

      const axisX = stage.axisX;
      const axisTop = getAxisTop();
      const axisBottom = getAxisBottom();
      const axisCenter = rail.y;
      if (verticalKnobY === 0) verticalKnobY = axisTop;
      if (verticalKnobTargetY === 0) verticalKnobTargetY = axisTop;
      verticalKnobY += (verticalKnobTargetY - verticalKnobY) * 0.22;

      ctx.strokeStyle = "rgba(0,184,212,0.34)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(axisX, axisTop);
      ctx.lineTo(axisX, axisBottom);
      ctx.stroke();

      ctx.strokeStyle = "rgba(0,184,212,0.18)";
      [axisCenter, axisBottom].forEach((tickY) => {
        ctx.beginPath();
        ctx.moveTo(axisX - 5, tickY);
        ctx.lineTo(axisX + 5, tickY);
        ctx.stroke();
      });
      ctx.fillStyle = color.blue;
      ctx.beginPath();
      ctx.arc(axisX, verticalKnobY, 3.2, 0, Math.PI * 2);
      ctx.fill();

      const startY = height * 0.335;
      const rowGap = Math.min(112, Math.max(92, height * 0.108));
      const maxTextWidth = Math.max(132, stage.axisX - rail.x - 16);
      currentSeeds.forEach((seed, index) => {
        const seedY = startY + index * rowGap;
        const isSelected = index === selectedSeedIndex;
        ctx.globalAlpha = appState === "SEED_LOCKED" || isSelected ? 1 : 0.48;
        ctx.fillStyle = color.white;
        ctx.font = isSelected ? "15px monospace" : "14px monospace";
        ctx.fillText(`SEED ${seed.num}`, rail.x, seedY - 22);

        const textLines = buildSeedTextLines(seed.main, seed.sub, maxTextWidth);
        let lineY = seedY;
        textLines.forEach((line, lineIndex) => {
          ctx.fillStyle = lineIndex === textLines.length - 1 ? color.blue : color.white;
          ctx.font = lineIndex === textLines.length - 1 ? "600 12px monospace" : isSelected ? "15px monospace" : "14px monospace";
          ctx.fillText(line, rail.x, lineY);
          lineY += 18;
        });
        ctx.globalAlpha = 1;
      });
    }

    function drawWeldStage() {
      ctx.fillStyle = color.bone;
      ctx.font = "10px monospace";
      ctx.fillText("SYSTEM: 04_WELDING", rail.x, height * 0.06);

      ctx.fillStyle = color.bone;
      ctx.font = "13px monospace";
      ctx.fillText("你刚刚选中的，它不是一个情绪。也不是一个问题。", rail.x, height * 0.13);
      ctx.fillText("你的默认保护，正在被这件事牵动。", rail.x, height * 0.16);

      if (appState === "WELD_TYPING") {
        typeTimer += 1;
        if (typeTimer >= 5) {
          typeTimer = 0;
          const targetText = textLines[currentLineIndex];
          if (targetText && currentCharIndex < targetText.length) {
            displayedLines[currentLineIndex] += targetText[currentCharIndex];
            currentCharIndex += 1;
          } else if (currentLineIndex < textLines.length - 1) {
            currentLineIndex += 1;
            currentCharIndex = 0;
          } else {
            appState = "WELD_INTERACT";
          }
        }
      }

      ctx.fillStyle = color.white;
      ctx.font = "18px monospace";
      displayedLines.forEach((line, index) => {
        ctx.fillText(line, rail.x, height * (0.25 + index * 0.06));
      });

      if (appState === "WELD_LOCKED") {
        ctx.fillStyle = color.gold;
        ctx.font = "bold 20px monospace";
        ctx.fillText("因果焊接完成", rail.x, height * 0.52);
      }
    }

    function drawRail() {
      if (appState === "SEED_SANDIFY" || appState === "WELD_SANDIFY") return;

      rail.currentProgress += (rail.progress - rail.currentProgress) * 0.16;
      currentLoadProgress += (loadProgress - currentLoadProgress) * 0.18;
      const isGoldMode = appState === "WELD_LOCKED" || (appState === "WELD_INTERACT" && rail.currentProgress >= 0.95);
      const sliderX = getSliderX();
      const visualRailStartX = rail.x - 8;

      ctx.lineWidth = 1;
      ctx.strokeStyle = isGoldMode ? color.gold : appState === "SEED_LOCKED" ? color.white : color.bone;
      ctx.beginPath();
      if (appState === "WELD_INTERACT" && rail.isDragging) {
        const tensionY = Math.sin(rail.currentProgress * Math.PI) * -25;
        ctx.moveTo(visualRailStartX, rail.y);
        ctx.quadraticCurveTo(sliderX, rail.y + tensionY, rail.x + rail.w, rail.y);
      } else {
        ctx.moveTo(visualRailStartX, rail.y);
        ctx.lineTo(rail.x + rail.w, rail.y);
      }
      ctx.stroke();

      if (appState === "SEED_SELECT" && (seedDragMode === "load" || currentLoadProgress > 0.01)) {
        const loadStartX = getSelectedSeedX();
        ctx.strokeStyle = "rgba(0,184,212,0.82)";
        ctx.beginPath();
        ctx.moveTo(loadStartX, rail.y);
        ctx.lineTo(sliderX, rail.y);
        ctx.stroke();
      }

      if (appState === "SEED_SELECT") {
        currentSeeds.forEach((seed, index) => {
          const tickX = rail.x + getSeedSelectionWidth() * getSeedProgress(index);
          ctx.strokeStyle = index === selectedSeedIndex ? color.blue : color.boneDark;
          ctx.beginPath();
          ctx.moveTo(tickX, rail.y - 7);
          ctx.lineTo(tickX, rail.y + 7);
          ctx.stroke();
          ctx.fillStyle = index === selectedSeedIndex ? color.blue : color.bone;
          ctx.font = "10px monospace";
          ctx.fillText(seed.num, tickX - 6, rail.y - 14);
        });
      }

      ctx.fillStyle = isGoldMode ? color.gold : color.bone;
      ctx.font = "10px monospace";
      let labelText = "[ Ⅰ · 点击种子定点 ｜ 横轴右滑装填 ]";
      if (appState === "SEED_LOCKED") labelText = "[ 种子装填完成，正在进入因果焊接 ]";
      if (appState === "WELD_TYPING") labelText = "[ CAUSAL_WELDING_RESONATING ]";
      if (appState === "WELD_INTERACT") labelText = isGoldMode ? "[ 焊接临界完成 ]" : "[ 右滑：将压力种子与默认保护焊接 ]";
      if (appState === "WELD_LOCKED") labelText = "[ 点击任意区域进入母码场 ]";
      ctx.fillText(labelText, rail.x, rail.y + 18);

      ctx.strokeStyle = isGoldMode ? "rgba(199,169,107,0.72)" : "rgba(0,184,212,0.7)";
      ctx.beginPath();
      ctx.arc(sliderX, rail.y, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = isGoldMode ? color.gold : color.blue;
      ctx.beginPath();
      ctx.arc(sliderX, rail.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSand(mode: "blue" | "gold") {
      if (sandParticles.length === 0) spawnSandParticles(mode);
      for (let index = sandParticles.length - 1; index >= 0; index -= 1) {
        const particle = sandParticles[index];
        particle.y += particle.vy;
        particle.alpha -= 0.025;
        if (particle.alpha <= 0) {
          sandParticles.splice(index, 1);
          continue;
        }
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, 1.2, 1.2);
        ctx.globalAlpha = 1;
      }
    }

    function draw() {
      ctx.fillStyle = color.bg;
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width / 2, height * 0.4, 0, width / 2, height * 0.4, width * 0.45);
      gradient.addColorStop(0, appState.startsWith("WELD") ? "rgba(199,169,107,0.035)" : "rgba(0,184,212,0.045)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (appState.startsWith("SEED")) drawSeedStage();
      if (appState.startsWith("WELD")) drawWeldStage();
      drawRail();

      if (appState === "SEED_LOCKED") {
        sandifyTimer += 1;
        if (sandifyTimer > 18) {
          appState = "SEED_SANDIFY";
          sandifyTimer = 0;
          spawnSandParticles("blue");
        }
      }

      if (appState === "SEED_SANDIFY") {
        drawSand("blue");
        if (sandParticles.length === 0) {
          appState = "WELD_TYPING";
          resetRail();
          sandifyTimer = 0;
        }
      }

      if (appState === "WELD_SANDIFY") {
        drawSand("gold");
        if (sandParticles.length === 0) {
          onComplete(currentSeeds[selectedSeedIndex] ?? currentSeeds[0]);
        }
      }
      animationFrame = window.requestAnimationFrame(draw);
    }

    function getClientPoint(event: PointerEvent | TouchEvent) {
      if ("touches" in event) {
        const touch = event.touches[0] ?? event.changedTouches[0];
        return { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
      }
      return { x: event.clientX, y: event.clientY };
    }

    function onStart(event: PointerEvent | TouchEvent) {
      event.preventDefault();
      const { x, y } = getClientPoint(event);

      if (appState === "WELD_LOCKED") {
        appState = "WELD_SANDIFY";
        spawnSandParticles("gold");
        return;
      }

      const axisX = stage.axisX;
      const axisTop = getAxisTop();
      const axisBottom = getAxisBottom();
      const knobY = verticalKnobTargetY || axisTop;
      const isSeedVerticalKnobHit = appState === "SEED_SELECT" && Math.abs(x - axisX) < 34 && Math.abs(y - knobY) < 44;
      const isSeedVerticalAxisHit = appState === "SEED_SELECT" && Math.abs(x - axisX) < 28 && y > axisTop - 14 && y < axisBottom + 14;
      const seedHitIndex = appState === "SEED_SELECT" ? getSeedHitIndex(x, y) : -1;
      if (seedHitIndex >= 0) {
        selectedSeedIndex = seedHitIndex;
        setRailToSelectedSeed();
        return;
      }

      const sliderX = appState === "SEED_SELECT" ? getSelectedSeedX() : rail.x + rail.w * rail.progress;
      const isSeedRailHit = appState === "SEED_SELECT" && y > rail.y - 34 && y < rail.y + 34 && x >= sliderX - 18 && x <= rail.x + rail.w + 14;
      const isWeldRailHit = appState === "WELD_INTERACT" && Math.abs(x - sliderX) < 35 && Math.abs(y - rail.y) < 35;
      if (isSeedRailHit || isWeldRailHit) {
        if (appState === "SEED_SELECT") {
          rail.isDragging = true;
          seedDragMode = "load";
          loadProgress = 0;
          currentLoadProgress = 0;
          return;
        }
        if (appState === "WELD_INTERACT") rail.isDragging = true;
        return;
      }

      if (isSeedVerticalKnobHit || isSeedVerticalAxisHit) {
        isSwitchingGroup = true;
        touchStartY = y;
        verticalKnobTargetY = clampVerticalKnob(y);
      }
    }

    function onMove(event: PointerEvent | TouchEvent) {
      event.preventDefault();
      const { x, y } = getClientPoint(event);

      if (rail.isDragging) {
        if (appState === "SEED_SELECT") {
          const startX = getSelectedSeedX();
          const availableWidth = Math.max(1, rail.x + rail.w - startX);
          loadProgress = Math.max(0, Math.min(1, (x - startX) / availableWidth));
          return;
        }

        rail.progress = Math.max(0, Math.min(1, (x - rail.x) / rail.w));
        return;
      }

      if (isSwitchingGroup && appState === "SEED_SELECT") {
        const deltaY = y - touchStartY;
        verticalKnobTargetY = clampVerticalKnob(y);
        if (Math.abs(deltaY) > 42) {
          switchSeedGroup(deltaY < 0 ? 1 : -1);
          touchStartY = y;
        }
      }
    }

    function onEnd(event: PointerEvent | TouchEvent) {
      event.preventDefault();
      isSwitchingGroup = false;
      verticalKnobTargetY = getAxisTop();
      if (!rail.isDragging) return;
      rail.isDragging = false;

      if (appState === "SEED_SELECT") {
        if (seedDragMode === "load" && loadProgress >= 0.92) {
          loadProgress = 1;
          currentLoadProgress = 1;
          seedDragMode = "idle";
          appState = "SEED_LOCKED";
          return;
        }

        loadProgress = 0;
        seedDragMode = "idle";
        return;
      }

      if (rail.progress < 0.96) {
        const snapBack = window.setInterval(() => {
          rail.progress *= 0.65;
          if (rail.progress < 0.01) {
            rail.progress = 0;
            window.clearInterval(snapBack);
          }
        }, 16);
        return;
      }

      rail.progress = 1;
      if (appState === "WELD_INTERACT") {
        appState = "WELD_LOCKED";
      }
    }

    resize();
    window.addEventListener("resize", resize);
    surface.addEventListener("pointerdown", onStart);
    surface.addEventListener("pointermove", onMove);
    surface.addEventListener("pointerup", onEnd);
    surface.addEventListener("pointercancel", onEnd);
    surface.addEventListener("touchstart", onStart, { passive: false });
    surface.addEventListener("touchmove", onMove, { passive: false });
    surface.addEventListener("touchend", onEnd, { passive: false });
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      surface.removeEventListener("pointerdown", onStart);
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerup", onEnd);
      surface.removeEventListener("pointercancel", onEnd);
      surface.removeEventListener("touchstart", onStart);
      surface.removeEventListener("touchmove", onMove);
      surface.removeEventListener("touchend", onEnd);
    };
  }, [ageSegment, onComplete, seeds]);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="压力种子与因果焊接两屏整合实验页"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
          userSelect: "none",
        }}
      />
    </main>
  );
}
