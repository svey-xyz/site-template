/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, configStudioBasePath, configStudioName, configStudioTitle, dataset, projectId } from '@sanity/lib/api'
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
	media(),
	iconify({ showName: false, }),
	vercelDeployTool(),
	structureTool({
		defaultDocumentNode,
		structure
	})

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
			navbar: StudioHeader,
		
		}
	},
})
export default config;