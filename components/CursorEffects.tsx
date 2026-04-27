'use client'

import { useEffect } from 'react'

export default function CursorEffects() {
  useEffect(() => {
    const dot = document.getElementById('cursorDot')
    const ring = document.getElementById('cursorRing')

    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'

      setTimeout(() => {
        ring.style.left = mouseX + 'px'
        ring.style.top = mouseY + 'px'
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return null
}
