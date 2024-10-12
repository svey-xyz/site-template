
import Client from '@/components/Pages/blocks/Map/Client';
import { googleMapsKey } from '@/lib/env';
import { loadArticles } from '@/sanity/queries/loadQuery';
import { article_Business, block_Map, icon } from '@/types';

export const Map = async ({ data, className }: { data: block_Map, className?:string }) => {
	if (!data) return

	const initial = await loadArticles<article_Business>('business')
	const businesses = initial.data;
	const FeaturedTaxonomies = data.featured_Businesses

	const businessMarkers = businesses.flatMap((business) => {
		const address = business.addresses ? business.addresses[0] : null
		if (!address) return []
		if (FeaturedTaxonomies) {
			let hasFeature = false
			if (!business.taxonomies) return []

			for (var tax of business.taxonomies) {
				if (FeaturedTaxonomies.includes(tax)) {
					hasFeature = true
					break
				}
			}

			if (!hasFeature) return []
		}

		return ({
			geopoint: address.location,
			business
		});
	})
	
	return <Client apiKey={googleMapsKey} mapData={data} businessMarkers={businessMarkers} className={`${className}`} />
};

export default Map;