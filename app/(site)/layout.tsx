import '@styles/site.globals.css'

import Header from '@components/site/Header'
import Footer from '@components/site/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import { Metadata, ResolvingMetadata } from 'next';
import localFont from "next/font/local";
import { loadSettings } from '@/sanity/queries/loadQuery';
import ThemeHandler from '@/components/ThemeHandler';
import { getActiveTheme } from '@/lib/getTheme'

const inter = Inter({ subsets: ['latin'] })
const theme = await getActiveTheme()
const font = theme?.text?.font

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const data = await loadSettings()
	const settings = data
	
	const titleTemplate = `${settings.title} | %s`
	return {
		title: {
			template: titleTemplate,
			default: settings.title,
		},
		description: "Generic description.",
		keywords: ['Next.js', 'React', 'JavaScript'],
		// authors: [{ name: 'svey', url: 'https://svey.xyz' }],
		// creator: 'Hayden Soule',
		// publisher: 'Hayden Soule',
	}
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {

	const documentClasses = `${inter.className} ${font?.variable} relative` // 

	return (
		// suppress hydration required for theme handler
		<html lang="en" className={documentClasses} suppressHydrationWarning> 
			<Head />
			<body className='min-h-screen h-full overflow-x-hidden flex flex-col'>
				<ThemeHandler>
					<Header />
					<main className='min-h-full flex-grow'>
						{ children }
					</main>
					<Footer />
				</ThemeHandler>
			</body>
		</html>
	) 
}



