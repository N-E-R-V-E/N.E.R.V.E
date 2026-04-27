'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const downloads = [
  {
    name: 'BIOOS Framework v1.0',
    desc: 'Complete biological operating system source code and documentation.',
    meta: '2.4 MB · ZIP',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: 'NeuroSim Engine',
    desc: 'High-resolution muscle and neural simulation library with Python bindings.',
    meta: '1.8 MB · TAR.GZ',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    name: 'FES Stimulation Model',
    desc: 'Functional electrical stimulation software with parametric control.',
    meta: '890 KB · ZIP',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: 'Digital Twin Template',
    desc: 'Parametric muscle model generator for creating custom digital twins.',
    meta: '1.2 MB · TAR.GZ',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'CCD-IK Solver',
    desc: 'Cyclic coordinate descent inverse kinematics implementation.',
    meta: '450 KB · ZIP',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'Research Documentation',
    desc: 'Complete technical papers, architecture guides, and API reference.',
    meta: '3.1 MB · PDF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
]

function showToast(msg: string) {
  const toast = document.getElementById('toast')
  if (toast) {
    toast.textContent = msg
    toast.classList.add('show')
    setTimeout(() => toast.classList.remove('show'), 2500)
  }
}

export default function DownloadsPage() {
  useEffect(() => {
    // reveal animation on mount
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible')
      })
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <svg width="26" height="24" viewBox="0 0 30 28" fill="none">
            <path
              d="M2 26 L2 2 L15 18 L28 2 L28 26"
              stroke="var(--text)"
              strokeWidth="2.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
            />
          </svg>
          <div>
            <div className="nav-logo-name">NERVE</div>
            <div className="nav-logo-sub">BIO ROBOTICS LAB</div>
          </div>
        </Link>

        <ul
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            listStyle: 'none',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <li>
            <Link
              href="/"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: 'var(--text2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)')}
            >
              HOME
            </Link>
          </li>
          <li>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: 'var(--accent)',
                fontWeight: 700,
              }}
            >
              DOWNLOADS
            </span>
          </li>
          <li>
            <Link
              href="/#founder"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: 'var(--text2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)')}
            >
              FOUNDER
            </Link>
          </li>
          <li>
            <Link
              href="/#research"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: 'var(--text2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)')}
            >
              RESEARCH
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <Link href="/" className="back-btn" style={{ textDecoration: 'none' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            BACK TO HOME
          </Link>
        </div>
      </nav>

      <div className="content">
        {/* HEADER */}
        <div className="reveal" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <p className="sec-eyebrow">// DOWNLOADS</p>
          <h1 className="sec-title">RESOURCES</h1>
          <p className="sec-desc">
            Access all N.E.R.V.E software, frameworks, and technical documentation for research and
            development.
          </p>

          {/* DOWNLOAD GRID */}
          <div className="downloads-grid">
            {downloads.map((item) => (
              <div key={item.name} className="download-card">
                <div className="download-icon">{item.icon}</div>
                <h3 className="download-name">{item.name}</h3>
                <p className="download-desc">{item.desc}</p>
                <p className="download-meta">{item.meta}</p>
                <button
                  className="download-btn"
                  onClick={() => showToast(`Downloading ${item.name}…`)}
                >
                  DOWNLOAD
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '22px 0',
            marginTop: '40px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'var(--text3)',
              letterSpacing: '0.08em',
            }}
          >
            © 2025 N.E.R.V.E Bio Robotics Lab. All resources are provided under research license.
          </p>
          <Link href="/" className="back-btn" style={{ textDecoration: 'none' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            BACK TO HOME
          </Link>
        </div>
      </div>
    </main>
  )
}
