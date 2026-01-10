import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from 'shared-config'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any /** sanityImage*/ ) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
