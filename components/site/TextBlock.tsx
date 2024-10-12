import { portableTextComponents } from "@/sanity/lib/portableTextComponents";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";

export default function TextBlock({ text }: { text?: PortableTextBlock }) {
	if (!text) return
	return <PortableText value={text} components={portableTextComponents} />

}