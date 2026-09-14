import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "url",
    }),
    defineField({
      name: "linkLabel",
      title: "Link label",
      type: "string",
    }),
    defineField({
      name: "active",
      title: "Show on site",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", active: "active" },
    prepare({ title, active }) {
      return {
        title,
        subtitle: active ? "Visible" : "Hidden",
      };
    },
  },
});
