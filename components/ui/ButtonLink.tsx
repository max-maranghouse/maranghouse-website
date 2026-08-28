import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  size?: "small" | "default";
  variant?: "primary" | "secondary" | "outline" | "light";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

export default function ButtonLink({
  children,
  className = "",
  href,
  size = "default",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const classes = `button-link button-link--${variant} button-link--${size} ${className}`.trim();
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
