// Variable mapping configuration
export const MAPPINGS: MappingConfig = {
	// Shared mappings - one root variable to both frameworks
	shared: {
		// Format: 'ROOT_VAR_NAME': ['NEXT_PUBLIC_TARGET_NAME', 'SANITY_STUDIO_TARGET_NAME']
		'STUDIO_TITLE': ['NEXT_PUBLIC_SANITY_CONFIG_STUDIO_TITLE', 'SANITY_STUDIO_TITLE'],
		'STUDIO_NAME': ['NEXT_PUBLIC_SANITY_CONFIG_STUDIO_NAME', 'SANITY_STUDIO_NAME'],
		'STUDIO_API_VERSION': ['NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_STUDIO_API_VERSION'],
		'STUDIO_DATASET': ['NEXT_PUBLIC_SANITY_DATASET', 'SANITY_STUDIO_DATASET'],
		'STUDIO_PROJECT_ID': ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_STUDIO_PROJECT_ID'],
	},

	// Next.js mappings - Format: 'ROOT_VAR_NAME': 'NEXT_PUBLIC_TARGET_NAME'
	nextjs: {},

	// Sanity Studio mappings - Format: 'ROOT_VAR_NAME': 'SANITY_STUDIO_TARGET_NAME'
	sanity: {},

	// Variables to exclude from both (sensitive server-only vars)
	exclude: [],

	// Variables to pass through unchanged (no prefix added)
	passthrough: {
		nextjs: [],
		sanity: [],
		both: ['SANITY_API_READ_TOKEN', 'NODE_ENV']
	}
};

export type EnvVars = { [key: string]: string };

export type MappingConfig = {
	shared: { [key: string]: [string, string] }; // New shared mapping
	nextjs: EnvVars;
	sanity: EnvVars;
	exclude: string[];
	passthrough: {
		nextjs?: string[];
		sanity?: string[];
		both?: string[];
	};
};