/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { dataset, projectId, sanityStudioHost } from '@config'
import { defineCliConfig } from 'sanity/cli'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineCliConfig({
	api: { projectId, dataset },
	typegen: {
		path: "./src/**/*.{ts,tsx,js,jsx}",
		schema: "schema.json",
		generates: "./sanity.types.ts",
		overloadClientMethods: true
	},
	// autoUpdates: true,
	studioHost: sanityStudioHost,
	reactStrictMode: true,
	vite: {
		plugins: [tsconfigPaths()],
	},
})
