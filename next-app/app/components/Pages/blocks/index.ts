import dynamic from 'next/dynamic'
import { _BLOCK_TYPES } from '@root.site-template/DocumentTypes'
import { ComponentType } from 'react'

type BlockMap = {
	[key in _BLOCK_TYPES]: ComponentType<any>
}

export const BlockList: BlockMap = {
	featuredTaxonomies_block: dynamic(() => import('@components.next-app/Pages/blocks/FeaturedTaxonomies')),
	text_block: dynamic(() => import('@components.next-app/Pages/blocks/Text')),
	newsletter_block: dynamic(() => import('@components.next-app/Pages/blocks/Newsletter')),
	featuredArticles_block: dynamic(() => import('@components.next-app/Pages/blocks/FeaturedArticles')),
	info_block: dynamic(() => import('@components.next-app/Pages/blocks/Info')),
	archive_block: dynamic(() => import('@components.next-app/Pages/blocks/Archive')),
	image_block: dynamic(() => import('@components.next-app/Pages/blocks/Image')),
	gallery_block: dynamic(() => import('@components.next-app/Pages/blocks/Gallery')),
	contact_block: dynamic(() => import('@components.next-app/Pages/blocks/Contact'))
}

export default BlockList