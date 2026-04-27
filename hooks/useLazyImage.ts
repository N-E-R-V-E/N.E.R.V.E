import { useEffect, useRef, useState } from 'react'

export function useLazyImage() {
  const [imagesToLoad, setImagesToLoad] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create intersection observer for lazy loading images
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.dataset.src = ''
              observerRef.current?.unobserve(img)
            }
          }
        })
      },
      { rootMargin: '50px' }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const observeImage = (element: HTMLImageElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }

  return { observeImage }
}
