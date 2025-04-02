/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import './src/style/studio.css'

import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, configStudioBasePath, configStudioName, configStudioTitle, dataset, projectId } from '@lib.studio/api'
import { structure, schemaOptions, documentOptions } from '@src.studio/structure'
import { PluginOptions, StudioToolMenu, defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { iconify } from 'sanity-plugin-iconify';
// import { pages } from "@tinloof/sanity-studio";
import { AdjustmentsHorizontalIcon, DocumentTextIcon, ArchiveBoxIcon, TableCellsIcon } from '@heroicons/react/24/solid'
import {
	presentationTool,
	defineDocuments,
	defineLocations,
	type DocumentLocation,
} from 'sanity/presentation'
import { resolve } from './src/lib/resolve'
import { locate } from './src/lib/locate'

const deskPlugins = [
	presentationTool({
		resolve,
		// locate,
		previewUrl: {
			origin: 'http://localhost:3000',
			previewMode: {
				enable: '/api/preview',
			},
		},
	}),

	// pages({
	// 	// Presentation's configuration
	// 	previewUrl: {
	// 		previewMode: {
	// 			enable: "/api/preview",
	// 		},
	// 	},
	// 	creatablePages: ["page", "archive"],
	// 	folders: {
	// 		"/archives": {
	// 			title: "Archives",
	// 			icon: ArchiveBoxIcon,
	// 		},
	// 		"": {
	// 			title: "Pages",
	// 			icon: DocumentTextIcon,
	// 		},
	// 	},
	// }),
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

})
export default config;