import dynamic from 'next/dynamic'

interface BlockMap {
	[key: string]: React.ComponentType<{ data: any, className?: string, siteData?: SettingsPayload | undefined }>
}

export const BlockList: BlockMap = {
	Standard: dynamic(() => import('@/components/Pages/blocks/Standard')),
	FeaturedTaxonomies: dynamic(() => import('@/components/Pages/blocks/FeaturedTaxonomies')),
	Text: dynamic(() => import('@/components/Pages/blocks/Text')),
	Newsletter: dynamic(() => import('@/components/Pages/blocks/Newsletter')),
	FeaturedArticles: dynamic(() => import('@/components/Pages/blocks/FeaturedArticles')),
	Info: dynamic(() => import('@/components/Pages/blocks/Info')),
	Archive: dynamic(() => import('@/components/Pages/blocks/Archive')),
	Image: dynamic(() => import('@/components/Pages/blocks/Image')),
	Gallery: dynamic(() => import('@/components/Pages/blocks/Gallery')),
	Contact: dynamic(() => import('@/components/Pages/blocks/Contact'))
}

export default BlockList