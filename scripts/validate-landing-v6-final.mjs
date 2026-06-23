import puppeteer from "puppeteer";

const BASE = "http://localhost:3110/research-preview";

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const results = [];

  for (const route of ["th", "en", "landing-v6"]) {
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE}/${route}`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    const r = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      navCount: document.querySelectorAll("nav").length,
      footerCount: document.querySelectorAll("footer").length,
      heroImg: Boolean(
        document.querySelector('img[src*="hero-background"]')
      ),
      ecosystemBg: Boolean(
        document.querySelector('section[class*="313030"]')
      ),
      greenCard: Boolean(document.querySelector(".bg-primary.text-on-primary")),
      yellowBadge: Boolean(
        document.querySelector(".bg-secondary-container")
      ),
    }));
    results.push({
      route,
      ...r,
      hScroll: r.scrollWidth > r.clientWidth + 1,
    });
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
