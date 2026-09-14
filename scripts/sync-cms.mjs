import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "content", "site.json");

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || projectId === "yourProjectId") {
  console.error(
    "Set SANITY_PROJECT_ID (and SANITY_DATASET) in .env — create a project at https://sanity.io/manage"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
  token: token || undefined,
});

const query = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    contactEmail,
    phoneLandline,
    phoneLandlineTel,
    phoneMobile,
    phoneMobileTel,
    charityRegistration,
    safeguardingBlurb,
    socialBlurb,
    facebookUrl,
    instagramUrl,
    youtubeUrl,
    linkedinUrl
  },
  "homePage": *[_type == "homePage"][0]{
    heroLede,
    aboutParagraphs,
    impactNote,
    joinBlurb
  },
  "announcements": *[_type == "announcement" && active == true] | order(_createdAt desc){
    title,
    message,
    linkUrl,
    linkLabel,
    startDate,
    endDate
  }
}`;

const data = await client.fetch(query);

const now = new Date();
const announcements = (data.announcements || []).filter((item) => {
  const start = item.startDate ? new Date(item.startDate) : null;
  const end = item.endDate ? new Date(item.endDate) : null;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
});

const payload = {
  syncedAt: new Date().toISOString(),
  siteSettings: data.siteSettings,
  homePage: data.homePage,
  announcements,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log("Wrote", outPath);
