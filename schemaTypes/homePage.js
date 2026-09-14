import { defineArrayMember, defineField, defineType } from "sanity";

// Each entry maps to one panel already in index.html; order is preserved
function imagePanel(name, title, description) {
  return defineField({
    name,
    title,
    type: "object",
    description,
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
        description: "Leave empty to keep the image currently on the page.",
      }),
      defineField({ name: "alt", title: "Image description", type: "string" }),
    ],
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroLede",
      title: "Hero intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutParagraphs",
      title: "About section paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "impactNote",
      title: "Impact section note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "joinBlurb",
      title: "Join our mission blurb",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutPhotos",
      title: "About section photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "alt", title: "Image description", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: { select: { title: "caption", media: "image" } },
        }),
      ],
      description: "Replaces both photos beside the About text. Leave empty to keep the current ones.",
    }),
    imagePanel("panelCommunity", "Panel — Community", "Currently a stock placeholder"),
    imagePanel("panelHealth", "Panel — Health", "Currently a stock placeholder"),
    imagePanel(
      "panelEducation",
      "Panel — Educational entertainment",
      "Currently a stock placeholder"
    ),
    imagePanel(
      "panelEmpowerment",
      "Panel — Empowerment for Resilience",
      "Currently a stock placeholder"
    ),
    imagePanel("panelSabula", "Panel — My Band Sabula"),
    imagePanel("featureEvents", "Feature card — See what's on"),
    imagePanel("featureSabula", "Feature card — My Band Sabula"),
  ],
  // Without this, the singleton has no title field and Sanity lists every value instead
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
