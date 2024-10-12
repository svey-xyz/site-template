import { article_Business } from '@/types';
import { Map } from './Map'

export interface LatLng {
	lat: number;
	lng: number;
}

export interface BusinessMarker {
	geopoint: LatLng,
	business: article_Business
}

export default Map