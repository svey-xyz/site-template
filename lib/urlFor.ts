import { client } from "@sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { ImageUrlBuilder } from "next-sanity-image"

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource): ImageUrlBuilder {
	return builder.image(source)
}

export default urlFor;