import React from "react";
import { Socials_block } from "@next-app/sanity.types";
import { SocialsArray } from "@components.next-app/SocialsArray";

export const Socials = ({ data, className }: { data: Socials_block, className?: string }) => {
	if (!data || !data.socials || data.socials.length === 0) return null;

	return (
		<div className={`${className} relative flex select-none`}>
			<SocialsArray socials={data.socials} />
		</div>
	)
}

export default Socials;