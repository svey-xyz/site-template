'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "@components/site/Image";
import React from 'react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { sanityImage } from "@/types";

export default function SwiperGallery({ images, className, slide }: { images: Array<sanityImage>, className?: string, slide?: number }) {
	const SwiperStyles = {
		'--swiper-navigation-color': '#fff',
		'--swiper-pagination-color': '#fff',
	} as React.CSSProperties;

	return (
		<div className={`${className} flex flex-row items-center justify-center`}>
			<Swiper
				key={slide} // forces Swiper to rerender
				initialSlide={slide}
				observer={true}
				navigation={true} modules={[Pagination, Navigation, Keyboard]}
				style={SwiperStyles}
				keyboard={{
					enabled: true,
				}}
				pagination={{
					clickable: true,
				}}
				className="flex flex-row items-center justify-center" >
				{images.map((image) => {
					if (!image.imageAsset) return
					return (
						<SwiperSlide key={image.imageAsset._id} className=''>
							<Image
								className='w-auto h-full object-contain flex flex-row items-center justify-center max-h-[95vh] mx-auto max-w-[95vw]'
								image={image}
								size={{ width: 1200, height: 1200, sizes: "(max-height: 1200px) 100vw, (max-width: 1200px) 95vw, 33vw" }}
							/>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}