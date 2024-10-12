import { defineField } from 'sanity';
import constructors from '@/sanity/schemas/pages/constructors';
import { mediaAssetSource } from 'sanity-plugin-media';
import { FaImage } from 'react-icons/fa6';
import { camelCaseToWords } from '@/lib/stringFunctions';

const fields = [
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
	defineField({
		title: 'Accented',
		name: 'accented',
		type: 'boolean',
		description: 'Applies accent styling to the image.'
	})
]

const preview = {
	select: {
		type: '_type',
		title: 'title',
		image: 'image'
		// logo: 'logo',
	},
	prepare(value: any) {
		const { type, title, image } = value
		return {
			title: type ? camelCaseToWords(type) : 'Unknown Block Type',
			media: image.asset ? image.asset : FaImage,
		}
	},
}

export const Image = constructors.block({ name: 'Image', fields, icon: FaImage, preview })