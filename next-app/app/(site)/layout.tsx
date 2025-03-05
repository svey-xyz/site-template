import '@styles/site/site.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import localFont from "next/font/local";
import ThemeHandler from '@/components/ThemeHandler';
import { getActiveTheme } from '@/next-app/lib/getTheme'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import { SanityLive } from '@/sanity/lib/live'

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
							<SanityLive />
						{draft.isEnabled && <LiveVisualEditing />}

					</main>

					<Footer />
				</ThemeHandler>
			</body>
		</html>
	) 
}



