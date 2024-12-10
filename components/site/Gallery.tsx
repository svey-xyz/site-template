'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "@components/site/Image";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { XMarkIcon } from '@heroicons/react/24/solid'

// import "swiper/css";
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

export const SwiperGallery = ({ images, className }: { images: sanityImage[], className?: string }) => {
	const slide = 0

	return (
		<div className={`${className} flex flex-row items-center justify-center`}>
			<Swiper
				key={slide} // forces Swiper to rerender
				initialSlide={slide}
				observer={true}
				navigation={true} modules={[Pagination, Navigation, Keyboard]}
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
								className='w-auto h-full object-contain flex flex-row items-center justify-center max-h-[80vh] mx-auto max-w-full'
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

/** Tiled gallery */

export const GridGallery = ({ images, className }: { images: sanityImage[], className?: string }) => {
	const [mounted, setMounted] = useState(false)
	const refLightBox = useRef<HTMLDivElement>(null)
	const [activeSlide, setActiveSlide] = useState<number>(0)
	const [lightBoxState, setLightBoxState] = useState<boolean>(false)

	const _LIIGHTBOX = false // enable or disabled lightbox

	const openLightBox = ((e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) => {
		if (lightBoxState) return
		setActiveSlide(i)
		setLightBoxState(true)

		refLightBox.current?.classList.remove('hidden')
		document.body.classList.add("overflow-y-hidden")
	})

	const closeLightBox = useCallback(() => {

		if (!lightBoxState) return
		setLightBoxState(false)

		refLightBox.current?.classList.add('hidden')
		document.body.classList.remove("overflow-y-hidden")

	}, [lightBoxState, setLightBoxState, refLightBox])


	useEffect(() => {
		setMounted(true)
		const keyDownHandler = (e: KeyboardEvent) => {
			if (e.key == "Escape" && lightBoxState) closeLightBox();
		};
		document.addEventListener("keyup", keyDownHandler);
	}, [lightBoxState, closeLightBox])

	return (
		<div className=''>
			<div className={`${className} grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4`}>
				{images.map((image, i) => {
					if (!image) return
					return (
						<div key={image.imageAsset._id} className={`${_LIIGHTBOX ? 'cursor-pointer' : ''}`}
							onClick={(e) => { if (mounted && _LIIGHTBOX) openLightBox(e, i) }}>
							<Image
								className='w-full h-full object-contain items-center justify-center'
								image={image}
								size={{ width: 480, height: 480, sizes: "(max-height: 480px) 100vw, (max-width: 768px) 50vw, 33vw" }}
							/>
						</div>)
				})}
			</div>
			{_LIIGHTBOX &&
				<div className='fixed inset-0 bg-black/75 z-50 hidden' ref={refLightBox}>
					<XMarkIcon className="z-10 fixed text-fg h-10 w-10 duration-100 hover:scale-[1.1] right-[10px] top-[10px] cursor-pointer drop-shadow-lg"
						onClick={(e) => { if (mounted) closeLightBox() }} />
					<SwiperGallery images={images} className='h-full' />
				</div>
			}
		</div>
	);
};