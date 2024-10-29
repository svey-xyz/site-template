'use client'

import { SwiperGallery, GridGallery } from "@/components/site/Gallery"
import React from "react"

type galleryType = ({ data, className }: { data: block_Gallery; className?: string; }) => React.JSX.Element

export const Gallery = ({ data, className }: { data: block_Gallery, className?: string }) => {
	const GalleryStyle: galleryType =  data.style ?
		data.style == 'swiper' ? SwiperGallery :
		data.style == 'gallery' ? GridGallery :
		GridGallery : GridGallery

	return <GalleryStyle data={data} className={className} />
}

export default Gallery