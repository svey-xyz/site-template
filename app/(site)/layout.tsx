import '@styles/site/site.css'

import Header from '@components/site/Header'
import Footer from '@components/site/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import localFont from "next/font/local";
import ThemeHandler from '@/components/ThemeHandler';
import { getActiveTheme } from '@/lib/getTheme'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })
const theme = await getActiveTheme()
const font = theme?.text?.font

const LiveVisualEditing = dynamic(
	() => import('@/sanity/loader/LiveVisualEditing'),
)

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
				<ThemeHandler>
					<Header />

					<main className='relative flex flex-grow'>
							{children}
					</main>
					{draft.isEnabled && <LiveVisualEditing />}

					<Footer />
				</ThemeHandler>
			</body>
		</html>
	) 
}



