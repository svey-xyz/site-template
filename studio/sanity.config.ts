/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import './src/style/studio.css'

import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { configStudioBasePath, configStudioName, configStudioTitle, dataset, projectId, sanityStudioPreviewURL } from '@lib.studio/api'
import { structure, schemaOptions, documentOptions } from '@src.studio/structure'
import { PluginOptions, defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { iconify } from 'sanity-plugin-iconify';
import { AdjustmentsHorizontalIcon, DocumentTextIcon, ArchiveBoxIcon, TableCellsIcon } from '@heroicons/react/24/solid'
import {
	presentationTool,
} from 'sanity/presentation'
import { resolve } from './src/lib/resolve'

const deskPlugins = [
	presentationTool({
		resolve,
		// locate,
		previewUrl: {
			origin: sanityStudioPreviewURL,
			previewMode: {
				enable: '/api/preview',
			},
		},
	}),
	structureTool({
		name: 'data',
		title: 'Data',
		icon: TableCellsIcon,
		structure,
	}),
	media(),
	iconify({
		showName: false,
		collections: ['heroicons']

	}),
] as PluginOptions[]


const config = defineConfig({
	icon: AdjustmentsHorizontalIcon,
  basePath: configStudioBasePath,
	name: configStudioName,
	title: configStudioTitle,
  projectId,
  dataset,
	schema: schemaOptions,
	plugins: deskPlugins,
	document: documentOptions,
	scheduledPublishing: {
		enabled: false,
	},
	tasks: {
		enabled: false
	},
	beta: {
		create: {
			startInCreateEnabled: false,
		}
	}
})
export default config;