import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type LegalPageProps = {
  title: string;
  intro: ReactNode;
  effectiveDate: string;
  children: ReactNode;
};

// Shared shell for the three legal/policy routes: one h1 plus intro copy,
// then an `article` of sequential h2 sections supplied by each page.
export default function LegalPage({ title, intro, effectiveDate, children }: LegalPageProps) {
  return (
    <Section tone="cream" spacing="default" className="legal-page">
      <Container size="narrow" className="legal-page__inner">
        <header className="legal-page__intro">
          <h1>{title}</h1>
          {intro}
          <p className="legal-page__effective">Effective date: {effectiveDate}</p>
        </header>
        <article className="legal-article">{children}</article>
      </Container>
    </Section>
  );
}
