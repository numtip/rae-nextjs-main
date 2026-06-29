import "./landing-v2.css";
import LandingV2Renderer from "@/components/landing-v2/LandingV2Renderer";
import { ORG_NAME_EN } from "@/lib/org-names";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${ORG_NAME_EN} | Landing V2 Preview`,
  description:
    "Landing V2 scaffold preview — awaiting Google Stitch V2 export content.",
  robots: { index: false, follow: true },
};

export default function LandingV2Page() {
  return <LandingV2Renderer locale="en" />;
}
