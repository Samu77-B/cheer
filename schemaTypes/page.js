import { defineArrayMember, defineField, defineType } from "sanity";

// Slug must match the HTML file's data-page value
export const PAGE_SLUG_OPTIONS = [
  { title: "About", value: "about" },
  { title: "My Band Sabula", value: "sabula" },
  { title: "Programmes", value: "activities" },
  { title: "Events", value: "events" },
  { title: "Get involved", value: "get-involved" },
  { title: "Terms and conditions", value: "terms" },
  { title: "Privacy policy", value: "privacy" },
  { title: "Contact", value: "contact" },
];

// Terms and Privacy render their heading on a plain background
const BANNERLESS_SLUGS = ["terms", "privacy"];

// Pages whose body is simple prose, so generic blocks can safely replace it
const BODY_EDITABLE_SLUGS = ["terms", "privacy"];

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page name (studio only)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: { list: PAGE_SLUG_OPTIONS, layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bannerImage",
      title: "Banner image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => BANNERLESS_SLUGS.includes(document?.slug),
      description: "Landscape, at least 1600px wide. Leave empty to keep the current image.",
    }),
    defineField({
      name: "bannerAlt",
      title: "Banner image description",
      type: "string",
      hidden: ({ document }) => BANNERLESS_SLUGS.includes(document?.slug),
      description: "Describes the image for screen readers and search engines.",
    }),
    defineField({
      name: "eyebrow",
      title: "Banner eyebrow",
      type: "string",
      description: "Small label above the heading, e.g. About us",
    }),
    defineField({
      name: "heading",
      title: "Banner heading (H1)",
      type: "string",
    }),
    defineField({
      name: "lede",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bannerNote",
      type: "string",
      title: "Banner image",
      readOnly: true,
      hidden: ({ document }) => !BANNERLESS_SLUGS.includes(document?.slug),
      description: "This page has no banner image — its heading sits on a plain background.",
    }),
    defineField({
      name: "bodyBlocks",
      title: "Main page text",
      type: "array",
      of: [defineArrayMember({ type: "contentBlock" })],
      // Only the legal pages are plain prose; the others have bespoke layouts
      hidden: ({ document }) => !BODY_EDITABLE_SLUGS.includes(document?.slug),
      description:
        "Replaces the whole text area below the heading. Leave empty to keep the current wording.",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug", media: "bannerImage" },
    prepare({ title, slug, media }) {
      return {
        title: title || slug || "Page",
        subtitle: slug ? `/${slug}.html` : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Page name",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
