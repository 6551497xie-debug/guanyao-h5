import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { identityFragments } from "../data/identityFragments";
import { getSession, updateSession } from "../services/sessionService";
import type { GuanyaoSession, IdentityFragment, IdentityLifeStageId } from "../types";

const yuanCodeKeys: IdentityFragment["yuanCodeKey"][] = ["qian", "kun", "zhen", "xun", "kan", "li", "gen", "dui"];

function readYuanCodeKey(session: GuanyaoSession): IdentityFragment["yuanCodeKey"] | null {
  const candidate =
    session.yuanCode?.trigramKey ??
    session.chronoCode?.trigramKey ??
    session.chronoPrototypeCard?.trigramId;

  return yuanCodeKeys.includes(candidate as IdentityFragment["yuanCodeKey"])
    ? (candidate as IdentityFragment["yuanCodeKey"])
    : null;
}

function readLifeStageId(session: GuanyaoSession): IdentityLifeStageId | null {
  switch (session.chronoProfile?.ageRange) {
    case "18_22":
      return "18_22";
    case "23_31":
      return "23_31";
    case "32_39":
      return "32_42";
    case "40_52":
    case "53_plus":
      return "43_55";
    default:
      return null;
  }
}

function readIdentityPool(session: GuanyaoSession) {
  const yuanCodeKey = readYuanCodeKey(session);
  const lifeStageId = readLifeStageId(session);

  if (yuanCodeKey && lifeStageId) {
    const matchedFragments = identityFragments.filter(
      (fragment) => fragment.yuanCodeKey === yuanCodeKey && fragment.lifeStageId === lifeStageId,
    );

    if (matchedFragments.length > 0) {
      return matchedFragments;
    }
  }

  console.warn("Identity fallback: missing yuanCode or lifeStage, using the first available fragment group.");
  const fallbackKey = identityFragments[0]?.yuanCodeKey;
  const fallbackStage = identityFragments[0]?.lifeStageId;

  return identityFragments.filter(
    (fragment) => fragment.yuanCodeKey === fallbackKey && fragment.lifeStageId === fallbackStage,
  );
}

export function IdentityPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShifting, setIsShifting] = useState(false);
  const shiftTimerRef = useRef<number | null>(null);
  const session = getSession();
  const fragmentPool = useMemo(() => readIdentityPool(session), [session]);
  const currentFragment = fragmentPool[activeIndex % fragmentPool.length] ?? identityFragments[0];
  const sliceIndex = (activeIndex % fragmentPool.length) + 1;
  const sliceTotal = fragmentPool.length;
  const sliceProgress = sliceTotal > 1 ? ((sliceIndex - 1) / (sliceTotal - 1)) * 100 : 50;
  const sliceMarks = Array.from({ length: sliceTotal }, (_, index) =>
    sliceTotal > 1 ? (index / (sliceTotal - 1)) * 100 : 50,
  );
  const fragmentCopy = {
    title: currentFragment.fragmentLine,
    lines: currentFragment.systemPerspective,
  };
  const dissectionLines = [
    currentFragment.shadowInertia,
    currentFragment.misrecognitionPattern,
  ].filter(Boolean);

  useEffect(() => {
    document.body.classList.add("gy-identity-r2-mode");
    return () => {
      document.body.classList.remove("gy-identity-r2-mode");
      if (shiftTimerRef.current) {
        window.clearTimeout(shiftTimerRef.current);
      }
    };
  }, []);

  function handleNext() {
    setIsShifting(true);
    if (shiftTimerRef.current) {
      window.clearTimeout(shiftTimerRef.current);
    }
    shiftTimerRef.current = window.setTimeout(() => setIsShifting(false), 240);
    setActiveIndex((currentIndex) => (currentIndex + 1) % fragmentPool.length);
  }

  function handleConfirm() {
    updateSession({
      identityFragment: currentFragment,
      selectedFragment: currentFragment,
      autoYaoPath: [],
      sixthYaoChoice: null,
      finalChoiceCode: "",
      choiceHistory: [],
    });
  }

  return (
    <GuanyaoShell className="gy-identity-shell" density="compact">
      <section className="gy-front-screen gy-front-instrument gy-identity-screen gy-identity-r2" data-intensity="quiet">
        <header className="gy-identity-r2-header gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 01 / IDENTITY
          </GuanyaoText>
          <GuanyaoText className="gy-identity-r2-status" as="span" size="eyebrow" tone="faint">
            人格映照碎片捕获中
          </GuanyaoText>
        </header>

        <main className="gy-identity-dual-cabin gyFadeRise">
          <aside
            className="gy-identity-slice-rail"
            aria-label="人格映照切片滑轨"
            style={{ "--gy-slice-progress": `${sliceProgress}%` } as CSSProperties}
          >
            <div className="gy-identity-slice-meta">
              <span>SLICE_{String(sliceIndex).padStart(2, "0")}</span>
              <span>TOTAL_{String(sliceTotal).padStart(2, "0")}</span>
            </div>
            <div className="gy-identity-vertical-track" aria-hidden="true">
              {sliceMarks.map((mark, index) => (
                <span
                  className="gy-identity-track-mark"
                  key={`slice-mark-${index}`}
                  style={{ "--gy-slice-mark": `${mark}%` } as CSSProperties}
                />
              ))}
              <span className={`gy-identity-track-point${isShifting ? " is-shifting" : ""}`} />
            </div>
          </aside>

          <section className="gy-identity-data-flow" aria-label="人格映照断言数据流">
            <div className="gy-identity-fragment-core">
              <GuanyaoText className="gy-identity-r2-label" as="span" size="eyebrow" tone="faint">
                人格映照碎片
              </GuanyaoText>
              <GuanyaoText className="gy-identity-r2-fragment" as="h2" size="title">
                {fragmentCopy.title}
              </GuanyaoText>
            </div>

            <div className="gy-identity-r2-void" aria-hidden="true" />

            <div className="gy-identity-r2-dissection">
              {dissectionLines.map((line) => (
                <GuanyaoText key={line} as="p" size="body" tone="muted">
                  {line}
                </GuanyaoText>
              ))}
            </div>
          </section>
        </main>

        <footer className="gy-identity-action-zone gyFadeRise">
          <div className="gy-identity-binary-rail" aria-label="人格映照二元拨码闸门">
            <button className="gy-identity-binary-action gy-identity-binary-action--drift" type="button" onClick={handleNext}>
              <span>0 · 切去当前碎片</span>
            </button>
            <span className="gy-identity-binary-pointer" aria-hidden="true" />
            <Link className="gy-identity-binary-action gy-identity-binary-action--claim" to="/force" onClick={handleConfirm}>
              <span>1 · 锁定当前碎片</span>
            </Link>
          </div>
          <p className="gy-identity-binary-hint">
            左端继续漂流 ｜ 右端好像是我
          </p>
        </footer>
      </section>
    </GuanyaoShell>
  );
}
