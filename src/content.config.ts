import { defineCollection, z } from 'astro:content';
import Loader from '@astrojs/starlight';
import Schema  from '@astrojs/starlight';

const docsSchema = () => Schema.
const docsLoader = () => Loader.files({ path: 'content/docs', extensions: ['.md'] });

const docsConfig = docsLoader(docsSchema);



export const docsCollection = defineCollection(
	  'docs',
  {
	 docsSchema: Schema,

 	docsLoader
  }

  Loader: docsLoader,
);

export const collections = {
docsCollection: Schema.markdown(),
docsLoader: Loader 
};