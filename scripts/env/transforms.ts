import fs from 'fs';
import path from 'path';

// Path configuration
const ROOT_DIR = path.resolve(__dirname, '../../');
const ROOT_ENV_FILE = path.join(ROOT_DIR, '.env');
const NEXT_ENV_FILE = path.join(ROOT_DIR, 'next-app/.env');
const SANITY_ENV_FILE = path.join(ROOT_DIR, 'studio/.env');

// To minimize drift from upstream, we import MAPPINGS and types from mappings.ts
import { MAPPINGS, EnvVars } from './mappings';

const transformEnv = () => {
	try {
		console.log('🔧 Transforming environment variables...');

		// Read root .env file
		const envContent = fs.readFileSync(ROOT_ENV_FILE, 'utf8');
		const lines = envContent.split('\n');

		// Parse variables from root .env
		const rootVars: EnvVars = {};
		lines.forEach(line => {
			// Skip comments and empty lines
			if (!line.trim() || line.startsWith('#')) return;

			const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
			if (match) {
				const key = match[1].trim();
				const value = match[2] ? match[2].trim() : '';
				rootVars[key] = value;
			}
		});

		console.log(`📖 Found ${Object.keys(rootVars).length} variables in root .env`);

		// Initialize variable collections
		const nextVars: EnvVars = {};
		const sanityVars: EnvVars = {};

		// Process SHARED mappings (NEW)
		console.log('\n🔄 Processing SHARED mappings:');
		Object.entries(MAPPINGS.shared).forEach(([rootKey, [nextKey, sanityKey]]) => {
			if (rootVars[rootKey] !== undefined) {
				nextVars[nextKey] = rootVars[rootKey];
				sanityVars[sanityKey] = rootVars[rootKey];
				console.log(`   ✓ ${rootKey} → ${nextKey} (Next.js)`);
				console.log(`   ✓ ${rootKey} → ${sanityKey} (Sanity)`);
			} else {
				console.log(`   ⚠ ${rootKey} not found in root .env (skipped)`);
			}
		});

		// Process Next.js specific mappings
		console.log('\n🔄 Processing Next.js specific mappings:');
		Object.entries(MAPPINGS.nextjs).forEach(([rootKey, targetKey]) => {
			if (rootVars[rootKey] !== undefined) {
				nextVars[targetKey] = rootVars[rootKey];
				console.log(`   ✓ ${rootKey} → ${targetKey}`);
			} else if (!Object.keys(MAPPINGS.shared).includes(rootKey)) {
				// Only warn if not already handled by shared mappings
				console.log(`   ⚠ ${rootKey} not found in root .env (skipped)`);
			}
		});

		// Process Sanity specific mappings
		console.log('\n🔄 Processing Sanity specific mappings:');
		Object.entries(MAPPINGS.sanity).forEach(([rootKey, targetKey]) => {
			if (rootVars[rootKey] !== undefined) {
				sanityVars[targetKey] = rootVars[rootKey];
				console.log(`   ✓ ${rootKey} → ${targetKey}`);
			} else if (!Object.keys(MAPPINGS.shared).includes(rootKey)) {
				// Only warn if not already handled by shared mappings
				console.log(`   ⚠ ${rootKey} not found in root .env (skipped)`);
			}
		});

		// Copy any existing NEXT_PUBLIC_ variables from root (as-is)
		Object.keys(rootVars).forEach(key => {
			if (key.startsWith('NEXT_PUBLIC_') && !nextVars[key]) {
				nextVars[key] = rootVars[key];
			}
		});

		// Copy any existing SANITY_STUDIO_ variables from root (as-is)
		Object.keys(rootVars).forEach(key => {
			if (key.startsWith('SANITY_STUDIO_') && !sanityVars[key]) {
				sanityVars[key] = rootVars[key];
			}
		});

		// Add passthrough variables
		MAPPINGS.passthrough.nextjs?.forEach(key => {
			if (rootVars[key] !== undefined && !MAPPINGS.exclude.includes(key)) {
				nextVars[key] = rootVars[key];
			}
		});

		MAPPINGS.passthrough.sanity?.forEach(key => {
			if (rootVars[key] !== undefined && !MAPPINGS.exclude.includes(key)) {
				sanityVars[key] = rootVars[key];
			}
		});

		MAPPINGS.passthrough.both?.forEach(key => {
			if (rootVars[key] !== undefined && !MAPPINGS.exclude.includes(key)) {
				nextVars[key] = rootVars[key];
				sanityVars[key] = rootVars[key];
			}
		});

		// Write Next.js .env file
		const nextEnvContent = Object.entries(nextVars)
			.map(([key, value]) => `${key}=${value}`)
			.join('\n');

		fs.writeFileSync(NEXT_ENV_FILE, nextEnvContent, 'utf8');

		// Write Sanity .env file
		const sanityEnvContent = Object.entries(sanityVars)
			.map(([key, value]) => `${key}=${value}`)
			.join('\n');

		fs.writeFileSync(SANITY_ENV_FILE, sanityEnvContent, 'utf8');

		// Summary
		const excludedVars = MAPPINGS.exclude.filter(key => rootVars[key]);
		console.log('\n📊 Transformation Complete:');
		console.log(`    -> Next.js: ${Object.keys(nextVars).length.toString().padEnd(3)} variables → .env`);
		console.log(`    -> Sanity:  ${Object.keys(sanityVars).length.toString().padEnd(3)} variables → .env`);
		console.log(`    -> Excluded: ${excludedVars.length.toString().padEnd(3)}`);

		// List excluded variables
		if (excludedVars.length > 0) {
			console.log('\n🔒 Excluded server-only variables:');
			excludedVars.forEach(key => console.log(`   • ${key}`));
		}

		// Quick tip
		console.log('\n💡 Tip: Update the MAPPINGS.shared section to add more shared variables.');

	} catch (error: unknown) {
		console.error('❌ Error transforming environment variables:', error);
		process.exit(1);
	}
}

// Run the transformation
transformEnv();