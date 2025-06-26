import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@sanity.next-app/lib/client";
import { token } from "@sanity.next-app/lib/token";

export const { GET } = defineEnableDraftMode({
	client: client.withConfig({ token }),
});