import { page } from '@/sanity/schemas/pages/constructors/page';
import { RiGalleryView } from 'react-icons/ri';
import { defineField, defineArrayMember } from 'sanity';

const fields = [
]

export const archive = page({ name: 'archive', icon: RiGalleryView })