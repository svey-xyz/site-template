/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { dataset, projectId } from './src/lib/api'
import { defineCliConfig } from 'sanity/cli'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineCliConfig({
	api: { projectId, dataset },
	reactStrictMode: true,
	vite: {
		plugins: [tsconfigPaths()],
	},
})
