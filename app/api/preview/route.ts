import { resolveHrefFromSlug, resolvePageHref } from "@/lib/resolveHref";
import { NextApiRequest, NextApiResponse } from "next";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { serverClient } from "@/sanity/queries/loadQuery";

export async function GET(req: NextApiRequest) {
	const { isValid, redirectTo = '/' } = await validatePreviewUrl(serverClient, req.url ?? ``)
	if (!isValid) {
		return new Response('Invalid secret', { status: 401 })
	}
	const draft = await draftMode()
	draft.enable()

	redirect(redirectTo)
	// const { searchParams } = new URL(req.url ?? ` `);
	// const _slug = searchParams.get("slug");
	// const _type = searchParams.get("type");

	// if (!_slug || !_type) return new NextResponse(JSON.stringify({ answer: "No slug or type found!" }), {
	// 	status: 400,
	// });

	// const slug = resolveHrefFromSlug(_slug, _type)

	// const draft = await draftMode()
	// draft.enable();
	// redirect(`${slug ?? '/'}`);
}