import '@styles/site.globals.css'

import Header from '@components/site/Header'
import Footer from '@components/site/Footer'

import { Inter } from 'next/font/google'
import Head from './head'
import { Metadata, ResolvingMetadata } from 'next';
import localFont from "next/font/local";
import { loadSettings } from '@/sanity/queries/loadQuery';
import ThemeHandler from '@/components/ThemeHandler';

const inter = Inter({ subsets: ['latin'] })
// const font = localFont({
// 	src: "../../public/fonts/",
// 	variable: "--custom-font",
// });

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

	const documentClasses = `${inter.className} relative` // ${font.variable}

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



