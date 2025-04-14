import '@styles.next-app/site/site.css'

import Header from '@components.next-app/Header'
import Footer from '@components.next-app/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import localFont from "next/font/local";
import ThemeHandler from '@components.next-app/ThemeHandler';
import { getActiveTheme } from 'web-theme-kit'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import { SanityLive } from '@sanity.next-app/lib/live'
import { VisualEditing, toPlainText } from "next-sanity";
import { handleError } from "./client-utils";

const inter = Inter({ subsets: ['latin'] })
const theme = await getActiveTheme(``)
const font = theme?.text?.font

// const LiveVisualEditing = dynamic(
// 	() => import('@sanity.next-app//loader/LiveVisualEditing'),
// )

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
			<Head />
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



