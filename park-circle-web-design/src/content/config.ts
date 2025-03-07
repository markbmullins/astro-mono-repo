import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const features = defineCollection({
  schema: z.object({
    title: z.string(),
    iconPath: z.string().optional(),
    iconURL: z.string().optional(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

export const portfolio = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string().optional(),
    description: z.string(),
    link: z.string().optional(), // URL to the client's site
    order: z.number().default(0),
  }),
});

export const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
  }),
});

// FAQ collection: each file represents a topic and its body holds multiple FAQs.
export const faqs = defineCollection({
  schema: z.object({
    topic: z.string(), // primary topic name (and file name)
  }),
});

export const blogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { features, portfolio, services, faqs, blogs };
