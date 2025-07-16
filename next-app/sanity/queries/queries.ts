import { defineQuery, groq } from "next-sanity";

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
		"slug": slug.current
	}
`);

export const settingsQuery: string = groq`
	*[_id == "settings" && _type == "settings"][0] {
		...,
		logo {
			...,
			"imageAsset":asset->
		},
		homepage->{
			slug
		},
		navigation[]{
			title,
			pages[]->{
				"slug":slug.current
			}
		}
	}
`

export const pageQuery: string = groq`
	*[_type=='page' && slug.current match $slug][0] {
  	...,
		sections[] {
			...,
			blocks[] {
				...,
				_type == "archive_block" => {
					...,
					featuredTaxonomies[]-> {
						...,
					} 
				},
				_type == "featuredTaxonomies_block" => {
					...,
					taxonomies[]->,
				},
				_type == "featuredArticles_block" => {
					...,
					articles[]-> {
						...,
						image {
							...,
							"imageAsset":asset->
						}
					},
				},
				_type == "image_block" => {
					...,
					image {
						...,
						"imageAsset":asset->
					}
				},
				_type == "gallery_block" => {
					...,
					images[] {
						...,
						"imageAsset":asset->
					}
				}
			}
		}
	}
`

export const staticPagesQuery: string = groq`
	*[_type == 'page'] {
		...,
		"slug":slug.current,
		sections[] {
			...,
			blocks[] {
				...,
				_type == "archive_block" => {
					...,
					featuredTaxonomies[]-> {
						...,
					} 
				},
				_type == "featuredTaxonomies_block" => {
					...,
					taxonomies[]->,
				},
				_type == "featuredArticles_block" => {
					...,
					articles[]-> {
						...,
						image {
							...,
							"imageAsset":asset->
						}
					},
				},
				_type == "image_block" => {
					...,
					image {
						...,
						"imageAsset":asset->
					}
				},
				_type == "gallery_block" => {
					...,
					images[] {
						...,
						"imageAsset":asset->
					}
				}
			}
		}
	}
`

export const staticArchivesQuery: string = groq`
	*[_type == 'archive'] {
		...,
		sections[] {
			...,
			blocks[] {
				...,
				_type == "archive_block" => {
					...,
					featuredTaxonomies[]-> {
						...,
					} 
				},
				_type == "featuredTaxonomies_block" => {
					...,
					taxonomies[]->,
				},
				_type == "featuredArticles_block" => {
					...,
					articles[]-> {
						...,
						image {
							...,
							"imageAsset":asset->
						}
					},
				},
				_type == "image_block" => {
					...,
					image {
						...,
						"imageAsset":asset->
					}
				},
				_type == "gallery_block" => {
					...,
					images[] {
						...,
						"imageAsset":asset->
					}
				}
			}
		}
	}
`

export const documentQuery: string = groq`
	*[_id == $id][0] {
  	...,
		"slug":slug.current,
	}
`

export const articleQuery: string = groq`
	*[_id == $id && isArticle == true][0] {
  	...,
		"slug":slug.current,
		taxonomies[]->
	}
`

export const bundleArticleQuery: string = groq`
	*[_type == $article && isArticle == true] {
		...,
		"slug":slug.current,
		taxonomies[]->
	}
`

export const archiveQuery: string = groq`
	*[_type=='archive' && _id == $archiveID][0] {
  	...,
		sections[] {
			...,
			blocks[] {
				...,
				_type == "archive_block" => {
					...,
					featuredTaxonomies[]-> {
						...,
					} 
				},
				_type == "featuredTaxonomies_block" => {
					...,
					taxonomies[]->,
				},
				_type == "featuredArticles_block" => {
					...,
					articles[]-> {
						...,
						image {
							...,
							"imageAsset":asset->
						}
					},
				},
				_type == "image_block" => {
					...,
					image {
						...,
						"imageAsset":asset->
					}
				},
				_type == "gallery_block" => {
					...,
					images[] {
						...,
						"imageAsset":asset->
					}
				}
			}
		}
	}
`

