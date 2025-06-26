import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: sanityImage) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
