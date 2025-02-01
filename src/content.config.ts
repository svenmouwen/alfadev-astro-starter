import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Define the schema for your docs
const schema = docsSchema();

// Use the docsLoader to load files from the specified path
const loader = docsLoader();

// Define the collection using the schema and loader
export const docsCollection = defineCollection({
    schema: z.object(schema({})),
    loader: loader
});

// Export the collections
export const collections = {
    docsCollection
};
