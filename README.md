# site-template
*by [svey](https://svey.xyz)*

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/svey-xyz/site-template?include_prereleases&sort=semver)](https://GitHub.com/svey-xyz/site-template/releases/)
[![GitHub commits](https://badgen.net/github/commits/svey-xyz/site-template)](https://GitHub.com/svey-xyz/site-template/commit/)
[![GitHub latest commit](https://img.shields.io/github/last-commit/svey-xyz/site-template/main
)](https://GitHub.com/svey-xyz/site-template/commit/)
[![GitHub issues](https://img.shields.io/github/issues/svey-xyz/site-template)](https://GitHub.com/svey-xyz/site-template/issues/)
[![GNU license v3.0](https://img.shields.io/badge/License-GNU-green.svg)](https://github.com/svey-xyz/site-template/LICENSE)

## Description
This repo is a template for the sites I build, it is designed to be highly flexible and customizable while providing a solid foundation to build on.

## Core concepts
### Block Builder

My sites are built to be managed by my clients. An important part of that is being able to easily update and maintain content. This template includes a block style padr editor I designed for Sanity to allow for easy control of page content and layout. In combination with Sanity's live preview functionality, and bespoke content dadhboards, it puts the clients in full control. Empowering the client to manage their own content without having to worry about ensuring proper standards and design consistency leads to improved workflows and more efficient content handling.

### Articles

Similarly to old-school CMSs like *Wordpress* or *Drupal*, this template is built around a primary document type called *articles*. *Articles* have a set of core fields so that they can be easily displayed in any existing content block, but they also allow for easy extension. A project can have any number of unique articles; some example article types might include- news, projects, places, etc.

### Archives

~~Archives are pages that have schemas automatically generated for them for each article.~~ Archives are pages that are linked to an article. If an article doesn't have a custom archive the default archive page will be used. This change is recent, check the status of issue [#25](issues/25).

### Taxonomies

~~Each article will generate a matching taxonomy definition.~~ Previously, each article had a unique taxonomy, that lead to a lot of developer overhead and limited the types of connections that could be made with taxonomies. Now a single taxonomy type is used across all documents and articles, allowing for more unique connections.

### Themes

Even though this template makes heavy use of *Tailwindcss* for utility based classes it attempts to separate many of the styling options from the layout to allow for quick initial styling when starting a new project. Core files implement *Tailwind* layout classes. [Read more](theme/README.md).

## Getting Started
Head to [Sanity.io](https://sanity.io) and create a new project from scratch; making sure to add the required api tokens and cors origin.

After cloning the repo the first step is to create a .env file with the following variables set:

***.env***
```properties
# required
SANITY_API_READ_TOKEN=''
SANITY_API_WRITE_TOKEN=''
NEXT_PUBLIC_SANITY_PROJECT_ID=''

# optional - defaults set in sanity/lib/api
NEXT_PUBLIC_SANITY_DATASET='production'
NEXT_PUBLIC_SANITY_API_VERSION='2024-10-14'
NEXT_PUBLIC_SANITY_CONFIG_STUDIO_NAME='studio'
NEXT_PUBLIC_SANITY_CONFIG_STUDIO_TITLE='studio'
```
Then run a dev environment and navigate to the studio to add all the required fields.

*Creating new *articles*, *sections*, and *blocks* all follow a similar process, steps for each are documented below.*

### Creating an article

Article schemas are kept in `sanity/schemas/articles/`. Once you have created your article be sure to add it to the imports and export of `sanity/schemas/articles/index.ts`. To enforce consistent naming and maintain strong typing when importing to the frontend the article types must be defined in `sanity/schemas/articles/types.ts`, and imported where needed.

On the frontend articles share a default singleton page but new singletons can be added for each article type. `components/Pages/articles/` is the directory for creating new article pages; ensure that you add your page to `components/Pages/ArticleRoute.tsx`.

### Creating a block

Block schemas are kept in `sanity/schemas/pages/blocks/`. Once you have created your block be sure to add it to the imports and export of `sanity/schemas/pages/blocks/index.ts`.

On the frontend blocks each have their own components located in `components/Pages/blocks/`. Ensure that you add your block to `components/Pages/Blocks.tsx`.

## Deployment

Since this template makes use of Nextjs server functionality the most straightforward deployment option is with [Vercel](https://vercel.com). For more information on integrating Vercel deployments with your GitHub repo read [here](https://vercel.com/docs/deployments/git#deploying-a-git-repository).

To enable deployment status previews in your GitHub repo ensure that the Vercel project is setup to integrate with your repo. Also ensure that you add all the necessary env variables to the Vercel project.

## Client Usage

*More info coming to this section*

### Making and editing pages
This template makes heavy use of Sanity's [presentation, and live editing features](https://www.sanity.io/docs/visual-editing-with-next-js-app-router-and-sanity-studio). This approach makes editing a breeze with an intuitive, and likely familiar looking, block builder.

## Roadmap

This is a living template intended to evolve and grow with each project and with changing web technologies.

## Tools
<a href="https://bun.sh/"><img src="../assets/logos/bun-logo.svg" alt="bun logo" height="40px"/></a>
&nbsp;
<a href="https://www.sanity.io/"><img src="../assets/logos/sanity-io-logo.webp" alt="Sanity.io logo" height="40px"/></a>
&nbsp;
<a href="https://nextjs.org"><img src="../assets/logos/NextJS-logo.png" alt="NextJS logo" height="40px"/></a>
&nbsp;
<a href="https://tailwindcss.com/"><img src="../assets/logos/TailwindCSS-logo.png" alt="TailwindCSS logo" height="40px"/></a>
&nbsp;
<a href="https://headlessui.com/"><img src="../assets/logos/HeadlessUI-logo.svg" alt="HeadlessUI logo" height="40px"/></a>
&nbsp;
<a href="https://heroicons.com/"><img src="../assets/logos/heroicons-logo.svg" alt="heroicons logo" height="40px"/></a>

*For a full list of tools used check the package.json*


