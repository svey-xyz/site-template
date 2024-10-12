import { portableTextComponents } from "@lib/portableTextComponents";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock, TypedObject } from "sanity";

export default function TextBlock({ text }: { text?: PortableTextBlock }) {
	if (!text) return
	return <PortableText value={text} components={portableTextComponents} />

}