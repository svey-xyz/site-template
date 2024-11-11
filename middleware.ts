import { configStudioBasePath } from '@/sanity/lib/api';
import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
	console.log('Middleware run')
	const isStudio = request.headers.get('referer')?.startsWith(configStudioBasePath);
	const draft = await draftMode()

	if (!isStudio && draft.isEnabled) {
		draft.disable();
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/:path*', // Apply to all routes
};