'use client'

import { useState } from 'react'

type View = 'picker' | 'piper' | 'neurosim'

export default function DemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [view, setView] = useState<View>('picker')

  const handleClose = () => {
    setView('picker')
    onClose()
  }

  if (!isOpen) return null

  /* ── Full-screen iframe (PIPER AM) ── */
  if (view === 'piper') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          background: '#1a1a1a',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* thin header bar */}
        <div
          style={{
            height: '36px',
            flexShrink: 0,
            background: '#252525',
            borderBottom: '1px solid #3a3a3a',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '.1em',
              color: '#d4d4d4',
            }}
          >
            PIPER AM · SIMULATOR
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#5a5a5a',
              letterSpacing: '.06em',
            }}
          >
            6-DOF · CCD-IK · URDF-FK
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setView('picker')}
              style={{
                background: 'none',
                border: '1px solid #3a3a3a',
                borderRadius: '3px',
                padding: '3px 10px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '.08em',
                color: '#909090',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e8891a'; e.currentTarget.style.color = '#e8891a' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#3a3a3a'; e.currentTarget.style.color = '#909090' }}
            >
              ← BACK
            </button>
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: '1px solid #3a3a3a',
                borderRadius: '3px',
                padding: '3px 10px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '.08em',
                color: '#909090',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e53935'; e.currentTarget.style.color = '#e53935' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#3a3a3a'; e.currentTarget.style.color = '#909090' }}
            >
              ✕ CLOSE
            </button>
          </div>
        </div>

        {/* simulator fills the rest */}
        <iframe
          src="/piper_sim.html"
          title="PIPER AM Simulator"
          style={{ flex: 1, border: 'none', display: 'block', width: '100%' }}
          allowFullScreen
        />
      </div>
    )
  }

  /* ── Demo picker modal ── */
  return (
    <div
      className="modal-bg"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.7)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleClose}
    >
      <div
        className="modal"
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          width: 'min(480px, 92vw)',
          animation: 'fadeUp .3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '32px', letterSpacing: '.08em', color: 'var(--text)', marginBottom: '8px' }}>
          SELECT DEMO
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: 1.6, marginBottom: '20px' }}>
          Choose a simulation to launch.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {/* PIPER AM — opens inline iframe */}
          <button
            onClick={() => setView('piper')}
            className="demo-opt"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              borderRadius: '6px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'border-color .2s, background .2s',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--tag-bg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--bg3)'
            }}
          >
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', fontWeight: 700, color: 'var(--text)', letterSpacing: '.08em', marginBottom: '4px' }}>
              PIPER AM
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.4 }}>
              6-DOF robotic arm with CCD-IK solver, URDF FK, and real-time terminal control.
            </div>
          </button>

          {/* NEUROSIM — coming soon */}
          <button
            className="demo-opt"
            disabled
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              borderRadius: '6px',
              padding: '16px',
              cursor: 'not-allowed',
              textAlign: 'left',
              opacity: 0.5,
            }}
          >
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', fontWeight: 700, color: 'var(--text)', letterSpacing: '.08em', marginBottom: '4px' }}>
              NEUROSIM
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.4 }}>
              Muscle fiber & motor unit simulation with FES modeling. — Coming soon
            </div>
          </button>
        </div>

        <button
          onClick={handleClose}
          className="modal-close"
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            padding: '6px 14px',
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            color: 'var(--text3)',
            cursor: 'pointer',
            transition: 'border-color .2s, color .2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--text)'
            e.currentTarget.style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text3)'
          }}
        >
          CLOSE
        </button>
      </div>
    </div>
  )
}