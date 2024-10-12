import React from "react";
import { article_Project } from "@/types";
import TextBlock from "@components/site/TextBlock";
import Image from '@components/site/Image'

type args = {
	item: article_Project,
	filtered?: boolean,
}

export const ProjectArchiveCard = async({ item, filtered = true }: args) => {
	return (
		<div className={`${filtered ? 'block' : "hidden"} relative flex flex-col`}>
			{/* <a href={`/projects/${project.data.slug.current}`} aria-label={`Link to project: ${project.data.title}`}
				className={`group relative flex flex-col w-full cursor-pointer `}>
				<div className='relative h-80 object-contain w-full min-h-[320px] mb-1'>
					{ project.data.image?.imageAsset && 
						<Image image={project.data.image} size={{ sizes: "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw" }} />
					}
					{!(project.data.image?.imageAsset) &&
						<div className="absolute inset-0 bg-fg-primary/30 border border-fg-primary p-6 overflow-ellipsis">
							{ project.data.about && <TextBlock text={project.data.about} /> }
						</div>
					}
				</div>
				<span className="text-xl font-bold leading-tight group-hover:opacity-75">
					{project.data.title}
				</span>
			</a> */}
		</div>
		
	)
}