import { ARTICLE } from "@/sanity/schemas/articles/constructors/article";
import { NewspaperIcon } from "@heroicons/react/24/solid";

const _NewspaperIcon = () => <NewspaperIcon />;

const fields = [
]

const args = { type: 'article', icon: NewspaperIcon }
export const articles = new ARTICLE(args)

