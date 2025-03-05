import React from "react"

import { SwiperGallery } from "@/components/Gallery";
import { GridGallery } from "@/components/Gallery";


type galleryType = ({ images, className }: { images: sanityImage[]; className?: string; }) => React.JSX.Element

export const Gallery = async ({ data, className }: { data: block_Gallery, className?: string }) => {
	
	const GalleryStyle: galleryType | undefined =  data.style ?
		data.style == 'swiper' ? SwiperGallery :
			data.style == 'gallery' ? GridGallery :
				GridGallery : GridGallery

	if (!GalleryStyle) return <></>
	return <GalleryStyle images={data.images} className={className} />
}

export default Gallery