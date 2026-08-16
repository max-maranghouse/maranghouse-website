import Image from "next/image";
import { cld } from "@/lib/images";

// Figures match the Canva mockup (27+ / 300+ / 1000+) but conflict with the
// site's existing copy (25 Years / 100+ Children) and the founding year is
// inconsistent across sources (1993 vs 1998) — see MARANG-HOUSE-SITE-CONTEXT.md
// and the Canva redesign brief. Numbers below are TBC pending Max's
// confirmation; update this array in one place once confirmed.
const STATS = [
  { value: "27+", label: "Years", color: "var(--canva-yellow)" },
  { value: "300+", label: "Children", color: "#f27926" },
  { value: "1000+", label: "Volunteers", color: "#ff3538" },
] as const;

export default function Stats({ variant = "default" }: { variant?: "default" | "about" }) {
  return (
    <section className="stats-section">
      <Image
        className="stats-figure"
        src={cld("MH-skipping-giff.gif")}
        alt="Illustration of a child skipping rope"
        width={979}
        height={979}
        unoptimized
        style={variant === "about" ? { left: "3%", width: "auto" } : { width: "auto" }}
      />
      <div className="stats-heading">
        <h2>Creating A Better Future</h2>
        <p>For Children Living With Chronic Illness</p>
      </div>
      <div className="stats-row">
        {STATS.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-num" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <p className="stats-tbc-note">*Figures pending final confirmation.</p>
    </section>
  );
}
