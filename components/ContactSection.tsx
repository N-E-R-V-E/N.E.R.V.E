'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

export default function ContactSection() {
  const { ref, visible } = useReveal()
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Research Collaboration', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const toast = document.getElementById('toast')
    if (toast) {
      toast.textContent = 'Message received! We will respond within 48 hours.'
      toast.classList.add('show')
      setTimeout(() => toast.classList.remove('show'), 3000)
    }
    setFormData({ name: '', email: '', subject: 'Research Collaboration', message: '' })
  }

  return (
    <div ref={ref} className={`contact-section reveal${visible ? ' visible' : ''}`} id="contact">
      <p className="sec-eyebrow">// 009 — CONTACT</p>
      <h2 className="sec-title">CONTACT</h2>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">NAME</label>
            <input type="text" className="form-input" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">EMAIL</label>
            <input type="email" className="form-input" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">SUBJECT</label>
            <select className="form-select" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
              <option>Research Collaboration</option>
              <option>Workshop Booking</option>
              <option>Web / App Development</option>
              <option>Embedded Systems Project</option>
              <option>General Inquiry</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">MESSAGE</label>
            <textarea className="form-textarea" placeholder="Describe your project or inquiry…" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
          </div>
          <button type="submit" className="submit-btn">
            SEND MESSAGE{' '}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </form>

        <div className="contact-info">
          <div style={{ marginBottom: '8px' }}>
            <p className="sec-eyebrow" style={{ marginBottom: '8px' }}>GET IN TOUCH</p>
            <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7 }}>Open to research collaborations, workshops, and selective development engagements. Based in India — working globally.</p>
          </div>
          {[
            { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, label: 'EMAIL',         val: 'hello@nerve-lab.dev'  },
            { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,                                                    label: 'LOCATION',      val: 'India — Remote-First' },
            { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,                                                                         label: 'RESPONSE TIME', val: 'Within 48 hours'      },
          ].map(({ icon, label, val }) => (
            <div key={label} className="contact-item">
              <div className="contact-item-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg></div>
              <div><p className="contact-item-label">{label}</p><p className="contact-item-val">{val}</p></div>
            </div>
          ))}
          <div>
            <p className="contact-item-label" style={{ marginBottom: '10px' }}>FIND US ONLINE</p>
            <div className="social-links">
              {[
                { title: 'GitHub',     d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', fill: false },
                { title: 'Twitter/X', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', fill: true },
                { title: 'LinkedIn',  d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', fill: false },
                { title: 'YouTube',   d: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02 15.5 12 9.75 8.98 9.75 15.02', fill: false },
              ].map(({ title, d, fill }) => (
                <a key={title} className="social-link" href="#" title={title}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="1.8">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
