import { Text } from './Text';
import { FeaturedTaxonomies } from './FeaturedTaxonomies';
import { FeaturedArticles } from './FeaturedArticles';
import { Newsletter } from './Newsletter';
import { Info } from './Info';
import { Archive } from './Archive'
import { Image } from './Image'
import { Contact } from './Contact'
import { Gallery } from './Gallery'

export const Blocks = [FeaturedTaxonomies, Text, FeaturedArticles, Newsletter, Info, Archive, Image, Contact, Gallery];

// export const blockTypes = Blocks.map((block) => {
// 	return { type: block.name }
// })

// export default Blocks;