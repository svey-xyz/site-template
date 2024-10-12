'use client';

import { block_Map } from '@/types';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useCallback, useMemo, useState } from 'react';
import { BusinessMarker } from '@/components/Pages/blocks/Map';
import { InfoPanel } from '@/components/Pages/blocks/Map/InfoPanel';

export const MapClient = ({ apiKey, mapData, businessMarkers, className }: { apiKey: string, mapData: block_Map, businessMarkers?: Array<BusinessMarker>, className?:string }) => {
	const libraries = useMemo(() => ['places'], []);
	const mapCenter = useMemo(
		() => (mapData.centre),
		[]
	);
	const [selectedMarker, setSelectedMarker] = useState<BusinessMarker | null>(null);
	const [panelOpen, setPanelOpen] = useState<boolean>(false);

	const mapHeight: string = '400px'

	const mapOptions = useMemo<google.maps.MapOptions>(
		() => ({
			// disableDefaultUI: true,
			clickableIcons: true,
			scrollwheel: false,
			mapId: '9f77439149649dc7',
		}),
		[]
	);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: apiKey,
		libraries: libraries as any,
	});

	const onMarkerClick = useCallback((marker: BusinessMarker) => {
		setSelectedMarker(marker);
		setPanelOpen(true);
	}, []);

	const handleClose = () => {
		setSelectedMarker(null); // Close the InfoWindow
		setPanelOpen(false);
	};

	if (!isLoaded) {
		return (
			<div className={`${className}`}>
				<div className='flex flex-col justify-center items-center' style={{ height: mapHeight }}>
					<p className={`text-accent font-black`}>
						Loading Map...
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className='section-block'>
			<GoogleMap
				options={mapOptions}
				zoom={16}
				center={mapCenter}
				id='9f77439149649dc7'
				// mapTypeId='162b1e292ce4fc80'
				mapContainerStyle={{ width: '100%', height: mapHeight }}
			>
				{ businessMarkers?.map((marker, index) => {
					const primarytaxonomy = marker.business.taxonomies ? marker.business.taxonomies[0] : null
					const icon = primarytaxonomy ? primarytaxonomy.icon : undefined

					const iconString = icon?.name.split(':')

					const mapIcon: string | google.maps.Icon | google.maps.Symbol | undefined = iconString ? {
						url: `https://api.iconify.design/${iconString[0]}/${iconString[1]}.svg?color=%23b00c00`,
						scaledSize: new window.google.maps.Size(32, 32)
					} : undefined

					return (
						<Marker
							key={index}
							position={marker.geopoint}
							icon={mapIcon}
							onClick={() => onMarkerClick(marker)}
							
						/>
					)
				})}
				{ selectedMarker && (
					<InfoPanel 
						marker={selectedMarker}
						handler={handleClose}
						className={`transition-all duration-500 ${panelOpen ? 'translate-x-0' : '-translate-x-full'}`}
					/>
				)}
			</GoogleMap>
		</div>
	);
};

export default MapClient;