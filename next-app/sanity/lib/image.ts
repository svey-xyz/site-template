import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@root.site-template/env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any /** sanityImage*/ ) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
