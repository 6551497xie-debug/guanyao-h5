import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { setChronoProfile } from "../services/sessionService";
import type { ChronoAgeRange, ChronoProfile } from "../types";

const minBirthYear = 1955;
const maxBirthYear = 2008;
const defaultBirthYear = 1995;
const defaultBirthMonth = 6;
const defaultBirthDay = 2;

const chronoStageProfiles: Record<ChronoAgeRange, Omit<ChronoProfile, "birthYear" | "birthMonth" | "birthDay" | "birthDate" | "ageRange">> = {
  "18_22": {
    lifeStageLabel: "初入成人世界",
    pressureField: ["校园关系", "身份形成", "专业选择", "经济试探"],
    sceneWeightTags: ["campus", "identity", "peer_pressure", "early_debt"],
  },
  "23_31": {
    lifeStageLabel: "职场加速期",
    pressureField: ["职场评价", "边界消耗", "城市生存", "关系比较"],
    sceneWeightTags: ["workplace", "performance", "overtime", "rental_life"],
  },
  "32_39": {
    lifeStageLabel: "责任叠压期",
    pressureField: ["家庭责任", "职业瓶颈", "亲密关系", "资产压力"],
    sceneWeightTags: ["family", "career_pressure", "relationship", "asset_pressure"],
  },
  "40_52": {
    lifeStageLabel: "信用与家庭承压期",
    pressureField: ["信用压力", "团队责任", "家庭支出", "债务风险"],
    sceneWeightTags: ["credit", "mortgage", "team_risk", "family_expense"],
  },
  "53_plus": {
    lifeStageLabel: "重构与回看期",
    pressureField: ["身份重构", "健康信号", "家庭关系", "价值回看"],
    sceneWeightTags: ["reconstruction", "health_signal", "family_relation", "life_review"],
  },
};

function clampBirthYear(year: number) {
  return Math.min(Math.max(year, minBirthYear), maxBirthYear);
}

function getAgeRangeFromBirthYear(birthYear: number): ChronoAgeRange {
  const age = new Date().getFullYear() - birthYear;

  if (age <= 22) return "18_22";
  if (age <= 31) return "23_31";
  if (age <= 39) return "32_39";
  if (age <= 52) return "40_52";
  return "53_plus";
}

function padDateUnit(value: number) {
  return String(value).padStart(2, "0");
}

function buildChronoProfile(birthYear: number): ChronoProfile {
  const ageRange = getAgeRangeFromBirthYear(birthYear);

  return {
    birthYear,
    birthMonth: defaultBirthMonth,
    birthDay: defaultBirthDay,
    birthDate: `${birthYear}-${padDateUnit(defaultBirthMonth)}-${padDateUnit(defaultBirthDay)}`,
    ageRange,
    ...chronoStageProfiles[ageRange],
  };
}

function getBirthYearFromPointer(clientX: number, element: HTMLDivElement) {
  const rect = element.getBoundingClientRect();
  const progress = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
  const nextYear = Math.round(minBirthYear + Math.min(Math.max(progress, 0), 1) * (maxBirthYear - minBirthYear));

  return clampBirthYear(nextYear);
}

export function ChronoPage() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [birthYear, setBirthYear] = useState(defaultBirthYear);
  const [isDragging, setIsDragging] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const progress = ((birthYear - minBirthYear) / (maxBirthYear - minBirthYear)) * 100;

  function updateBirthYearFromPointer(clientX: number) {
    if (!trackRef.current) return;

    setBirthYear(getBirthYearFromPointer(clientX, trackRef.current));
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    setIsCalibrated(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateBirthYearFromPointer(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    updateBirthYearFromPointer(event.clientX);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    setIsCalibrated(true);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleContinue() {
    setChronoProfile(buildChronoProfile(birthYear));
    navigate("/identity");
  }

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-chrono-screen gy-causal-line gy-causal-line-anchor" data-intensity="quiet">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 00-FIX / CHRONO
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
            时序校准
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            找到你的出生时间
          </GuanyaoText>
          <div className="gy-front-lines gy-chrono-copy">
            {["系统只用它校准现实切片", "不用于定义你"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
        </div>

        <div className="gy-chrono-readout gyFadeRise" aria-live="polite" data-dragging={isDragging}>
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            出生坐标
          </GuanyaoText>
          <div className="gy-chrono-current">
            <span>{birthYear}</span>
          </div>
        </div>

        <div
          className="gy-chrono-scale gyFadeRise"
          ref={trackRef}
          role="slider"
          aria-label="出生时间坐标"
          aria-valuemin={minBirthYear}
          aria-valuemax={maxBirthYear}
          aria-valuenow={birthYear}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ "--gy-chrono-progress": `${progress}%` } as CSSProperties}
        >
          <div className="gy-chrono-scale-line" />
          <div className="gy-chrono-scale-marks" aria-hidden="true" />
          <div className="gy-chrono-cursor" />
        </div>

        <div className="gy-front-note gy-chrono-note">
          {isCalibrated ? (
            <GuanyaoText size="body" tone="gold">
              时序坐标已校准
            </GuanyaoText>
          ) : null}
        </div>

        <div className="gy-front-actions">
          <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-primary" variant="ghost" onClick={handleContinue}>
            进入映照
          </GuanyaoButton>
        </div>
      </section>
    </GuanyaoShell>
  );
}
