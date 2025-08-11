import React from "react";
import { Socials_block } from "@next-app/sanity.types";
import { SocialsArray } from "@components.next-app/Socials";

export const Socials = ({ data, className }: { data: Socials_block, className?: string }) => {
	if (!data || !data.socials || data.socials.length === 0) return [];

	return (
		<div className={`${className} relative flex flex-col items-center px-6 py-4 gap-4 w-auto max-w-fit rounded-md border pointer-events-none select-none`}>
			<SocialsArray socials={data.socials} />
		</div>
	)
}

export default Socials;