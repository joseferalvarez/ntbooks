import {z} from 'zod';

export const zBook = z.object({
    title: z.string(),
    key: z.string(),
    author_key: z.array(z.string()),
    author_name: z.array(z.string()),
    cover_i: z.number(),
    first_publish_year: z.number(),
    edition_count: z.number(),
    publisher: z.optional(z.array(z.string())),
    language: z.optional(z.array(z.string())),
    isbn: z.optional(z.array(z.string())),
    pages_number: z.optional(z.number()),
});

export type IBook = z.infer<typeof zBook>;