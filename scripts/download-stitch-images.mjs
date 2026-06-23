import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { stitchImageSources } from "../content/landing-images.ts";

const outDir = join(process.cwd(), "public", "images", "stitch-v6");
await mkdir(outDir, { recursive: true });

for (const [filename, url] of Object.entries(stitchImageSources)) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${filename}: ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, filename), buf);
  console.log(`OK ${filename} (${buf.length} bytes)`);
}
