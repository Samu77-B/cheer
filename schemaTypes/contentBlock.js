import { defineField, defineType } from "sanity";

export const contentBlock = defineType({
  name: "contentBlock",
  title: "Content block",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Block type",
      type: "string",
      options: {
        list: [
          { title: "Section heading", value: "heading" },
          { title: "Paragraph", value: "paragraph" },
          { title: "Numbered list", value: "numbered" },
          { title: "Bullet list", value: "bullets" },
        ],
        layout: "dropdown",
      },
      initialValue: "paragraph",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      hidden: ({ parent }) => parent?.kind === "numbered" || parent?.kind === "bullets",
    }),
    defineField({
      name: "items",
      title: "List items",
      type: "text",
      rows: 6,
      description: "One item per line",
      hidden: ({ parent }) => parent?.kind !== "numbered" && parent?.kind !== "bullets",
    }),
  ],
  preview: {
    select: { kind: "kind", text: "text", items: "items" },
    prepare({ kind, text, items }) {
      return {
        title: kind || "paragraph",
        subtitle: (text || items || "").slice(0, 60),
      };
    },
  },
});
