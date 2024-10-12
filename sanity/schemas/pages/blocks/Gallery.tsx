import { defineField } from 'sanity';
import constructors from '@/sanity/schemas/pages/constructors';
import { mediaAssetSource } from 'sanity-plugin-media';
import { GrGallery } from "react-icons/gr";

const fields = [
	defineField({
		title: 'Images',
		name: 'images',
		type: 'array',
		of: [
			defineField({
				title: 'Image',
				name: 'image',
				type: 'image',
				options: {
					sources: [mediaAssetSource],
				},
				preview: {
					select: {
						asset: 'asset',
						title: 'asset.title',
						description: 'asset.description'

					},
					prepare(value: any) {
						return {
							title: value.title ? value.title : 'Untitled Image',
							subtitle: value.description,
							media: value.asset
						}
					}
				},
			}),
		]
	}),
]

export const Gallery = constructors.block({ name: 'Gallery', fields, icon: GrGallery })