import '@styles.next-app/globals.css'

import Header from '@components.next-app/Header'
import Footer from '@components.next-app/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import ThemeHandler from '@components.next-app/ThemeHandler';
import { draftMode } from 'next/headers'
import { sanityFetch, SanityLive } from '@sanity.next-app/lib/live'
import { toPlainText } from "next-sanity";
import { VisualEditing } from "next-sanity/visual-editing";
import { handleError } from "./client-utils";
import { revalidatePath } from 'next/cache'
import { settingsQuery } from '@sanity.next-app/queries/queries'
import { Metadata } from 'next'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
	const { data: settings } = await sanityFetch({
		query: settingsQuery,
		// Metadata should never contain stega
		stega: false,
	});
	const title = settings?.title || 'No title available';
	const description = settings?.description || 'No description available';

	// const ogImage = resolveOpenGraphImage(settings?.ogImage);
	let metadataBase: URL | undefined = undefined;
	try {
		metadataBase = settings?.ogImage?.metadataBase
			? new URL(settings.ogImage.metadataBase)
			: undefined;
	} catch {
		// ignore
	}
	return {
		metadataBase,
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description: toPlainText(description),
		openGraph: {
			// images: ogImage ? [ogImage] : [],
		},
	};
}

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const draft = await draftMode()
	const documentClasses = `${inter.variable} relative`

	return (
		// suppress hydration required for theme handler
		<html lang="en" className={documentClasses} suppressHydrationWarning>
			<Head />
			<body className='relative min-h-screen h-fit w-screen overflow-x-hidden flex flex-col'>
				
				{ draft.isEnabled && <VisualEditing />}
				<SanityLive onError={handleError} />

				<ThemeHandler>
					<Header />
					<main className='relative flex flex-col grow max-w-full'>
						{children}
					</main>
					<Footer />
				</ThemeHandler>
			</body>
		</html>
	) 
}



