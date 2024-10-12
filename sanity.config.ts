/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

/** PLUGINS */
import { colorInput } from '@sanity/color-input'
import { noteField } from 'sanity-plugin-note-field'
import { visionTool } from '@sanity/vision'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId, googleMapsKey } from '@sanity/lib/api'
import { studioTheme } from '@styles/studio.theme'
import StudioHeader from '@components/studio/StudioHeader'
import StudioLogo from '@components/studio/StudioLogo'
import { structure, schemaOptions, documentOptions, defaultDocumentNode } from '@/sanity/structure'
import { googleMapsInput } from '@sanity/google-maps-input'
import { PluginOptions, defineConfig } from 'sanity'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { iconify } from 'sanity-plugin-iconify';

import { locate } from '@/sanity/lib/locate'

const googleMapsProps = {
	apiKey: googleMapsKey,
	defaultZoom: 16,
	defaultLocale: 'en',
	defaultLocation: {
		lat: 43.64953343641148,
		lng: -79.42172173646215,
	}
}
const defaultDesk = structureTool({
	structure,
	defaultDocumentNode
})
const deskPlugins = [
	defaultDesk,
	visionTool(),
	colorInput(),
	noteField(),
	media(),
	googleMapsInput(googleMapsProps),
	iconify({ showName: false, }),
	presentationTool({
		locate,
		previewUrl: {
			draftMode: {
				enable: '/api/draft',
			},
		},
	}),

] as PluginOptions[]


const config = defineConfig({
  basePath: '/studio',
	name: 'lptbia_studio',
	title: 'LPT BIA Studio',
  projectId,
  dataset,
	schema: schemaOptions,
	plugins: deskPlugins,
	document: documentOptions,
	studio: {
		components: {
			logo: StudioLogo,
			navbar: StudioHeader
		}
	},
	theme: studioTheme
})
export default config;