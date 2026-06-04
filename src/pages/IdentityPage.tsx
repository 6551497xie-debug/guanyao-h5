import { useState } from "react";
import { Link } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { identityFragments } from "../data/identityFragments";
import { updateSession } from "../services/sessionService";

const identityFragmentCopy: Record<string, { title: string; lines: string[] }> = {
  "FRAG-001": {
    title: "我总觉得只要再撑一下",
    lines: ["局面就不会真的塌下来"],
  },
  "FRAG-002": {
    title: "我不是没看见问题",
    lines: ["我只是一直在等", "一个不用我亲手处理的时机"],
  },
  "FRAG-003": {
    title: "我习惯把话说轻一点",
    lines: ["好像这样冲突", "就不会真的发生"],
  },
  "FRAG-004": {
    title: "我每天都在动",
    lines: ["但真正该面对的那件事", "一直没有被碰到"],
  },
  "FRAG-005": {
    title: "我不是不累",
    lines: ["我是已经习惯了", "把累藏进还能再坚持一下"],
  },
  "FRAG-006": {
    title: "我总在引爆前收回去",
    lines: ["不是没有立场", "是太熟悉冲突逼近时", "那一秒的空气"],
  },
};

export function IdentityPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentFragment = identityFragments[activeIndex];
  const fragmentCopy = identityFragmentCopy[currentFragment.id] ?? {
    title: currentFragment.text,
    lines: currentFragment.desc.split(/[，。]/).filter(Boolean),
  };

  function handleNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % identityFragments.length);
  }

  function handleConfirm() {
    updateSession({
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
            人格映照碎片
          </GuanyaoText>
          <GuanyaoText size="body" tone="faint">
            哪一句，像你此刻的惯性？
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
