import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GravityWave } from "../components/GravityWave";
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

type ChronoAxis = "year" | "month" | "day";

const chronoAxisLabels: Record<ChronoAxis, string> = {
  year: "年",
  month: "月",
  day: "日",
};

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

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function clampBirthDay(year: number, month: number, day: number) {
  return Math.min(Math.max(day, 1), getDaysInMonth(year, month));
}

function buildBirthDate(birthYear: number, birthMonth: number, birthDay: number) {
  return `${birthYear}-${padDateUnit(birthMonth)}-${padDateUnit(birthDay)}`;
}

function buildChronoProfile(birthYear: number, birthMonth: number, birthDay: number): ChronoProfile {
  const ageRange = getAgeRangeFromBirthYear(birthYear);
  const safeBirthDay = clampBirthDay(birthYear, birthMonth, birthDay);

  return {
    birthYear,
    birthMonth,
    birthDay: safeBirthDay,
    birthDate: buildBirthDate(birthYear, birthMonth, safeBirthDay),
    ageRange,
    ...chronoStageProfiles[ageRange],
  };
}

function getValueFromPointer(clientX: number, element: HTMLDivElement, min: number, max: number) {
  const rect = element.getBoundingClientRect();
  const progress = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
  const nextValue = Math.round(min + Math.min(Math.max(progress, 0), 1) * (max - min));

  return Math.min(Math.max(nextValue, min), max);
}

export function LaunchPage() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [birthYear, setBirthYear] = useState(defaultBirthYear);
  const [birthMonth, setBirthMonth] = useState(defaultBirthMonth);
  const [birthDay, setBirthDay] = useState(defaultBirthDay);
  const [activeAxis, setActiveAxis] = useState<ChronoAxis>("year");
  const [isDragging, setIsDragging] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const activeAxisRange =
    activeAxis === "year"
      ? { min: minBirthYear, max: maxBirthYear }
      : activeAxis === "month"
        ? { min: 1, max: 12 }
        : { min: 1, max: 31 };
  const activeAxisValue = activeAxis === "year" ? birthYear : activeAxis === "month" ? birthMonth : birthDay;
  const progress = ((activeAxisValue - activeAxisRange.min) / (activeAxisRange.max - activeAxisRange.min)) * 100;

  function updateChronoValueFromPointer(clientX: number) {
    if (!trackRef.current) return;

    const nextValue = getValueFromPointer(clientX, trackRef.current, activeAxisRange.min, activeAxisRange.max);

    if (activeAxis === "year") {
      const nextBirthYear = clampBirthYear(nextValue);
      setBirthYear(nextBirthYear);
      setBirthDay((currentDay) => clampBirthDay(nextBirthYear, birthMonth, currentDay));
      return;
    }

    if (activeAxis === "month") {
      setBirthMonth(nextValue);
      setBirthDay((currentDay) => clampBirthDay(birthYear, nextValue, currentDay));
      return;
    }

    setBirthDay(nextValue);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    setIsCalibrated(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateChronoValueFromPointer(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    updateChronoValueFromPointer(event.clientX);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    setIsCalibrated(true);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleOpenSandbox() {
    setChronoProfile(buildChronoProfile(birthYear, birthMonth, birthDay));
    navigate("/identity");
  }

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-launch-screen" data-intensity="quiet">
        <div className="gy-launch-core">
          <GravityWave variant="core" />
        </div>
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 00 / LAUNCH
          </GuanyaoText>
          <GuanyaoText className="gy-launch-nameplate" as="h2" size="title">
            观爻 SANDBOX
          </GuanyaoText>
          <div className="gy-front-lines gy-launch-verdict">
            {["你不是被命运困住", "你只是被自己的执念与恐惧", "留在了原地"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
          <div className="gy-chrono-readout gy-launch-chrono-readout gyFadeRise" aria-live="polite" data-dragging={isDragging}>
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              出生坐标
            </GuanyaoText>
            <div className="gy-chrono-current">
              <div className="gy-chrono-date-readout" aria-label="出生日期坐标">
                <button
                  className="gy-chrono-date-part"
                  type="button"
                  aria-pressed={activeAxis === "year"}
                  data-active={activeAxis === "year"}
                  onClick={() => setActiveAxis("year")}
                >
                  {birthYear}
                </button>
                <span className="gy-chrono-date-separator">/</span>
                <button
                  className="gy-chrono-date-part"
                  type="button"
                  aria-pressed={activeAxis === "month"}
                  data-active={activeAxis === "month"}
                  onClick={() => setActiveAxis("month")}
                >
                  {padDateUnit(birthMonth)}
                </button>
                <span className="gy-chrono-date-separator">/</span>
                <button
                  className="gy-chrono-date-part"
                  type="button"
                  aria-pressed={activeAxis === "day"}
                  data-active={activeAxis === "day"}
                  onClick={() => setActiveAxis("day")}
                >
                  {padDateUnit(birthDay)}
                </button>
              </div>
            </div>
          </div>
          <GuanyaoText className="gy-text-muted-coord gy-launch-chrono-hint" size="eyebrow" tone="faint">
            滑动校准生命时序
          </GuanyaoText>
          <div
            className="gy-chrono-scale gy-launch-chrono-scale gyFadeRise"
            ref={trackRef}
            role="slider"
            aria-label="出生时间坐标"
            aria-valuemin={activeAxisRange.min}
            aria-valuemax={activeAxisRange.max}
            aria-valuenow={activeAxisValue}
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
          <GuanyaoText className="gy-text-muted-coord gy-launch-chrono-axis" size="eyebrow" tone="faint">
            正在校准：{chronoAxisLabels[activeAxis]}
          </GuanyaoText>
          <GuanyaoText className="gy-text-muted-coord gy-launch-chrono-hint gy-launch-chrono-hint--sub" size="eyebrow" tone="faint">
            用于校准你的现实切片与行为因果
          </GuanyaoText>
          <div className="gy-front-note gy-chrono-note gy-launch-chrono-note">
            {isCalibrated ? (
              <GuanyaoText size="body" tone="gold">
                时序坐标已校准
              </GuanyaoText>
            ) : null}
          </div>
          <div className="gy-front-actions">
            <GuanyaoButton className="gy-front-gate" variant="ghost" onClick={handleOpenSandbox}>
              开启沙盒
            </GuanyaoButton>
          </div>
          <GuanyaoText className="gy-launch-subgate-note" size="eyebrow" tone="faint">
            照见行为因果
          </GuanyaoText>
        </div>
      </section>
    </GuanyaoShell>
  );
}
