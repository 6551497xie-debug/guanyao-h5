import type { HTMLAttributes, ReactNode } from "react";

type GuanyaoShellDensity = "comfortable" | "compact";
type GuanyaoStagePresence = "none" | "enter";

type GuanyaoShellProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  density?: GuanyaoShellDensity;
  stage?: boolean;
  presence?: GuanyaoStagePresence;
};

export function GuanyaoShell({
  children,
  className,
  density = "comfortable",
  stage = false,
  presence = "none",
  ...props
}: GuanyaoShellProps) {
  const shellClassName = ["gy-shell", className].filter(Boolean).join(" ");

  return (
    <div className={shellClassName} data-density={density} {...props}>
      {stage ? (
        <section className="gy-stage" data-presence={presence}>
          {children}
        </section>
      ) : (
        children
      )}
    </div>
  );
}
