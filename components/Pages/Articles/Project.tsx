import React from 'react';
import { article, article_Project } from '@/types';
import { notFound } from 'next/navigation'
import Image from '@components/site/Image'
import TextBlock from '@/components/site/TextBlock';
import Gallery from '@/components/site/Gallery';

export interface ProjectPageProps {
	data: article_Project | article
}

export const Project = async ({ data }: ProjectPageProps) => {
	if (!data) return notFound();
	if (data._type !== 'project') throw new Error(`Wrong article type - '${data._type}' - passed to Project article.)`)

	const project = data as article_Project
	
	return (
		<article className='py-12 max-h-fit overflow-hidden
		'>
			{project.image &&
				<div className='absolute inset-0 -mt-12 -mx-12'>
					<div className='relative h-[60dvh] overflow-hidden
						after:-z-1 after:absolute after:inset-0 after:bg-gradient-to-t after:from-bg after:via-bg/80 after:to-bg/0'>
						<Image
							image={project.image}
							size={{ width: 1200, height: 1200 }}
							style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'blur(25px)' }}
							className='absolute inset-0 -z-1 '
						/>
					</div>
					
				</div>
			}
			<div className='relative z-10 flex flex-col gap-4 main-padding'>
				<h1 className='text-accent text-5xl font-bold max-w-prose'>
					{project.title}
				</h1>

				{ project.description &&
					<div className='text-sm max-w-prose-full'>
						<TextBlock text={project.description} />
					</div>
				}

				{ project.gallery &&
					<div className='mt-2'>
						<h2 className='text-accent-secondary text-2xl'>Gallery</h2>
						<Gallery images={project.gallery} />
					</div>
				}

				{ project.writeup &&
					<div className='max-w-prose-full'>
						<TextBlock text={project.writeup} />
					</div>
				}

				{ project.credits &&
					<div className='max-w-prose'>
						<h2 className='text-accent-secondary'>Credits</h2>
						<TextBlock text={project.credits} />
					</div>
				}

				
			</div>
		</article>
	);
};

export default Project