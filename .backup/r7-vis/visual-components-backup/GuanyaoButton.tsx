import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type GuanyaoButtonVariant = "primary" | "secondary" | "ghost" | "gate";

type GuanyaoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: GuanyaoButtonVariant;
};

type GuanyaoButtonSpanProps = HTMLAttributes<HTMLSpanElement> & {
  as: "span";
  children: ReactNode;
  variant?: GuanyaoButtonVariant;
};

export function GuanyaoButton(props: GuanyaoButtonProps | GuanyaoButtonSpanProps) {
  const { children, className, variant = "secondary" } = props;
  const buttonClassName = ["gy-button", className].filter(Boolean).join(" ");

  if ("as" in props && props.as === "span") {
    const { as: _as, children: _children, className: _className, variant: _variant, ...spanProps } = props;

    return (
      <span className={buttonClassName} data-variant={variant} {...spanProps}>
        {children}
      </span>
    );
  }

  const { children: _children, className: _className, variant: _variant, type = "button", ...buttonProps } = props as GuanyaoButtonProps;

  return (
    <button className={buttonClassName} data-variant={variant} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
