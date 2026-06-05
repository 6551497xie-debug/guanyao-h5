import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
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
  const session = getSession();
  const fragmentPool = useMemo(() => readIdentityPool(session), [session]);
  const currentFragment = fragmentPool[activeIndex % fragmentPool.length] ?? identityFragments[0];
  const fragmentCopy = {
    title: currentFragment.fragmentLine,
    lines: currentFragment.systemPerspective,
  };

  function handleNext() {
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
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-identity-screen" data-intensity="quiet">
        <div className="gy-front-copy gy-identity-coord gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 01 / IDENTITY
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="faint">
            人格映照正在显影
          </GuanyaoText>
          <GuanyaoText size="body" tone="faint">
            看到刺中的那一条，就点“好像是我”。还没刺中，就继续漂流。
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gy-text-fragment gyFadeRise" data-clickable="true" onClick={handleNext}>
          <GuanyaoText as="h3" size="title">
            {fragmentCopy.title}
          </GuanyaoText>
          <div className="gy-identity-fragment-desc">
            {fragmentCopy.lines.map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
        </article>
        <div className="gy-front-actions">
          <Link to="/force" onClick={handleConfirm}>
            <GuanyaoButton className="gy-identity-gate" as="span" variant="ghost">
              好像是我
            </GuanyaoButton>
          </Link>
          <GuanyaoButton className="gy-identity-gate" variant="ghost" onClick={handleNext}>
            继续漂流
          </GuanyaoButton>
        </div>
      </section>
    </GuanyaoShell>
  );
}
