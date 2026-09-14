import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'yourProjectId',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Lowercase + hyphens only — not "Cheer" (invalid; breaks CLI prompt in some terminals)
  studioHost: 'cheer-website',
})
