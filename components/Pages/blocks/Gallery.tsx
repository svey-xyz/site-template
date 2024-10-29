'use client'

import React from "react"

type galleryType = ({ data, className }: { data: block_Gallery; className?: string; }) => React.JSX.Element

export const Gallery = async ({ data, className }: { data: block_Gallery, className?: string }) => {
	const GalleryStyle: galleryType | undefined =  data.style ?
		data.style == 'swiper' ? (await import("@/components/site/Gallery")).SwiperGallery :
		data.style == 'gallery' ? (await import("@/components/site/Gallery")).GridGallery :
		undefined : undefined

	if (!GalleryStyle) return []
	return <GalleryStyle data={data} className={className} />
}

export default Gallery