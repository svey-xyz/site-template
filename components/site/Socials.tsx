import React from 'react';
import type { object_Social } from '../../types'
import { FaLink, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

import { IconType } from "react-icons";

const Socials = ({ socials, className }: { socials: Array<object_Social>, className?:string}) => {
	
	return (
		<div className={`${className} flex flex-row gap-4`}>
			{ socials.map((social) => {
				const Icon: IconType = (() => {
					switch (social.socialType) {
						case ('facebook'):
							return FaFacebook;
						case ('instagram'):
							return FaInstagram;
						case ('twitter'):
							return FaTwitter;
						default:
							return FaLink;
					}
				})()

					return (
						<a key={social._key} href={social.url} target="_blank" referrerPolicy="no-referrer" aria-label={`External link to social network: ${social.socialType}`}
							className="group cursor-pointer relative inline-flex items-center justify-center w-icon h-icon" >
							<Icon className="relative w-full h-auto block duration-100 opacity-80 group-hover:scale-[1.2] will-change-transform group-hover:opacity-100" />
						</a >
					)
				})
			}
		</div>
	);
};

export default Socials;