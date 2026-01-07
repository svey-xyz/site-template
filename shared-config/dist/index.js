"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.sanityStudioHost = exports.sanityStudioPreviewURL = exports.configStudioTitle = exports.configStudioName = exports.configStudioBasePath = exports.apiVersion = exports.projectId = exports.dataset = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */
exports.dataset = assertValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');
exports.projectId = assertValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
// see https://www.sanity.io/docs/api-versioning for how versioning works
exports.apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-14';
exports.configStudioBasePath = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/';
exports.configStudioName = process.env.NEXT_PUBLIC_SANITY_STUDIO_NAME || 'studio';
// export const revalidateSecret = env.SANITY_REVALIDATE_SECRET
exports.configStudioTitle = process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE || 'studio';
exports.sanityStudioPreviewURL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';
exports.sanityStudioHost = process.env.SANITY_STUDIO_HOST || 'localhost';
exports.config = {
    projectId: exports.projectId,
    dataset: exports.dataset,
    baseUrl: 'http://localhost:3333',
};
function assertValue(v, errorMessage) {
    console.log('Value: ', v);
    if (v === undefined) {
        throw new Error(errorMessage);
    }
    return v;
}
