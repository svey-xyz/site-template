import React from 'react';
import Image from '@components.next-app/Image'

import { resolveArticleHref } from '@lib.next-app/resolveHref';
import { AllSanitySchemaTypes, Article, Project } from '@next-app/sanity.types';
import { _ARTICLE_TYPES } from '@root.site-template/DocumentTypes';

type args = {
	article: Extract<AllSanitySchemaTypes, { isArticle?: boolean }>,
	filtered?: boolean,
}


export const GenericArchiveCard = ({ article, filtered = true }: args) => {

	return (
		// resolveArticleHref(article) || ''
		<a href={`/projects/${article.slug}`} className={`${filtered ? 'block' : "hidden"} my-2 max-w-full group opacity-100`}>
			<div className="relative py-4 px-2 flex flex-col md:flex-row justify-between w-full border border-accent-secondary/40 rounded
				after:absolute after:inset-0 after:-z-1 after:backdrop-blur-3xl after:bg-accent-secondary/5 group-hover:after:bg-accent-secondary/10
				after:duration-[1500ms] after:transition-colors group-hover:after:duration-100">
				<div className="text-fg-primary opacity-80 group-hover:opacity-100
					duration-[1500ms] transition-opacity group-hover:duration-100">
					{article.title}
				</div>
				{(article.taxonomies &&
					<div className="relative flex text-right flex-wrap gap-x-2 md:justify-end">
						{/* {article.taxonomies.map((tax, i, arr) => {
							if (article.title == allTagTitle) return
							return <span key={`${article.title}-${tax.title}`} className="text-fg-primary opacity-50">
								{tax.title}{i < arr.length - 1 ? ',' : ''}
							</span>
						})} */}
					</div>
				)}
			</div>
		</a>
	);
};

export default GenericArchiveCard;