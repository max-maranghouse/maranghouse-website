import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  contained?: boolean;
  spacing?: "compact" | "default" | "spacious";
  tone?: "white" | "cream" | "blue" | "navy";
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

export default function Section({
  children,
  className = "",
  containerClassName = "",
  contained = true,
  spacing = "default",
  tone = "white",
  ...props
}: SectionProps) {
  const content = contained ? <Container className={containerClassName}>{children}</Container> : children;

  return (
    <section className={`section section--${spacing} section--${tone} ${className}`.trim()} {...props}>
      {content}
    </section>
  );
}
