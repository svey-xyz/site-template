// OBJECT INTERFACES

export interface _sanityImage extends Image {
	imageAsset: ImageAsset
}

export interface _object_Social extends inherentObjectData {
	socialType: 'twitter' | 'instagram' | 'facebook' | 'vimeo' | 'linkedin' | 'github' | 'mastodon' | 'youtube',
	socialTitle: string,
	url: string,
}

export interface _object_Date extends inherentObjectData {
	displayDateSpecificity: 'YYYY-MM-DD, HH:mm' | 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY',
	recurrence: '' | 'RRULE:FREQ=DAILY;INTERVAL=1' | 'RRULE:FREQ=WEEKLY;INTERVAL=1' | 'RRULE:FREQ=MONTHLY;INTERVAL=1' | 'RRULE:FREQ=YEARLY;INTERVAL=1',
	startDate?: string,
	endDate?: string,
}

export interface _object_Link extends inherentObjectData {
	text?: string,
	type?: 'internal' | 'external',
	link?: string,
	page?: PagePayload,
}

export interface _object_Contact extends inherentObjectData {
	email?: string,
	phone?: string,
	website?: string,
	socials?: Array<object_Social>
}

export interface _icon {
	_type: 'icon',
	name: string,
}

export interface _object_NavigationItem extends inherentObjectData {
	title: string,
	pages?: Array<PagePayload | ArchivePayload>,
}

export interface _section extends inherentObjectData {
	type: 'standard' | 'colour' | 'image' | 'video',
	columns?: boolean,
	header?: string,
	video?: string,
	image?: sanityImage,
	colour?: undefined | 'accent',
	blocks?: _BLOCK_TYPES
}