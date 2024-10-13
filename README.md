# site-template
*by [svey](https://svey.xyz)*

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/svey-xyz/site-template?include_prereleases&sort=semver)](https://GitHub.com/svey-xyz/site-template/releases/)
[![GitHub commits](https://badgen.net/github/commits/svey-xyz/site-template)](https://GitHub.com/svey-xyz/site-template/commit/)
[![GitHub latest commit](https://badgen.net/github/last-commit/svey-xyz/site-template)](https://GitHub.com/svey-xyz/site-template/commit/)
[![GitHub issues](https://img.shields.io/github/issues/svey-xyz/site-template)](https://GitHub.com/svey-xyz/site-template/issues/)
[![GNU license v3.0](https://img.shields.io/badge/License-GNU-green.svg)](https://github.com/svey-xyz/site-template/LICENSE)

## Description
This repo is a template for the sites I build, it is designed to be highly flexible and customizable while providing a solid foundation to build on.

## Core concepts
### Block Builder

My sites are built to be managed by my clients. A core part of that is being able to easily update and maintain content. This template includes a block style content management system I designed for Sanity to allow for easy control of page content and layout. In combination with Sanity's live preview functionality it puts the clients in full control, while ensuring proper standards and a design consistency are met.

#### Sections
Sections are built to hold and arrange blocks while providing the client with styling options.

### Articles

Similarly to old-school CMSs like *Wordpress* or *Drupal*, this template is built around a primary document type called *articles*. *Articles* have a set of core fields so that they can be easily displayed in any existing content block, but they also allow for easy extension. A project can have any number of unique articles; some example article types might include- news, projects, places, etc.

### Archives

Archives are pages that have schemas automatically generated for them for each article.

### Taxonomies

Each article will generate a matching taxonomy definition.

### Themes

Even though this tempalte makes heavy use of *Tailwindcss* it attempts to seperate much of the styling from the layout to allow for easier styling options when starting a new project. Core files implement *Tailwind* layout classes.

## Getting Started
After cloning the repo the first step is to create a .env file with the following variables set:

***.env***

SANITY_API_READ_TOKEN

SANITY_API_WRITE_TOKEN

NEXT_PUBLIC_SANITY_API_VERSION

NEXT_PUBLIC_SANITY_DATASET

NEXT_PUBLIC_SANITY_PROJECT_ID

*Creating new *articles*, *sections*, and *blocks* all follow a similar process, steps for each are documented below.*

### Creating an article

Article schemas are kept in `sanity/schemas/articles/`. Once you have created your article be sure to add it to the imports and export of `sanity/schemas/articles/index.ts`.

On the frontend articles share a default singleton page but new singletons can be added for each article type. `components/Pages/articles/` is the directory for creating new article pages; ensure that you add your page to `components/Pages/ArticleRoute.tsx`

### Creating a section

All sections are managed in a single schema, located in `sanity/schemas/pages/section.tsx`.

On the frontend sections each have their own components located in `components/Pages/sections/`. Ensure that you add your section to `components/Pages/Page.tsx`.

### Creating a block

Block schemas are kept in `sanity/schemas/pages/blocks/`. Once you have created your block be sure to add it to the imports and export of `sanity/schemas/pages/blocks/index.ts`.

On the frontend blocks each have their own components located in `components/Pages/blocks/`. Ensure that you add your block to `components/Pages/Blocks.tsx`.

## Deployment

Since this template makes use of Nextjs server functionality the most straightforward deployment option is with [Vercel](https://vercel.com). For more information on integrating Vercel deployments with your GitHub repo read [here](https://vercel.com/docs/deployments/git#deploying-a-git-repository).

To enable deployment status previews in your GitHub repo ensure that the Vercel project is setup to integrate with your repo. Also ensure that you add all the necessary env variables to the Vercel project. 

## Roadmap

This is a living template intended to evolve and grow with each project and with changing web technologies.

## Tools
[Sanity](https://www.sanity.io/)

[Next.js](https://nextjs.org/)

[Tailwindcss](https://tailwindcss.com/)

[HeadlessUI](https://headlessui.com/)

[heroicons](https://heroicons.com/)

