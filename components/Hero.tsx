'use client'

import { useState, useEffect } from 'react'

export default function Hero({ onDemoClick }: { onDemoClick: () => void }) {
  const [uptime, setUptime] = useState('00:00:00')
  const [heroImage, setHeroImage] = useState('/hero_light.png')

  useEffect(() => {
    // Update uptime
    const interval = setInterval(() => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setUptime(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    // Detect theme and update hero image
    const updateHeroImage = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      setHeroImage(isDark ? '/hero_dark.png' : '/hero_light.png')
    }

    updateHeroImage()

    // Listen for theme changes
    const observer = new MutationObserver(updateHeroImage)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addListener(updateHeroImage)

    return () => {
      clearInterval(interval)
      observer.disconnect()
      mediaQuery.removeListener(updateHeroImage)
    }
  }, [])

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="content">
      <div className="hero" id="hero">
        <div className="hero-left">
          <p className="hero-tag">BIOLOGICAL SIMULATION. INTELLIGENT ROBOTICS.</p>
          <h1 className="nerve-heading">N.E.R.V.E</h1>
          <h2 className="hero-subtitle">
            Building BIOOS — a biological
            <br />
            operating system for robotics.
          </h2>
          <p className="hero-body">
            A research-driven bio-robotics lab bridging biological intelligence
            and robotic systems through simulation-first engineering — muscles,
            neurons, and adaptive control.
          </p>
          <div className="hero-btns">
            <button
              className="btn-hero btn-hero-solid"
              onClick={() => scrollToSection('research')}
            >
              EXPLORE RESEARCH
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button className="btn-hero btn-hero-outline" onClick={onDemoClick}>
              RUN LIVE DEMO
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            src={heroImage}
            alt="N.E.R.V.E Robotic Arm"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="var(--bg2)" width="400" height="400"/%3E%3C/svg%3E'
            }}
          />
          <div className="hero-status">
            <div className="hero-status-cell">
              <p className="status-label">Gripper</p>
              <div className="status-value">
                <span id="gripperState">CLOSED</span>
              </div>
            </div>
            <div className="hero-status-cell">
              <p className="status-label">Status</p>
              <div className="status-value">
                <div className="green-dot" />
                <span>OPERATIONAL</span>
              </div>
            </div>
            <div className="hero-status-cell">
              <p className="status-label">Uptime</p>
              <div className="status-value">
                <span id="uptimeDisp">{uptime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
