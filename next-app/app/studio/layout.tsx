import { configStudioTitle } from '@/sanity/lib/api';

import '@styles/studio/studio.css'
import "@mdxeditor/editor/style.css";

import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata,
): Promise<Metadata> {

	const titleTemplate = `${configStudioTitle} | %s`
	return {
		title: {
			template: titleTemplate,
			default: configStudioTitle,
		},
	}
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="m-0 h-0">
				{ children }
			</body>
    </html>
  )
}
