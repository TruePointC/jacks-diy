import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/recent-jobs", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
