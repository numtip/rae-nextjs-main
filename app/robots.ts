import type { MetadataRoute } from "next";
import { SITE_PATH_PREFIX, absolutePublicFile } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: `/${SITE_PATH_PREFIX}/`,
    },
    sitemap: absolutePublicFile("sitemap.xml"),
  };
}
