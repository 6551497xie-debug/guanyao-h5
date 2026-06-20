import { useEffect, useMemo, useRef } from "react";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { setAxisHandoff, takeAxisHandoff } from "../systems/axisHandoff";
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
    let typeHoldTimer = 0;
    let displayedLines = ["", "", "", ""];
    let weldLockPulseFired = false;
    const sandParticles: Particle[] = [];

    // 一线贯穿/粒子守恒：取上一屏(MotherField)沙化粒子，入场重凝至轴线区
    const handoff = takeAxisHandoff();
    let incoming: { x: number; y: number; vx: number; vy: number; color: string }[] = [];
    let incomingSeeded = false;
    let incomingT = 0;
    let voidFrame = 0; // 进场四拍·第一/二拍：黑屏停顿 + 入场脉冲
    const weldFixedLines = ["你刚刚拦住的，", "不是一个情绪。", "也不是一个问题。"];
    const weldTypedLines = ["你习惯先缓和，", "再把自己从现场撤走。", "但这一次，", "它已经开始成形。"];
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
      const rect = surface.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      surface.width = Math.floor(width * ratio);
      surface.height = Math.floor(height * ratio);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stage.w = width;
      stage.h = height;
      stage.x = (width - stage.w) / 2;
      stage.y = 0;
      stage.pad = Math.max(28, stage.w * 0.08);
      rail.x = stage.x + stage.pad;
      rail.y = height * 0.68;
      stage.axisX = rail.x + stage.w * 0.52;
      rail.w = stage.axisX - rail.x + Math.max(10, stage.w * 0.032);
      if (appState === "SEED_SELECT") setRailToSelectedSeed();
    }

    function getSeedSelectionEndX() {
      return stage.axisX - Math.max(34, stage.w * 0.085);
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
      weldLockPulseFired = false;
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
      const startY = height * 0.31;
      const rowGap = Math.min(126, Math.max(104, height * 0.116));
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
      ctx.font = `${Math.min(11, Math.max(10, width * 0.023))}px monospace`;
      ctx.fillText("04 ｜ SEED · 压力拦截", rail.x, height * 0.06);

      ctx.fillStyle = color.white;
      ctx.font = `bold ${Math.min(28, Math.max(24, width * 0.06))}px monospace`;
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

      const startY = height * 0.31;
      const rowGap = Math.min(126, Math.max(104, height * 0.116));
      const maxTextWidth = Math.max(132, stage.axisX - rail.x - 16);
      currentSeeds.forEach((seed, index) => {
        const seedY = startY + index * rowGap;
        const isSelected = index === selectedSeedIndex;
        ctx.globalAlpha = appState === "SEED_LOCKED" || isSelected ? 1 : 0.48;
        ctx.fillStyle = color.white;
        ctx.font = isSelected ? "16px monospace" : "15px monospace";
        ctx.fillText(`SEED ${seed.num}`, rail.x, seedY - 22);

        const textLines = buildSeedTextLines(seed.main, seed.sub, maxTextWidth);
        let lineY = seedY;
        textLines.forEach((line, lineIndex) => {
          ctx.fillStyle = lineIndex === textLines.length - 1 ? color.blue : color.white;
          ctx.font = lineIndex === textLines.length - 1 ? "600 13px monospace" : isSelected ? "16px monospace" : "15px monospace";
          ctx.fillText(line, rail.x, lineY);
          lineY += 19;
        });
        ctx.globalAlpha = 1;
      });
    }

    function drawWeldStage() {
      const isLocked = appState === "WELD_LOCKED" || appState === "WELD_SANDIFY";
      const weldTextColor = isLocked ? color.gold : color.white;
      const weldMutedColor = isLocked ? "rgba(199,169,107,0.72)" : color.bone;

      ctx.fillStyle = color.bone;
      ctx.font = "10px monospace";
      ctx.fillText("04 ｜ WELD · 因果焊接", rail.x, height * 0.06);

      if (appState === "WELD_TYPING") {
        typeTimer += 1;
        if (typeHoldTimer > 0) {
          typeHoldTimer -= 1;
        } else if (typeTimer >= 9) {
          typeTimer = 0;
          const targetText = weldTypedLines[currentLineIndex];
          if (targetText && currentCharIndex < targetText.length) {
            displayedLines[currentLineIndex] += targetText[currentCharIndex];
            currentCharIndex += 1;
            if (targetText[currentCharIndex - 1] === "，" || targetText[currentCharIndex - 1] === "。") {
              typeHoldTimer = 7;
            }
          } else if (currentLineIndex < weldTypedLines.length - 1) {
            currentLineIndex += 1;
            currentCharIndex = 0;
            typeHoldTimer = 12;
          } else {
            appState = "WELD_INTERACT";
          }
        }
      }

      ctx.fillStyle = isLocked ? weldTextColor : "rgba(246,243,236,0.52)";
      ctx.font = "14px monospace";
      weldFixedLines.forEach((line, index) => {
        ctx.globalAlpha = isLocked ? 0.72 : 0.7;
        ctx.fillText(line, rail.x, height * (0.18 + index * 0.047));
      });

      ctx.fillStyle = weldTextColor;
      ctx.font = "17px monospace";
      displayedLines.forEach((line, index) => {
        ctx.globalAlpha = line ? (isLocked ? 0.92 : 1) : 0;
        ctx.fillText(line, rail.x, height * (0.39 + index * 0.056));
      });
      ctx.globalAlpha = 1;

      if (appState === "WELD_LOCKED") {
        ctx.fillStyle = weldMutedColor;
        ctx.font = "10px monospace";
        ctx.fillText("[ 冷金死锁 · 不可逆 ]", rail.x, height * 0.52);
        ctx.fillStyle = color.gold;
        ctx.font = "bold 20px monospace";
        ctx.fillText("本局因果已高压焊死", rail.x, height * 0.56);
      }
    }

    function drawRail() {
      if (appState === "SEED_SANDIFY" || appState === "WELD_SANDIFY") return;

      rail.currentProgress += (rail.progress - rail.currentProgress) * 0.16;
      currentLoadProgress += (loadProgress - currentLoadProgress) * 0.18;
      const isGoldMode = appState === "WELD_LOCKED" || (appState === "WELD_INTERACT" && rail.currentProgress >= 0.95);
      const sliderX = getSliderX();
      const visualRailStartX = rail.x - 8;
      let sliderY = rail.y;

      ctx.lineWidth = 1;
      ctx.strokeStyle = isGoldMode ? color.gold : appState === "SEED_LOCKED" ? color.white : color.bone;
      ctx.beginPath();
      if (appState === "WELD_INTERACT" && rail.isDragging) {
        const tensionY = Math.sin(rail.currentProgress * Math.PI) * -58;
        const curveT = Math.max(0, Math.min(1, rail.currentProgress));
        sliderY = rail.y + 2 * (1 - curveT) * curveT * tensionY;
        ctx.moveTo(visualRailStartX, rail.y);
        ctx.quadraticCurveTo(sliderX, rail.y + tensionY, rail.x + rail.w, rail.y);
      } else {
        ctx.moveTo(visualRailStartX, rail.y);
        ctx.lineTo(rail.x + rail.w, rail.y);
      }
      ctx.stroke();

      if (appState === "WELD_LOCKED") {
        ctx.strokeStyle = "rgba(199,169,107,0.5)";
        ctx.beginPath();
        ctx.moveTo(visualRailStartX, rail.y - 1.5);
        ctx.lineTo(rail.x + rail.w, rail.y - 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(visualRailStartX, rail.y + 1.5);
        ctx.lineTo(rail.x + rail.w, rail.y + 1.5);
        ctx.stroke();
      }

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
      let labelText = "[ Ⅰ · 拖拽选种 → 点击定点 → 右滑装填 ]";
      if (appState === "SEED_LOCKED") labelText = "[ 种子已装填 · 因果焊接 ]";
      if (appState === "WELD_TYPING") labelText = "[ 因果共振 ]";
      if (appState === "WELD_INTERACT") labelText = isGoldMode ? "［ 高压焊接临界 ］" : "［ ➔ 右滑充能：高压焊接本局因果 ］";
      if (appState === "WELD_LOCKED") labelText = "［ 冷金死锁：本局命盘因果已焊死 ］";
      ctx.fillText(labelText, rail.x, rail.y + 18);

      ctx.strokeStyle = isGoldMode ? "rgba(199,169,107,0.72)" : "rgba(0,184,212,0.7)";
      ctx.beginPath();
      ctx.arc(sliderX, sliderY, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = isGoldMode ? color.gold : color.blue;
      ctx.beginPath();
      ctx.arc(sliderX, sliderY, 2.4, 0, Math.PI * 2);
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
      // 进场四拍：VOID 黑屏停顿 + 入场脉冲 + 入场粒子重凝（期间主时序不前进）
      if (voidFrame < 24) {
        voidFrame += 1;
        if (voidFrame === 8 && typeof navigator !== "undefined") navigator.vibrate?.([0, 18, 90, 26, 70, 34]);
        ctx.fillStyle = color.bg;
        ctx.fillRect(0, 0, width, height);
        if (handoff && !incomingSeeded && width > 0) {
          incomingSeeded = true;
          incoming = handoff.map((p) => ({ x: p.fx * width, y: p.fy * height, vx: p.vx, vy: p.vy, color: p.color }));
        }
        if (incoming.length) {
          incomingT += 1 / 60;
          const ia = Math.max(0, 1 - incomingT / 0.7);
          incoming.forEach((p) => {
            p.x += (width / 2 - p.x) * 0.06;
            p.y += (height * 0.42 - p.y) * 0.06;
            ctx.globalAlpha = ia;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 1.3, 1.3);
          });
          ctx.globalAlpha = 1;
          if (incomingT > 0.7) incoming = [];
        }
        const beat = Math.abs(Math.sin(voidFrame * 0.4));
        ctx.fillStyle = "#00B8D4";
        ctx.globalAlpha = 0.1 + 0.2 * beat;
        ctx.fillRect(width / 2 - 8, height * 0.42 - 0.5, 16, 1);
        ctx.globalAlpha = 1;
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }
      ctx.fillStyle = color.bg;
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width / 2, height * 0.4, 0, width / 2, height * 0.4, width * 0.45);
      gradient.addColorStop(0, appState.startsWith("WELD") ? "rgba(199,169,107,0.035)" : "rgba(0,184,212,0.045)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 入场重凝粒子（来自上一屏沙化，向轴线区汇聚后隐没）
      if (handoff && !incomingSeeded && width > 0) {
        incomingSeeded = true;
        incoming = handoff.map((p) => ({ x: p.fx * width, y: p.fy * height, vx: p.vx, vy: p.vy, color: p.color }));
      }
      if (incoming.length) {
        incomingT += 1 / 60;
        const tgtX = width / 2;
        const tgtY = height * 0.42;
        const ia = Math.max(0, 1 - incomingT / 0.7);
        incoming.forEach((p) => {
          p.x += (tgtX - p.x) * 0.06;
          p.y += (tgtY - p.y) * 0.06;
          ctx.globalAlpha = ia;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 1.3, 1.3);
        });
        ctx.globalAlpha = 1;
        if (incomingT > 0.7) incoming = [];
      }

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
          displayedLines = ["", "", "", ""];
          currentLineIndex = 0;
          currentCharIndex = 0;
          typeTimer = 0;
          typeHoldTimer = 0;
          sandifyTimer = 0;
        }
      }

      if (appState === "WELD_LOCKED") {
        if (!weldLockPulseFired) {
          weldLockPulseFired = true;
          window.navigator.vibrate?.([24, 28, 24, 28, 42]);
        }
        sandifyTimer += 1;
        if (sandifyTimer > 18) {
          appState = "WELD_SANDIFY";
          sandifyTimer = 0;
          spawnSandParticles("gold");
          // 粒子守恒：把本屏焊接沙化粒子交给下一屏（卦码生成）
          setAxisHandoff(sandParticles.map((p) => ({ fx: p.x / width, fy: p.y / height, vx: 0, vy: p.vy, color: p.color })));
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
      const rect = surface.getBoundingClientRect();
      if ("touches" in event) {
        const touch = event.touches[0] ?? event.changedTouches[0];
        return { x: (touch?.clientX ?? 0) - rect.left, y: (touch?.clientY ?? 0) - rect.top };
      }
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function lockSeedLoad() {
      loadProgress = 1;
      currentLoadProgress = 1;
      rail.isDragging = false;
      seedDragMode = "idle";
      sandifyTimer = 0;
      appState = "SEED_LOCKED";
    }

    function onStart(event: PointerEvent | TouchEvent) {
      event.preventDefault();
      if (voidFrame < 24) return; // 进场四拍未完成前不接受交互
      const { x, y } = getClientPoint(event);

      if (appState === "WELD_LOCKED") {
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
          if ("pointerId" in event) {
            try {
              surface.setPointerCapture(event.pointerId);
            } catch {
              /* noop */
            }
          }
          rail.isDragging = true;
          seedDragMode = "load";
          loadProgress = 0;
          currentLoadProgress = 0;
          return;
        }
        if (appState === "WELD_INTERACT") {
          if ("pointerId" in event) {
            try {
              surface.setPointerCapture(event.pointerId);
            } catch {
              /* noop */
            }
          }
          rail.isDragging = true;
        }
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
          if (loadProgress >= 0.98) {
            lockSeedLoad();
          }
          return;
        }

        const rawProgress = Math.max(0, Math.min(1, (x - rail.x) / rail.w));
        rail.progress = Math.pow(rawProgress, 1.35);
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
      if ("pointerId" in event) {
        try {
          surface.releasePointerCapture(event.pointerId);
        } catch {
          /* noop */
        }
      }
      if (!rail.isDragging) return;
      rail.isDragging = false;

      if (appState === "SEED_SELECT") {
        if (seedDragMode === "load" && loadProgress >= 0.92) {
          lockSeedLoad();
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
        sandifyTimer = 0;
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
    <GyMobilePreviewFrame background="#000">
      <canvas
        ref={canvasRef}
        aria-label="压力种子十字轴界面"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
          userSelect: "none",
        }}
      />
    </GyMobilePreviewFrame>
  );
}
