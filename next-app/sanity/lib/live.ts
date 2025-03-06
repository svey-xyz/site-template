
import { defineLive } from "next-sanity";
import { client } from "./client";
import { token } from "@sanity.next-app/lib/token";

export const { sanityFetch, SanityLive } = defineLive({
	client: client.withConfig({ apiVersion: "vX" }),
	browserToken: token,
	serverToken: token,
});