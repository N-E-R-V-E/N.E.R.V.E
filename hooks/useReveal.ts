'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — SSR-safe scroll reveal hook.
 *
 * Returns a ref to attach to your element and a boolean `visible`.
 * On the server, `visible` is always false — no className is added.
 * On the client, after mount, an IntersectionObserver fires and sets
 * `visible` to true when the element enters the viewport.
 *
 * This eliminates the SSR/hydration mismatch caused by manipulating
 * classList from page.tsx after dynamic components mount.
 *
 * Usage:
 *   const { ref, visible } = useReveal()
 *   <div ref={ref} className={`my-section reveal${visible ? ' visible' : ''}`}>
 */
export function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  // Start false — matches what SSR renders
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already in viewport on mount (above fold), make visible immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
