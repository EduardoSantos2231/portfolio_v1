import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    technologies: z.array(z.string()),
    description: z.string().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    order: z.number(),
  }),
});

export const collections = { projects };
