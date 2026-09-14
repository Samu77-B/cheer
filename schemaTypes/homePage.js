import { defineField, defineType } from "sanity";

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
  ],
});
