import '@styles/site.globals.css'

import { Analytics } from '@vercel/analytics/react';
import Header from '@components/site/Header'
import Footer from '@components/site/Footer'

import { Inter } from 'next/font/google'
import Head from '@site/head'
import { draftMode } from 'next/headers';
import { Metadata, ResolvingMetadata } from 'next';
import localFont from "next/font/local";
import { loadSettings } from '@/sanity/queries/loadQuery';
import { AutomaticVisualEditing } from '@/components/AutomaticVisualEditing';

const inter = Inter({ subsets: ['latin'] })
const firaCode = localFont({
	src: "../../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
	variable: "--font-montserrat",
});

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const initial = await loadSettings()
	const settings = initial.data
	
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
	children,
}: {
	children: React.ReactNode,
}) {

	let documentClasses = `${inter.className} ${firaCode.variable} relative`
	
	return (
		<html lang="en" className={documentClasses} suppressHydrationWarning>
			<Head />
			<body className='min-h-screen h-full overflow-x-hidden flex flex-col'>
				<Header />
				<main className='min-h-full flex-grow'>
					{ children }
				</main>
				{ draftMode().isEnabled && <AutomaticVisualEditing /> }
				<Footer />
				<Analytics />
			</body>
		</html>
	) 
}



