# CMS (Sanity) for CHEER website

The live site stays **static HTML** for speed and SEO. Sanity gives the client a friendly admin UI; **`npm run cms:sync`** pulls content into `content/site.json`, which the site loads with `js/cms-content.js`.

## One-time setup

1. In [sanity.io/manage](https://sanity.io/manage), under **Paul Banning** (or your agency org), create a **new project** (e.g. “CHEER Website”). Add a **`production`** dataset. Copy the **Project ID** — do **not** run `npm create sanity@latest` in this repo; the studio is already here.
2. Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID` and `SANITY_PROJECT_ID` to that project ID (same value).
3. Install and open the studio:

   ```bash
   npm install
   npm run studio
   ```

4. In the studio, open **Site settings** and **Home page**, fill in content, and publish.
5. Sync to the site repo:

   ```bash
   npm run cms:sync
   ```

6. Commit `content/site.json` and deploy as usual.

If you still copy files into `build/` for staging, include `content/`, `js/cms-content.js`, and updated HTML/CSS there too.

## Client access

Deploy a hosted studio (recommended):

```bash
npm run studio:deploy
```

Sanity will give a URL like `https://cheer-website.sanity.studio`. Invite the client under **Project → Members** in [sanity.io/manage](https://sanity.io/manage).

## Auto-update on publish (optional)

In Sanity: **API → Webhooks** → add a webhook that hits your host’s deploy hook (Netlify, Vercel, etc.) and run `npm run cms:sync` in the build command before upload, e.g.:

`npm run cms:sync && …copy files to build…`

## What the client can edit today

| Studio section   | Where it appears on the site                          |
|------------------|--------------------------------------------------------|
| Site settings    | Footer contact, safeguarding, charity line, social    |
| Home page        | Hero lede, about copy, impact note, join section      |
| Announcements    | Banner above the header (first active announcement)   |

Events stay on **UrNextEvent** (`events.html` embed). Programme page copy can be added to the schema in a later phase.

## Alternatives considered

- **Decap CMS** — edits Git directly; fine if the client is technical and hosting is Netlify + GitHub.
- **Full Next.js + Sanity** — best long-term if you rebuild the site; bigger migration than this approach.

This setup adds CMS without rewriting every page.
