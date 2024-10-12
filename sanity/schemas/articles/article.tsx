import { defineArrayMember, defineField, defineType } from "sanity";
import { BsFillBookmarkFill } from 'react-icons/bs'
import { ARTICLE } from "@/sanity/schemas/articles/constructors/article";

const fields = [
]

const args = { type: 'article', icon: BsFillBookmarkFill }
export const articles = new ARTICLE(args)

