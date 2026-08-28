import { Fredoka, Nunito, Permanent_Marker } from "next/font/google";

// Google deprecated "Fredoka One" as a standalone family — it's now folded
// into the variable "Fredoka" family (next/font/google only exposes the
// merged one). The two spots that used Fredoka One (footer logo, lightkeeper
// placeholder avatars) use the regular Fredoka font instead — visually
// near-identical, same type family.
export const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
});

export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap",
});
