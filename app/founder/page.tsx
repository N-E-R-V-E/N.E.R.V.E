'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

interface Founder {
  id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  expertise: string[]
  socialLinks?: Record<string, string>
}

export default function FoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFounders()
  }, [])

  const loadFounders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/founders')
      const data = await response.json()
      setFounders(data)
    } catch (error) {
      console.error('Error loading founders:', error)
    } finally {
      setLoading(false)
    }
  }

  const parseExpertise = (expertise: string | string[]): string[] => {
    if (Array.isArray(expertise)) return expertise
    try {
      return JSON.parse(expertise)
    } catch {
      return []
    }
  }

  const parseSocialLinks = (socialLinks: string | Record<string, string>): Record<string, string> => {
    if (typeof socialLinks === 'object') return socialLinks
    try {
      return JSON.parse(socialLinks)
    } catch {
      return {}
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={20} />
      case 'linkedin':
        return <Linkedin size={20} />
      case 'twitter':
        return <Twitter size={20} />
      case 'email':
        return <Mail size={20} />
      default:
        return null
    }
  }

  if (selectedFounder) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Navigation onDemoClick={() => {}} />
        <div className="content" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <button
            onClick={() => setSelectedFounder(null)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '40px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.08em',
            }}
          >
            ← BACK TO FOUNDERS
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            {selectedFounder.imageUrl && (
              <div style={{
                width: '100%',
                aspectRatio: '1',
                background: 'var(--bg2)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
              }}>
                <img
                  src={selectedFounder.imageUrl}
                  alt={selectedFounder.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}

            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: 'var(--accent)',
                marginBottom: '12px',
              }}>
                FOUNDER
              </p>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '700',
                lineHeight: '1.2',
                marginBottom: '8px',
                animation: 'textReveal 0.8s ease',
              }}>
                {selectedFounder.name}
              </h1>
              <p style={{
                fontSize: '20px',
                color: 'var(--text2)',
                marginBottom: '30px',
              }}>
                {selectedFounder.role}
              </p>

              <div style={{ marginBottom: '30px' }}>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: 'var(--text2)',
                  marginBottom: '20px',
                }}>
                  {selectedFounder.bio}
                </p>
              </div>

              {parseExpertise(selectedFounder.expertise).length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: 'var(--text3)',
                    marginBottom: '12px',
                  }}>
                    EXPERTISE
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {parseExpertise(selectedFounder.expertise).map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'var(--tag-bg)',
                          color: 'var(--accent)',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {Object.keys(parseSocialLinks(selectedFounder.socialLinks)).length > 0 && (
                <div>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: 'var(--text3)',
                    marginBottom: '12px',
                  }}>
                    CONNECT
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {Object.entries(parseSocialLinks(selectedFounder.socialLinks)).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          color: 'var(--text)',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accent)'
                          e.currentTarget.style.color = 'var(--bg)'
                          e.currentTarget.style.borderColor = 'var(--accent)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                          e.currentTarget.style.color = 'var(--text)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navigation onDemoClick={() => {}} />
      <div className="content" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'var(--accent)',
            marginBottom: '12px',
          }}>
            // 005 — LEADERSHIP
          </p>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: '1.2',
            animation: 'textReveal 0.8s ease',
          }}>
            FOUNDERS & TEAM
          </h1>
        </div>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
          }}>
            <p style={{ fontSize: '16px', color: 'var(--text3)' }}>Loading founders...</p>
          </div>
        ) : founders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '16px', color: 'var(--text3)' }}>
              Founder profiles coming soon.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {founders.map((founder, idx) => (
              <div
                key={founder.id}
                onClick={() => setSelectedFounder(founder)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  animation: `fadeUp 0.6s ease ${idx * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {founder.imageUrl && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'var(--bg2)',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={founder.imageUrl}
                      alt={founder.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '4px',
                  }}>
                    {founder.name}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--accent)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: '700',
                    letterSpacing: '0.06em',
                    marginBottom: '12px',
                  }}>
                    {founder.role}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text2)',
                    lineHeight: '1.5',
                    marginBottom: '16px',
                  }}>
                    {founder.bio.substring(0, 100)}...
                  </p>
                  {parseExpertise(founder.expertise).length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {parseExpertise(founder.expertise).slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--tag-bg)',
                            color: 'var(--accent)',
                            padding: '4px 8px',
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: '700',
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
