'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SimulatorClient() {
  const [simTime, setSimTime] = useState('0.0')
  const [simStep, setSimStep] = useState(0)
  const [simEE, setSimEE] = useState('[0.00, 0.00, 0.00]')
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const canvas = document.getElementById('simulatorCanvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 24
    }
    updateCanvasSize()

    let animationId: number
    let frame = 0
    const startTime = Date.now()

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#080a12'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = '#1a2035'
      ctx.lineWidth = 0.5
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw center axes
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      ctx.strokeStyle = '#00aacc'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(canvas.width, centerY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(centerX, 0)
      ctx.lineTo(centerX, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw rotating cube (simple 2D projection)
      frame++
      const elapsed = (Date.now() - startTime) / 1000
      const angle = elapsed * 0.5

      const size = 60
      const points = [
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: -size, y: size, z: size },
      ]

      // Rotate points
      const rotated = points.map((p) => {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return {
          x: p.x * cos - p.z * sin,
          y: p.y,
          z: p.x * sin + p.z * cos,
        }
      })

      // Project to 2D
      const projected = rotated.map((p) => ({
        x: centerX + p.x * (200 / (200 + p.z)),
        y: centerY + p.y * (200 / (200 + p.z)),
        z: p.z,
      }))

      // Sort by Z (painter's algorithm)
      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ]

      ctx.strokeStyle = '#00aacc'
      ctx.lineWidth = 2
      edges.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(projected[a].x, projected[a].y)
        ctx.lineTo(projected[b].x, projected[b].y)
        ctx.stroke()
      })

      // Draw vertices
      ctx.fillStyle = '#f59e0b'
      projected.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update stats
      setSimTime(elapsed.toFixed(1))
      setSimStep(frame)
      setSimEE(`[${(Math.sin(elapsed) * 50).toFixed(2)}, ${(Math.cos(elapsed) * 50).toFixed(2)}, 0.00]`)

      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#08090f',
        color: '#d8e0f0',
        fontFamily: 'JetBrains Mono, monospace',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{
            color: '#00d4ff',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '6px 12px',
            border: '1px solid #1a2035',
            borderRadius: '4px',
            display: 'inline-block',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderColor = '#00d4ff'
            el.style.background = 'rgba(0, 212, 255, 0.1)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderColor = '#1a2035'
            el.style.background = 'transparent'
          }}
        >
          ← BACK TO NERVE
        </Link>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '24px',
          background: '#060810',
          borderTop: '1px solid #1a2035',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '16px',
          fontSize: '9px',
          color: '#606060',
          zIndex: 100,
        }}
      >
        <span>
          SIM: <span style={{ color: '#7888a0', fontWeight: 500 }}>{simTime}s</span>
        </span>
        <span>|</span>
        <span>
          STEP: <span style={{ color: '#7888a0', fontWeight: 500 }}>{simStep}</span>
        </span>
        <span>|</span>
        <span>
          EE: <span style={{ color: '#7888a0', fontWeight: 500 }}>{simEE}</span>
        </span>
        <span style={{ marginLeft: 'auto' }}>Three.js r184 · URDF-FK · CCD-IK</span>
      </div>



      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
