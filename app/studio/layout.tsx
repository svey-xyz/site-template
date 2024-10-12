import { loadSettings } from '@/sanity/queries/loadQuery';
import '@styles/studio.globals.css'

import { Metadata, ResolvingMetadata } from 'next';

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
		// description: "Generic description.",
		// keywords: ['Next.js', 'React', 'JavaScript'],
	}
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="m-0 h-0">{children}</body>
    </html>
  )
}
