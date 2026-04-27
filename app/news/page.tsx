'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

interface NewsItem {
  id: number
  title: string
  description: string
  content: string
  imageUrl?: string
  author?: string
  publishedAt: string
  featured?: boolean
}

const ITEMS_PER_PAGE = 6

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/news')
      const data = await response.json()
      // Sort by date, newest first
      data.sort((a: NewsItem, b: NewsItem) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      setNewsItems(data)
    } catch (error) {
      console.error('Error loading news:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (selectedArticle) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Navigation onDemoClick={() => {}} />
        <div className="content" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <button
            onClick={() => setSelectedArticle(null)}
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
            ← BACK TO NEWS
          </button>

          <article style={{ animation: 'fadeUp 0.6s ease' }}>
            <div style={{ marginBottom: '30px' }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: 'var(--text3)',
                marginBottom: '12px',
              }}>
                {new Date(selectedArticle.publishedAt).toLocaleDateString()} • {selectedArticle.author || 'N.E.R.V.E'}
              </p>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '700',
                lineHeight: '1.2',
                marginBottom: '20px',
                animation: 'textReveal 0.8s ease',
              }}>
                {selectedArticle.title}
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'var(--text2)',
                lineHeight: '1.6',
                animation: 'fadeUp 0.8s ease 0.1s both',
              }}>
                {selectedArticle.description}
              </p>
            </div>

            {selectedArticle.imageUrl && (
              <div style={{
                width: '100%',
                height: '400px',
                background: 'var(--bg2)',
                borderRadius: '8px',
                marginBottom: '40px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
              }}>
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}

            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--text2)',
              maxWidth: '800px',
            }}>
              {selectedArticle.content.split('\n').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '20px' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
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
            // 004 — LATEST RESEARCH
          </p>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: '1.2',
            animation: 'textReveal 0.8s ease',
          }}>
            NEWS & INSIGHTS
          </h1>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '16px', color: 'var(--text3)' }}>Loading articles...</p>
          </div>
        ) : newsItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '16px', color: 'var(--text3)' }}>
              No news articles yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}>
              {paginatedItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedArticle(item)}
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
                  {item.imageUrl && (
                    <div style={{
                      width: '100%',
                      height: '180px',
                      background: 'var(--bg2)',
                      overflow: 'hidden',
                    }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      color: 'var(--text3)',
                      marginBottom: '8px',
                    }}>
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </p>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      lineHeight: '1.4',
                      marginBottom: '12px',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text2)',
                      lineHeight: '1.5',
                      marginBottom: '16px',
                    }}>
                      {item.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--accent)',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                    }}>
                      READ MORE →
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                alignItems: 'center',
              }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    background: currentPage === 1 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    cursor: currentPage === 1 ? 'default' : 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    fontWeight: '700',
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  ← PREV
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: '8px 12px',
                      background: page === currentPage ? 'var(--accent)' : 'rgba(255, 255, 255, 0.04)',
                      border: page === currentPage ? 'none' : '1px solid var(--border)',
                      borderRadius: '4px',
                      color: page === currentPage ? 'var(--bg)' : 'var(--text)',
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      fontWeight: '700',
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    background: currentPage === totalPages ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    cursor: currentPage === totalPages ? 'default' : 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    fontWeight: '700',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  NEXT →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
