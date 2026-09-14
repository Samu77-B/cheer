import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phoneLandline",
      title: "Landline (display)",
      type: "string",
    }),
    defineField({
      name: "phoneLandlineTel",
      title: "Landline (tel: link, e.g. +442037332390)",
      type: "string",
    }),
    defineField({
      name: "phoneMobile",
      title: "Mobile (display)",
      type: "string",
    }),
    defineField({
      name: "phoneMobileTel",
      title: "Mobile (tel: link)",
      type: "string",
    }),
    defineField({
      name: "charityRegistration",
      title: "Charity registration line",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "safeguardingBlurb",
      title: "Footer — safeguarding",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialBlurb",
      title: "Footer — follow us",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
