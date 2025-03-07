// src/content/config.ts
import { defineCollection, z } from "astro:content";

// 1. SITE COLLECTION
//    For files in: src/content/site/*.md
//    Covers home.md, tours.md, about.md
const siteCollection = defineCollection({
  type: "content",
  schema: z.object({
    pageTitle: z.string().optional(),
    description: z.string().optional(),
    headline: z.string().optional(),
    subtitle: z.string().optional(),
    ctaText: z.string().optional(),
    text: z.string().optional(),
    images: z
      .array(
        z.object({
          image: z.string(),
          alt: z.string(),
        })
      )
      .optional(),
  }),
});

// 2. TOURS COLLECTION
//    For files in: src/content/tours/*.md
//    E.g. charleston-true-crime-tour.md, charleston-historic-tour.md
const toursCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    highlights: z.array(
      z.object({
        highlight: z.string(),
      })
    ),
    price: z.number(), // in dollars
    length: z.number(), // in hours
    maxCapacity: z.number(),
    tourId: z.string(),
    images: z.array(
      z.object({
        image: z.string(),
        alt: z.string(),
        isMain: z.boolean(),
      })
    ),
    itinerary: z.array(
      z.object({
        location: z.string(),
        time: z.string().optional(),
        stopLength: z.number().optional(),
      })
    ),
  }),
});

// 3. SCHEDULES COLLECTION
//    For files in: src/content/schedules/*.md
//    E.g. map-tour-chs-historic-tour-dates-list-map-schedule_date-2024-12-30-starttime-09-00.md
const schedulesCollection = defineCollection({
  type: "content",
  schema: z.object({
    tourId: z.string(),
    dates: z.array(
      z.object({
        schedule_date: z.date(),
        startTime: z.string(),
      })
    ),
  }),
});

export const collections = {
  site: siteCollection,
  tours: toursCollection,
  schedules: schedulesCollection,
};
