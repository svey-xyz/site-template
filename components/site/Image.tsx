'use client'

import client from '@sanity/lib/client';
import { sanityImage } from '@/types';
import { useNextSanityImage } from 'next-sanity-image'
import Img from 'next/image'
import React, { CSSProperties } from 'react'

const DEFAULT_HEIGHT = 100
const DEFAULT_WIDTH = 100

const Image = ({
	image, size, className, style
}: {
	image: sanityImage,
	size?: { width?: number, height?: number, sizes?: string },
	className?: string
	style?: CSSProperties
}) => {
	if (!image.imageAsset) return
	const imageProps = useNextSanityImage(client, image);

	return (<Img
		{...imageProps}
		width={size?.width ? size?.width : DEFAULT_WIDTH}
		height={size?.height ? size?.height : DEFAULT_HEIGHT}
		sizes={size?.sizes}
		placeholder="blur"
		blurDataURL={image.imageAsset.metadata.lqip}
		alt={image.imageAsset.description ? image.imageAsset.description : 'No alt text found'}
		className={className}
		style={style}
		loading="lazy"
	/>)
}

export default Image