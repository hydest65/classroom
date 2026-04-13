import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export function Button(props: AnchorProps | NativeButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `button button-${variant} ${className}`.trim();

  if ("href" in props) {
    const { children: _children, variant: _variant, className: _className, href, ...rest } = props;
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  const {
    children: _children,
    variant: _variant,
    className: _className,
    ...rest
  } = props;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
