'use client'

import { useReveal } from '@/hooks/useReveal'

const cards = [
  { num: '01', title: 'BIOOS Framework',         body: 'Modular biological operating system for simulation. Integrates muscle models, neural networks, and biomechanical simulations into a unified runtime environment.', locked: false },
  { num: '02', title: 'NeuroSim Engine',          body: 'High-resolution simulation engine for muscles and neurons. Multi-scale from individual fibers to full tissue-level interaction with fatigue modeling.',          locked: false },
  { num: '03', title: 'Bio-Inspired IK',          body: 'Inverse kinematics using population coding and motor primitives — no matrix inversion, fully feedback-driven adaptation mimicking biological motor control.',   locked: false },
  { num: '04', title: 'FES Stimulation Model',    body: 'Functional Electrical Stimulation current distribution with threshold dynamics and fatigue — pre-publication phase.',                                            locked: true, badge: 'RESTRICTED'  },
  { num: '05', title: 'Digital Twins — FDI Muscle', body: 'High-resolution digital twin of FDI muscle capturing both electrical and mechanical behavior for realistic simulation.',                                     locked: true, badge: 'RESTRICTED'  },
  { num: '06', title: 'MyoSys Generator',         body: 'Parametric muscle model creation with precise control over geometry, fiber distribution, and motor unit composition.',                                          locked: true, badge: 'IN PROGRESS' },
]

export default function ResearchSection() {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`research-section reveal${visible ? ' visible' : ''}`} id="research">
      <p className="sec-eyebrow">// 001 — RESEARCH PROGRAMS</p>
      <h2 className="sec-title">RESEARCH</h2>
      <p className="sec-desc">Active experimental systems and biological simulation frameworks. Some programs are under NDA or pre-publication — visible to collaborators only.</p>
      <div className="research-grid">
        {cards.map((card) => (
          <div key={card.num} className={`research-card ${card.locked ? 'locked' : ''}`}>
            {card.locked && (
              <div className="lock-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {card.badge}
              </div>
            )}
            <p className="rc-num">{card.num}</p>
            <h3 className="rc-title">{card.title}</h3>
            <p className="rc-body">{card.body}</p>
            {!card.locked && (
              <div className="rc-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
