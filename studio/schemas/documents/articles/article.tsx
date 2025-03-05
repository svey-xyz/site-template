import { ARTICLE } from "../articles/constructors/article";
import { _ARTICLE_TYPES } from "../articles/types";
import { NewspaperIcon } from "@heroicons/react/24/solid";

const _NewspaperIcon = () => <NewspaperIcon />;

const fields = [
]

const args = { type: _ARTICLE_TYPES.article, icon: NewspaperIcon }
export const article = new ARTICLE(args)

