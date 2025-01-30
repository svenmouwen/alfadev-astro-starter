import { defineCollection } from '@astrojs';
import { Loaders } from '@astrojs/starlight';
import { Schemas } from '@astrojs/starlight';

const docsLoader = () => Loaders.files({ path: 'content/docs', extensions: ['.md'] });
const docsSchema = () => Schemas.markdown({});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};