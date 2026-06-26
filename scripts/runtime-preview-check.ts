/**
 * Runtime Preview Health Check
 *
 * Verifies that the deployed GitHub Pages preview is serving content correctly.
 * Checks: homepage, /th, /en, CSS/JS assets, 404 behavior, and basePath.
 *
 * Usage:
 *   npx tsx scripts/runtime-preview-check.ts
 *
 * Environment variables:
 *   PREVIEW_BASE  — base URL of the preview (default: https://numtip.github.io/rae-nextjs-main)
 *
 * Exits with code 0 on success, 1 on failure.
 */

const DEFAULT_BASE = "https://numtip.github.io/rae-nextjs-main";
const BASE = process.env.PREVIEW_BASE || DEFAULT_BASE;

interface CheckResult {
  route: string;
  status: number;
  ok: boolean;
  note?: string;
}

function logPass(msg: string): void {
  console.log(`  ✅ ${msg}`);
}

function logFail(msg: string): void {
  console.error(`  ❌ ${msg}`);
}

async function checkRoute(path: string, expectedStatus = 200): Promise<CheckResult> {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const ok = res.status === expectedStatus;
    const note = ok
      ? undefined
      : `expected ${expectedStatus}, got ${res.status}`;
    if (ok) logPass(`${url} → ${res.status}`);
    else logFail(`${url} → ${res.status} (${note})`);
    return { route: url, status: res.status, ok: !!ok, note };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logFail(`${url} → FETCH ERROR: ${msg}`);
    return { route: url, status: 0, ok: false, note: msg };
  }
}

async function checkAsset(path: string): Promise<CheckResult> {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const ok = res.status === 200 && !!res.headers.get("content-type");
    if (ok) logPass(`${url} → ${res.status} (${res.headers.get("content-type")})`);
    else logFail(`${url} → ${res.status} (missing content-type)`);
    return { route: url, status: res.status, ok, note: ok ? undefined : "missing content-type" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logFail(`${url} → FETCH ERROR: ${msg}`);
    return { route: url, status: 0, ok: false, note: msg };
  }
}

async function main(): Promise<number> {
  console.log(`\n🔍 Runtime Preview Health Check`);
  console.log(`   Base URL: ${BASE}\n`);

  const results: CheckResult[] = [];

  // ── Core routes ──────────────────────────────────────────────
  console.log(`📄 Core routes:`);
  results.push(await checkRoute("/"));
  results.push(await checkRoute("/th"));
  results.push(await checkRoute("/en"));

  // ── BasePath check ────────────────────────────────────────────
  console.log(`\n📁 basePath routes:`);
  results.push(await checkRoute("/rae-nextjs-main/"));
  results.push(await checkRoute("/rae-nextjs-main/th"));
  results.push(await checkRoute("/rae-nextjs-main/en"));

  // ── Static assets ─────────────────────────────────────────────
  console.log(`\n🎨 Static assets:`);
  results.push(await checkAsset("/index.html"));
  results.push(await checkAsset("/.nojekyll"));

  // ── 404 behavior ─────────────────────────────────────────────
  console.log(`\n🚫 4xx handling:`);
  results.push(await checkRoute("/nonexistent-page", 404));

  // ── Summary ──────────────────────────────────────────────────
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  console.log(`\n${"─".repeat(48)}`);
  console.log(`📊 Summary: ${passed} passed, ${failed} failed out of ${results.length} checks\n`);

  if (failed > 0) {
    console.error("❌ RUNTIME QA FAILED — exiting with code 1\n");
    return 1;
  }

  console.log("✅ RUNTIME QA PASSED\n");
  return 0;
}

main().then((code) => process.exit(code));
