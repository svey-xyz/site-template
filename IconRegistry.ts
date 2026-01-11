import { _BLOCK_TYPES } from "@root.site-template/DocumentTypes";

import { ArchiveBoxIcon } from '@heroicons/react/24/solid'
import { InboxArrowDownIcon } from '@heroicons/react/24/solid'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { SwatchIcon } from '@heroicons/react/24/solid'
import { Squares2X2Icon } from '@heroicons/react/24/solid'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { IdentificationIcon } from '@heroicons/react/24/solid'
import { EnvelopeOpenIcon } from '@heroicons/react/24/solid'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';


const iconRegistry: Record<_BLOCK_TYPES, React.ComponentType> = {
	[_BLOCK_TYPES.ARCHIVE]: ArchiveBoxIcon,
	[_BLOCK_TYPES.CONTACT]: InboxArrowDownIcon,
	[_BLOCK_TYPES.FEATURED_ARTICLES]: SparklesIcon,
	[_BLOCK_TYPES.FEATURED_TAXONOMIES]: SwatchIcon,
	[_BLOCK_TYPES.GALLERY]: Squares2X2Icon,
	[_BLOCK_TYPES.IMAGE]: PhotoIcon,
	[_BLOCK_TYPES.INFO]: IdentificationIcon,
	[_BLOCK_TYPES.NEWSLETTER]: EnvelopeOpenIcon,
	[_BLOCK_TYPES.TEXT]: Bars3BottomLeftIcon,
	[_BLOCK_TYPES.NOTE]: ChatBubbleLeftEllipsisIcon,
	[_BLOCK_TYPES.SOCIALS]: GlobeAltIcon,
	[_BLOCK_TYPES.SPACER]: ChevronUpDownIcon,
}

export const getIcon = (type: _BLOCK_TYPES) => iconRegistry[type];