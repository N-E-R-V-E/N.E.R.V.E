'use client'

import { useReveal } from '@/hooks/useReveal'

export default function WorkshopsSection() {
  const { ref, visible } = useReveal()
  const workshops = [
    { name: 'ESP32 & IoT Systems',           meta: 'EMBEDDED SYSTEMS · 3 HRS',     badge: 'OPEN', open: true  },
    { name: 'Robotics Fundamentals',          meta: 'CONTROL THEORY · 4 HRS',       badge: 'OPEN', open: true  },
    { name: 'Bio-Simulation Concepts',        meta: 'NEUROSCIENCE + CODE · 5 HRS',  badge: 'SOON', open: false },
    { name: 'Advanced Embedded Programming',  meta: 'REAL-TIME SYSTEMS · 6 HRS',    badge: 'SOON', open: false },
  ]

  return (
    <div ref={ref} className={`workshops-section reveal${visible ? ' visible' : ''}`} id="workshops">
      <div className="workshops-layout">
        <div>
          <p className="sec-eyebrow">// 006 — WORKSHOPS & TALKS</p>
          <h2 className="sec-title">WORK<br />SHOPS</h2>
          <p className="sec-desc">Hands-on sessions on robotics, embedded systems, and biological simulation. Bridging theory and implementation.</p>
          <button className="btn-hero btn-hero-solid" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '.12em' }}>
            BOOK A SESSION{' '}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
        <div className="workshop-list">
          {workshops.map((w, i) => (
            <div key={i} className="workshop-item">
              <div>
                <p className="workshop-name">{w.name}</p>
                <p className="workshop-meta">{w.meta}</p>
              </div>
              <span className={`workshop-badge ${w.open ? 'open' : ''}`}>{w.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
