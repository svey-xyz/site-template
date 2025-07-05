import React from "react"

import { SwiperGallery, GridGallery } from "@components.next-app/Gallery";
import { Gallery_block } from "@next-app/sanity.types";


type galleryType = ({ images, className }: any
	// { images: sanityImage[]; className?: string; }
) => React.JSX.Element

export const Gallery = async ({ data, className }: { data: Gallery_block, className?: string }
) => {

	if (!data.images) return []
	
	let GalleryStyle = GridGallery
	switch(data.style) {
		case 'gallery':
			break;
		case 'swiper':
			GalleryStyle = SwiperGallery
			break;
		default:
			break;
	}

	return <GalleryStyle images={data.images} className={className} />
}

export default Gallery