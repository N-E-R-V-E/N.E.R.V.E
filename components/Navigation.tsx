'use client'

import { useState } from 'react'

export default function Navigation({ onDemoClick }: { onDemoClick: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'RESEARCH', target: 'research' },
    { label: 'SYSTEMS', target: 'systems' },
    { label: 'INSIGHTS', target: 'insights' },
    { label: 'WORKSHOPS', target: 'workshops' },
    { label: 'FOUNDER', target: 'founder' },
    { label: 'GALLERY', target: 'gallery' },
    { label: 'DOWNLOADS', href: '/downloads' },
  ]

  const scrollToSection = (target?: string, href?: string) => {
    setMobileMenuOpen(false)
    if (href) {
      window.location.href = href
      return
    }
    if (target) {
      const element = document.getElementById(target)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="nav">
      <div
        className="nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        role="button"
      >
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
      </div>

      <ul className="nav-links">
        {navLinks.map((link) => (
          <li 
            key={link.label} 
            onClick={() => scrollToSection((link as any).target, (link as any).href)}
            style={{ cursor: 'pointer' }}
          >
            {link.label}
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button className="theme-btn" id="themeBtn" aria-label="Toggle theme">
          <svg
            id="themeIcon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
        <button className="btn btn-outline" onClick={onDemoClick}>
          DEMO
        </button>
        <button className="btn btn-solid" onClick={() => scrollToSection('contact')}>
          CONNECT
        </button>
      </div>

      <button 
        className="hamburger"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {mobileMenuOpen && (
        <div className="mobile-menu show">
          <ul>
            {navLinks.map((link) => (
              <li key={link.label} onClick={() => scrollToSection((link as any).target, (link as any).href)}>
                {link.label}
              </li>
            ))}
          </ul>
          <button className="btn btn-solid" style={{ width: '100%', margin: '8px 0 0 0' }} onClick={() => scrollToSection('contact')}>
            CONNECT
          </button>
        </div>
      )}
    </nav>
  )
}
