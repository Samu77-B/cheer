import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv();

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || projectId === "yourProjectId") {
  console.error("Set SANITY_PROJECT_ID in .env");
  process.exit(1);
}

if (!token) {
  console.error(
    "Set SANITY_WRITE_TOKEN in .env (Editor token from Sanity → API → Tokens)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Mirrors the copy currently hard-coded in the HTML, so the studio opens with
// the live wording rather than blank fields
const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    contactEmail: "hello@cheerorganisationltd.com",
    phoneLandline: "020 3733 2390",
    phoneLandlineTel: "+442037332390",
    phoneMobile: "+44 (0)74 0599 2600",
    phoneMobileTel: "+447405992600",
    charityRegistration: "CHEER Organisation Ltd. Charity registration details TBC.",
    safeguardingBlurb:
      "We aim to create safe, inclusive spaces. A full safeguarding policy will be published here when the charity confirms it.",
    socialBlurb: "Facebook, Instagram, YouTube, and LinkedIn — TBC.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroLede:
      "Inclusive arts, music and community programmes that improve education, wellbeing and social connection, with My Band Sabula.",
    aboutParagraphs: [
      "We create public-benefit programmes that inform, inspire and bring people together — especially where isolation, limited opportunity or poor wellbeing get in the way.",
      "My Band Sabula is our community arts project: outreach, education, mentoring and live performance for people of all ages.",
    ],
    impactNote:
      "Concert photographs and film on this page are from CHEER. Other images are still placeholders until more of the charity's own media is ready.",
    joinBlurb:
      "CHEER grows through volunteering, participation and partners. Help us bring people together through arts, music and community programmes.",
  },
];

async function main() {
  for (const { _id, _type, ...fields } of documents) {
    await client.createIfNotExists({ _id, _type });
    // setIfMissing keeps anything already entered in the studio
    const result = await client
      .patch(_id)
      .setIfMissing(fields)
      .commit({ autoGenerateArrayKeys: true });

    const filled = Object.keys(fields).filter((key) => result[key] != null);
    console.log(`${_id}: ${filled.length}/${Object.keys(fields).length} fields populated`);
  }

  console.log(`\nSeeded into ${projectId}/${dataset}.`);
  console.log("Next: run npm run cms:sync, then commit content/site.json.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
