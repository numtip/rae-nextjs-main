import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./stitch-landing.css";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAE - Office of Agricultural Research and Extension, Maejo University",
  description:
    "สำนักงานวิจัยและส่งเสริมวิชาการการเกษตร มหาวิทยาลัยแม่โจ้ — มุ่งมั่นด้านการวิจัย ส่งเสริมวิชาการ และบริการวิชาการด้านการเกษตร",
  robots: { index: false, follow: false },
};

export default function StitchLandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={sarabun.variable} suppressHydrationWarning>
      <body className="bg-white text-gray-800 antialiased overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
