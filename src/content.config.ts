import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		/** story | poem | essay | note */
		kind: z.enum(['story', 'poem', 'essay', 'note']).default('essay'),
		/** Path under /public, e.g. /media/writing/spider.jpg */
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
		/** Original Substack URL, if cross-posted. */
		substack: z.string().url().optional(),
		/** Show as the featured piece on the home page. */
		featured: z.boolean().default(false),
	}),
});

export const collections = { blog };
