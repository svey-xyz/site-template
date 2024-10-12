import { projects } from './projects';
import { news } from './news';
import { businesses } from './businesses'
import { adresses } from './addresses';
import { ARTICLE } from '@/sanity/schemas/articles/constructors/article';

const ARTICLES: ARTICLE[] = [
	projects, news, businesses, adresses
]

export default ARTICLES;