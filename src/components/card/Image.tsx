import { cn } from '@/helpers/utils'
import type { CardImageProps } from './types'

function Image({ src, alt, className, aspectRatio = 'auto', objectFit = 'cover' }: CardImageProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    auto: '',
  }

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    scaleDown: 'object-scale-down',
  }

  return (
    <div className={cn('overflow-hidden', aspectRatioClasses[aspectRatio])}>
      <img
        src={src}
        alt={alt}
        className={cn('h-full w-full', objectFitClasses[objectFit], className)}
        loading="lazy"
      />
    </div>
  )
}

Image.ASPECT_RATIO = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  auto: '',
}

Image.OBJECT_FIT = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  scaleDown: 'object-scale-down',
}

Image.displayName = 'Card.Image'

export default Image
