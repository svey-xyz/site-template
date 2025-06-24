import '@styles.next-app/globals.css'

import Header from '@components.next-app/Header'
import Footer from '@components.next-app/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import ThemeHandler from '@components.next-app/ThemeHandler';
import { draftMode } from 'next/headers'
import { SanityLive } from '@sanity.next-app/lib/live'
import { VisualEditing } from "next-sanity";
import { handleError } from "./client-utils";
import { ACTIVE_THEME } from '@styles.next-app/theme';
// import { Theme } from '@styles.next-app/theme';

const inter = Inter({ subsets: ['latin'] })

const font = ACTIVE_THEME?.text?.font

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const draft = await draftMode()
	const documentClasses = `${inter.className} ${font?.variable} relative`

	return (
		// suppress hydration required for theme handler
		<html lang="en" className={documentClasses} suppressHydrationWarning>
			<Head theme={ACTIVE_THEME} />
			<body className='min-h-screen h-full overflow-x-hidden flex flex-col'>
				
				{ draft.isEnabled && <VisualEditing /> }
				<SanityLive onError={handleError} />

				<ThemeHandler>
					<Header />
					<main className='relative flex flex-grow'>
						{children}
					</main>
					<Footer />
				</ThemeHandler>
			</body>
		</html>
	) 
}



