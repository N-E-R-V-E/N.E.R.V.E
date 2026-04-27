'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import TelemetryBar from '@/components/TelemetryBar'
import DemoModal from '@/components/DemoModal'
import ResearchSection from '@/components/ResearchSection'
import { useReveal } from '@/hooks/useReveal'

// Lazy load heavy components
const GallerySection = dynamic(() => import('@/components/GallerySection'), {
  loading: () => <div style={{ height: '400px', borderTop: '1px solid var(--border)', marginTop: '80px' }} />,
})
const InsightsSection = dynamic(() => import('@/components/InsightsSection'), {
  loading: () => <div style={{ height: '400px', borderTop: '1px solid var(--border)', marginTop: '80px' }} />,
})
const WorkshopsSection = dynamic(() => import('@/components/WorkshopsSection'), {
  loading: () => <div style={{ height: '300px', borderTop: '1px solid var(--border)', marginTop: '80px' }} />,
})
const FounderSection = dynamic(() => import('@/components/FounderSection'), {
  loading: () => <div style={{ height: '300px', borderTop: '1px solid var(--border)', marginTop: '80px' }} />,
})
const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div style={{ height: '500px', borderTop: '1px solid var(--border)', marginTop: '80px' }} />,
})

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const { ref: systemsRef, visible: systemsVisible } = useReveal()

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navigation onDemoClick={() => setShowModal(true)} />
      <Hero onDemoClick={() => setShowModal(true)} />
      <div className="content">
        <TelemetryBar />
        <ResearchSection />

        <div ref={systemsRef} className={`systems-strip reveal${systemsVisible ? ' visible' : ''}`} id="systems">
          <div className="strip-card">
            <div className="strip-card-inner">
              <div>
                <p className="strip-eyebrow">// 002 — INTEGRATED SYSTEMS</p>
                <h2 className="strip-title">SYSTEMS</h2>
                <p className="strip-body">
                  Cohesive platforms combining biological modeling and robotics control. Each system
                  interacts to form a complete pipeline from model generation to real-time control.
                </p>
                <div className="strip-tags">
                  <span className="strip-tag">BIOOS</span>
                  <span className="strip-tag">NEUROSIM</span>
                  <span className="strip-tag">MYOSYS</span>
                  <span className="strip-tag">ROBOTIC ARM</span>
                </div>
              </div>
              <button className="strip-arrow-btn">
                EXPLORE ARCHITECTURE{' '}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
          <div className="strip-card dark-card" id="demo">
            <div className="strip-card-inner">
              <div>
                <p className="strip-eyebrow">// 003 — LIVE SIMULATION</p>
                <h2 className="strip-title">DEMO</h2>
                <p className="strip-body">
                  Browser-based robotic and biological simulation environment. Control a 6-DOF arm,
                  visualize joint states, and observe bio-inspired IK in real time.
                </p>
                <div className="strip-tags">
                  <span className="strip-tag">THREE.JS</span>
                  <span className="strip-tag">WEBGL</span>
                  <span className="strip-tag">URDF-FK</span>
                  <span className="strip-tag">CCD-IK</span>
                </div>
              </div>
              <button className="strip-arrow-btn" onClick={() => setShowModal(true)}>
                LAUNCH SIMULATION{' '}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <GallerySection />
        <InsightsSection />
        <FounderSection />
        <WorkshopsSection />
        <ContactSection />

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '22px 0',
          marginTop: '80px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.08em' }}>
            © 2025 N.E.R.V.E Bio Robotics Lab. All rights reserved.
          </p>
          <a
            href="/downloads"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'var(--text3)',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text3)')}
          >
            DOWNLOADS →
          </a>
        </div>
      </div>

      <DemoModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  )
}