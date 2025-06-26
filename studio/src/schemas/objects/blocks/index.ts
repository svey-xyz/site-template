import { Text } from './Text';
import { FeaturedTaxonomies } from './FeaturedTaxonomies';
import { FeaturedArticles } from './FeaturedArticles';
import { Newsletter } from './Newsletter';
import { Info } from './Info';
import { Archive } from './Archive'
import { Image } from './Image'
import { Contact } from './Contact'
import { Gallery } from './Gallery'
import { Standard } from './utils/standardBlock';

import { defineArrayMember, defineField, defineType } from 'sanity';
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes';

export const Blocks = defineType({
	name: 'blocks',
	type: 'object',
	fields: [
		defineField({
			title: 'Blocks',
			name: 'blocks',
			type: 'array',
			of: (() => {
				return Object.values(_BLOCK_TYPES).map((blockType) => { return defineArrayMember({ type: blockType })})
			})(),
		}),
	]
})

export const BlockTypes = [FeaturedTaxonomies, Text, FeaturedArticles, Newsletter, Info, Archive, Image, Contact, Gallery];

// export const blockTypes = Blocks.map((block) => {
// 	return { type: block.name }
// })

// export default Blocks;