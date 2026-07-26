type XinmaiLifeReflectionGuideProps = Readonly<{
  surface: "REALITY" | "REFLECTION";
}>;

const REFLECTION_STEPS = Object.freeze([
  Object.freeze({
    id: "MIRROR",
    label: "看见",
    copy: "让生命状态先被看见",
  }),
  Object.freeze({
    id: "IDENTIFY",
    label: "命名",
    copy: "轻轻认出熟悉的保护方式",
  }),
  Object.freeze({
    id: "VALIDATE",
    label: "理解",
    copy: "承认它曾经保护过你",
  }),
  Object.freeze({
    id: "SHIFT",
    label: "转化",
    copy: "为新的回应留出一点空间",
  }),
]);

export function XinmaiLifeReflectionGuide({
  surface,
}: XinmaiLifeReflectionGuideProps) {
  if (surface === "REALITY") {
    return (
      <aside
        className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reality"
        data-xinmai-reality-guide="LIFE_AND_WORLD_MEET"
        aria-hidden="true"
      >
        <span>共同面对</span>
        <strong>现实先靠近，生命再回应。</strong>
      </aside>
    );
  }

  return (
    <aside
      className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reflection"
      data-xinmai-reflection-guide="MIRROR_IDENTIFY_VALIDATE_SHIFT"
      aria-hidden="true"
    >
      <span className="xinmai-life-reflection-guide__eyebrow">生命照见</span>
      <ol className="xinmai-life-reflection-guide__sequence">
        {REFLECTION_STEPS.map((step) => (
          <li key={step.id} data-xinmai-reflection-step={step.id}>
            <i />
            <span>
              <strong>{step.label}</strong>
              <small>{step.copy}</small>
            </span>
          </li>
        ))}
      </ol>
      <p className="xinmai-life-reflection-guide__boundary">
        它只帮助你看见，不替你决定。
      </p>
      <div className="xinmai-life-reflection-guide__sediment">
        <span>生命沉积</span>
        <strong>这段经历，正在留在同一个生命里。</strong>
      </div>
    </aside>
  );
}
