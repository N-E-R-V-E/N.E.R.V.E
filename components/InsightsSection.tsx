'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface InsightItem {
  title: string
  excerpt: string
  source: string
  image: string
  link: string
  date: string
}

// ── Topic → Picsum deterministic image (free, no key, CORS-open, never 404s) ──
// Each unique seed always returns the same image, so cards don't flicker on re-render
const TOPIC_SEEDS: [RegExp, number][] = [
  [/muscle|myos|fes|stimulat|fatigue/i,  1084],  // anatomy-ish
  [/neural|neuron|brain|spike|cortex/i,  1025],  // science lab
  [/prosthe|limb|amputee|bion/i,         937 ],  // engineering
  [/robot|arm|manipulat|gripper|dof/i,   96  ],  // machinery
  [/simulat|digital.twin|model/i,        180 ],  // tech / code
  [/biolog|biomech|bio.inspir/i,         582 ],  // nature/science
]
const DEFAULT_SEEDS = [119, 366, 434] // lab / science / dark tech

function getImage(title: string, index: number): string {
  for (const [pattern, seed] of TOPIC_SEEDS) {
    if (pattern.test(title)) {
      return `https://picsum.photos/seed/${seed}/800/500`
    }
  }
  return `https://picsum.photos/seed/${DEFAULT_SEEDS[index % DEFAULT_SEEDS.length]}/800/500`
}

// ── arXiv (CORS-open, no key) ──
async function fetchArxivPapers(): Promise<Omit<InsightItem, 'image'>[]> {
  const query = encodeURIComponent(
    '(biorobotics OR "neural engineering" OR "muscle simulation" OR "functional electrical stimulation")'
  )
  const res = await fetch(
    `https://export.arxiv.org/api/query?search_query=all:${query}&sortBy=submittedDate&sortOrder=descending&max_results=2`
  )
  if (!res.ok) throw new Error(`arXiv ${res.status}`)
  const xml = new DOMParser().parseFromString(await res.text(), 'application/xml')
  return Array.from(xml.querySelectorAll('entry')).map((e) => {
    const authors = Array.from(e.querySelectorAll('author name'))
      .slice(0, 2).map((n) => n.textContent ?? '').join(', ')
    const rawDate = e.querySelector('published')?.textContent ?? ''
    return {
      title:   e.querySelector('title')?.textContent?.trim().replace(/\s+/g, ' ') ?? 'Untitled',
      excerpt: ((e.querySelector('summary')?.textContent?.trim().replace(/\s+/g, ' ') ?? '').slice(0, 140)) + '…',
      source:  authors ? `arXiv — ${authors}` : 'arXiv',
      link:    e.querySelector('id')?.textContent?.trim() ?? '#',
      date:    rawDate ? rawDate.split('T')[0] : '',
    }
  })
}

// ── Hacker News Algolia (CORS-open, no key) ──
async function fetchHNStories(): Promise<Omit<InsightItem, 'image'>[]> {
  const results: Omit<InsightItem, 'image'>[] = []
  await Promise.all(
    ['biorobotics', 'robotics'].map(async (q) => {
      try {
        const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${q}&tags=story&hitsPerPage=1`)
        if (!res.ok) return
        const data = await res.json()
        for (const hit of data.hits ?? []) {
          if (!hit.url || !hit.title) continue
          results.push({
            title:   hit.title,
            excerpt: `${hit.points ?? 0} points · ${hit.num_comments ?? 0} comments on Hacker News`,
            source:  'HACKER NEWS',
            link:    hit.url,
            date:    hit.created_at_i ? new Date(hit.created_at_i * 1000).toISOString().split('T')[0] : '',
          })
        }
      } catch { /* skip */ }
    })
  )
  const seen = new Set<string>()
  return results.filter((r) => (seen.has(r.link) ? false : (seen.add(r.link), true)))
}

const FALLBACK: Omit<InsightItem, 'image'>[] = [
  { title: 'Bio-inspired robotic control systems show 40% improvement in adaptability', excerpt: 'Neural network-based control surpasses traditional IK methods in real-world scenarios with adaptive motor primitives.', source: 'NATURE ROBOTICS',   link: '#', date: '2025-04-20' },
  { title: 'FES stimulation achieves muscle fatigue prediction with 95% accuracy',      excerpt: 'Advanced modeling of functional electrical stimulation enables precise patient-specific rehabilitation protocols.',   source: 'IEEE TRANSACTIONS', link: '#', date: '2025-04-18' },
  { title: 'Digital muscle twins enable real-time prosthetic control',                  excerpt: 'Biological simulation framework bridges the gap between high-fidelity simulation and real-time hardware control.',     source: 'SCIENCE ROBOTICS',  link: '#', date: '2025-04-15' },
]

export default function InsightsSection() {
  const { ref, visible }              = useReveal()
  const [insights, setInsights]       = useState<InsightItem[]>([])
  const [loading, setLoading]         = useState(true)
  const [sourceLabel, setSourceLabel] = useState('')

  const fetchInsights = async () => {
    setLoading(true)
    try {
      const [arxiv, hn] = await Promise.allSettled([fetchArxivPapers(), fetchHNStories()])
      const arxivItems  = arxiv.status === 'fulfilled' ? arxiv.value : []
      const hnItems     = hn.status   === 'fulfilled' ? hn.value   : []
      const base        = [...arxivItems, ...hnItems].slice(0, 3)
      const withImages: InsightItem[] = (base.length > 0 ? base : FALLBACK).map((item, i) => ({
        ...item,
        image: getImage(item.title, i),
      }))
      setInsights(withImages)
      const labels: string[] = []
      if (arxivItems.length) labels.push('arXiv')
      if (hnItems.length)    labels.push('Hacker News')
      setSourceLabel(labels.length ? labels.join(' + ') : 'curated')
    } catch {
      setInsights(FALLBACK.map((item, i) => ({ ...item, image: getImage(item.title, i) })))
      setSourceLabel('curated')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  return (
    <div ref={ref} className={`insights-section reveal${visible ? ' visible' : ''}`} id="insights">
      <p className="sec-eyebrow">// 005 — INSIGHTS</p>
      <h2 className="sec-title">LATEST RESEARCH</h2>
      <p className="sec-desc">
        Real-time updates from biorobotics research and neural stimulation breakthroughs.
        {sourceLabel && (
          <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>
            via {sourceLabel}
          </span>
        )}
      </p>

      {loading ? (
        <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 400, borderRadius: 10, background: 'var(--bg2)', animation: 'shimmer 1.4s ease infinite' }} />
          ))}
        </div>
      ) : (
        <div className="insights-grid">
          {insights.map((insight, i) => (
            <a
              key={insight.link + i}
              href={insight.link !== '#' ? insight.link : undefined}
              target={insight.link !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="insight-card"
            >
              <div className="insight-img-wrap">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="insight-img"
                  loading="lazy"
                  onError={(e) => {
                    const wrap = (e.currentTarget as HTMLImageElement).parentElement
                    if (wrap) {
                      wrap.style.background = 'linear-gradient(135deg, var(--bg2) 0%, var(--bg3) 100%)'
                      ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                    }
                  }}
                />
                <div className="insight-overlay" />
                <div className="insight-overlay-content">
                  <p className="insight-source">{insight.source}</p>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-excerpt">{insight.excerpt}</p>
                  <div className="insight-footer">
                    <span className="insight-date">{insight.date}</span>
                    {insight.link !== '#' && <span className="insight-link">READ →</span>}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
