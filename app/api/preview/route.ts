import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const param = searchParams.get("page");
	
	const draft = await draftMode()
	draft.enable();
	redirect(`/${param ?? ''}`);
}