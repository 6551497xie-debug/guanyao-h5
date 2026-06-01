import { Link } from "react-router-dom";

type StagePlaceholderProps = {
  code: string;
  title: string;
  subtitle: string;
  nextPath?: string;
  nextLabel?: string;
};

export function StagePlaceholder({ code, title, subtitle, nextPath, nextLabel }: StagePlaceholderProps) {
  return (
    <section className="stage-card">
      <span>{code}</span>
      <h2>{title}</h2>
      {subtitle.split("\n").map((line) => (
        <p key={line}>{line}</p>
      ))}
      {nextPath ? (
        <Link className="primary-action" to={nextPath}>
          {nextLabel ?? "进入下一页"}
        </Link>
      ) : null}
    </section>
  );
}
