'use client'

import { useState } from 'react'

const TelemetryIcon = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d={d} />
  </svg>
)

export default function TelemetryBar() {
  const [values] = useState({
    x: '+0.0',
    y: '+28.7',
    z: '-68.8',
    roll: '-40.2',
    pitch: '+18.0',
    yaw: '+92.4',
  })

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="tele-bar">
      <div className="tele-cell">
        <div className="tele-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        </div>
        <div>
          <p className="tele-label">EE X</p>
          <p className="tele-value">{values.x}</p>
        </div>
      </div>
      <div className="tele-cell">
        <div className="tele-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="12" x2="12" y2="22" />
            <line x1="5" y1="4" x2="12" y2="12" />
            <line x1="19" y1="4" x2="12" y2="12" />
          </svg>
        </div>
        <div>
          <p className="tele-label">EE Y</p>
          <p className="tele-value">{values.y}</p>
        </div>
      </div>
      <div className="tele-cell">
        <div className="tele-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        </div>
        <div>
          <p className="tele-label">EE Z</p>
          <p className="tele-value">{values.z}</p>
        </div>
      </div>
      <div className="tele-cell">
        <div className="tele-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <div>
          <p className="tele-label">ROLL</p>
          <p className="tele-value">{values.roll}</p>
        </div>
      </div>
      <div className="tele-cell">
        <div className="tele-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12 Q12 4 21 12" />
            <path d="M3 12 Q12 20 21 12" />
          </svg>
        </div>
        <div>
          <p className="tele-label">PITCH</p>
          <p className="tele-value">{values.pitch}</p>
        </div>
      </div>
      <div className="tele-cell">
        <div className="tele-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2 L12 12 L18 8" />
          </svg>
        </div>
        <div>
          <p className="tele-label">YAW</p>
          <p className="tele-value">{values.yaw}</p>
        </div>
      </div>
      <button className="tele-cta" onClick={() => scrollToSection('bio-news')}>
        <span>
          REAL-TIME
          <br />
          MONITORING
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  )
}
