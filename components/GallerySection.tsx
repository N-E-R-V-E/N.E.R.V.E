'use client'

import { useReveal } from '@/hooks/useReveal'

const galleryItems = [
  { title: 'BIOOS Framework', id: 'bioos',    tag: 'FRAMEWORK'   },
  { title: 'NeuroSim Engine', id: 'neurosim', tag: 'SIMULATION'  },
  { title: 'FES Stimulation', id: 'fes',      tag: 'MODEL'       },
  { title: 'Digital Twin',    id: 'twin',     tag: 'DIGITAL TWIN'},
  { title: 'Motor Control',   id: 'motor',    tag: 'CONTROL'     },
  { title: 'Lab Setup',       id: 'lab',      tag: 'HARDWARE'    },
]

function GalleryPlaceholder({ title, tag }: { title: string; tag: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px' }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: '4px' }}>{tag}</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.1em' }}>{title}</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--border)', letterSpacing: '0.08em', marginTop: '6px' }}>ADD IMAGE TO public/gallery/</p>
      </div>
    </div>
  )
}

export default function GallerySection() {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={`gallery-section reveal${visible ? ' visible' : ''}`} id="gallery">
      <p className="sec-eyebrow">// 004 — GALLERY</p>
      <h2 className="sec-title">SHOWCASE</h2>
      <p className="sec-desc">Visual documentation of research systems, prototypes, and lab environment.</p>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <img
              src={`/gallery/${item.id}.png`}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const placeholder = target.nextElementSibling as HTMLElement
                if (placeholder) placeholder.style.display = 'flex'
              }}
            />
            <div style={{ display: 'none', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <GalleryPlaceholder title={item.title} tag={item.tag} />
            </div>
            <div className="gallery-item-label">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.14em', color: 'var(--accent)' }}>{item.tag}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--text)', marginTop: '2px' }}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
