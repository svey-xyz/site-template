/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */
import { structureTool } from 'sanity/structure'

/** PLUGINS */
import { noteField } from 'sanity-plugin-note-field'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, configStudioBasePath, configStudioName, configStudioTitle, dataset, projectId } from '@sanity/lib/api'
import { studioTheme } from '@styles/studio.theme'
import StudioHeader from '@components/studio/StudioHeader'
import StudioLogo from '@components/studio/StudioLogo'
import { structure, schemaOptions, documentOptions, defaultDocumentNode } from '@/sanity/structure'
import { PluginOptions, defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { iconify } from 'sanity-plugin-iconify';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

const defaultDesk = structureTool({
	structure,
	defaultDocumentNode
})
const deskPlugins = [
	defaultDesk,
	noteField(),
	media(),
	iconify({ showName: false, }),
	vercelDeployTool()

] as PluginOptions[]


const config = defineConfig({
  basePath: configStudioBasePath,
	name: configStudioName,
	title: configStudioTitle,
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