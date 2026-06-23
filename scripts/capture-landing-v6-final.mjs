/**
 * RC7.1 — Final Landing V6 screenshot capture (design freeze validation).
 * Usage: node scripts/capture-landing-v6-final.mjs
 */
import puppeteer from "puppeteer";
import fs from "fs";

const BASE = "http://localhost:3110/research-preview";
const OUT_DIR = "public/screenshots/landing-v6-final";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "tablet", width: 768, height: 1200 },
  { name: "mobile", width: 390, height: 1200 },
];

const ROUTE_MAP = [
  { slug: "th", label: "thai" },
  { slug: "en", label: "english" },
  { slug: "landing-v6", label: "landing" },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const { slug, label } of ROUTE_MAP) {
    const url = `${BASE}/${slug}`;
    console.log(`\n📷 ${label} (${url})`);

    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 3000));

      const filename = `${OUT_DIR}/${label}_${vp.name}_final.jpg`;
      await page.screenshot({
        path: filename,
        fullPage: true,
        type: "jpeg",
        quality: 88,
      });
      console.log(`  ✅ ${vp.name} → ${filename}`);
    }
  }

  await browser.close();
  console.log("\n🎉 All 9 final screenshots captured.");
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
