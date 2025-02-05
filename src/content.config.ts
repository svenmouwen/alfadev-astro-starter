import { z, defineCollection, getCollection } from "astro:content";
import type { PageType } from "./content/page.types";

const maxLength = 20;



const zodPageConfig = z.custom<PageType>();
function generateSlug(title, date) {
	if (!date) {
		date = new Date();
	}
	let slug = `${date.getUTCFullYear().toString()}-${date.getUTCMonth().toString()}-${title}`;
	return slug.trim().toLowerCase().replace(/\s/g, "-").replace(/\[^a-z0-9-]/g, '').substring(0, maxLength);
}

const postSchema = z.intersection(
  z.object({
	title: z.string(),
	date: z.date(),
	slug: z.string().optional(),
	content: z.string(),
	image: z.string().optional(),
	image_position: z.enum(["top", "bottom", "left", "right"]).optional(),
  }),
  zodPageConfig,
);

export const postsCollection = defineCollection({
  type: "content",
  schema: postSchema,
});

export const collections = {
  'posts': postsCollection
};

export const getStaticPaths = async () => {
  const posts = await getCollection('posts', );
  const paths = posts.map((post) => ({ '/posts/:slug': { slug: post.data.slug ?? generateSlug(post.data.title, post.data.date) } }));
	return { paths, fallback: false };
};

