import { AssetSource } from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";

export const customMediaAssetSource: AssetSource = {
	...mediaAssetSource,
	icon: undefined,
}