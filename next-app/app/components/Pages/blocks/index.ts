import dynamic from 'next/dynamic'

interface BlockMap {
	[key: string]: any
	// React.ComponentType<{ data: any, className?: string, siteData?: SettingsPayload, draft?: boolean }>
}

export const BlockList: BlockMap = {
	Standard: dynamic(() => import('@components.next-app/Pages/blocks/Standard')),
	FeaturedTaxonomies: dynamic(() => import('@components.next-app/Pages/blocks/FeaturedTaxonomies')),
	Text: dynamic(() => import('@components.next-app/Pages/blocks/Text')),
	Newsletter: dynamic(() => import('@components.next-app/Pages/blocks/Newsletter')),
	FeaturedArticles: dynamic(() => import('@components.next-app/Pages/blocks/FeaturedArticles')),
	Info: dynamic(() => import('@components.next-app/Pages/blocks/Info')),
	Archive: dynamic(() => import('@components.next-app/Pages/blocks/Archive')),
	Image: dynamic(() => import('@components.next-app/Pages/blocks/Image')),
	Gallery: dynamic(() => import('@components.next-app/Pages/blocks/Gallery')),
	Contact: dynamic(() => import('@components.next-app/Pages/blocks/Contact'))
}

export default BlockList