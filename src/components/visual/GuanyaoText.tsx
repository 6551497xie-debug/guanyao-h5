import type { HTMLAttributes, ReactNode } from "react";

type GuanyaoTextSize = "eyebrow" | "body" | "title";
type GuanyaoTextTone = "default" | "muted" | "faint" | "gold";
type GuanyaoTextElement = "p" | "span" | "h1" | "h2" | "h3";

type GuanyaoTextProps = HTMLAttributes<HTMLElement> & {
  as?: GuanyaoTextElement;
  children: ReactNode;
  size?: GuanyaoTextSize;
  tone?: GuanyaoTextTone;
};

export function GuanyaoText({
  as: Component = "p",
  children,
  className,
  size = "body",
  tone = "default",
  ...props
}: GuanyaoTextProps) {
  const textClassName = ["gy-text", className].filter(Boolean).join(" ");

  return (
    <Component className={textClassName} data-size={size} data-tone={tone} {...props}>
      {children}
    </Component>
  );
}
