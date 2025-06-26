import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const draft = await draftMode()
	draft.disable()
	const url = new URL(req.nextUrl)
	return NextResponse.redirect(new URL('/', url.origin))
}