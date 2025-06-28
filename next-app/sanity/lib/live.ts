import { defineLive } from "next-sanity";
import { client } from "./client";
import { token } from "@sanity.next-app/lib/token";

export const { sanityFetch, SanityLive } = defineLive({
	client: client,
	browserToken: token,
	serverToken: token,
});