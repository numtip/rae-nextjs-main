import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAE Research Portal — ระบบบริหารงานวิจัย",
  description: "Research Analytics Platform — View_Research Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
