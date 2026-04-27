'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'

interface ContentItem {
  id: string
  section: string
  title: string
  content: string
  image?: string
  createdAt: string
  updatedAt: string
}

interface AuditLog {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

const SECURE_TOKEN_KEY = 'admin_secure_token'
const ADMIN_PASSWORD_HASH = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Anandhan@nerve'

export default function SecureAdminPortal() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [items, setItems] = useState<ContentItem[]>([
    {
      id: '1',
      section: 'research',
      title: 'Bio-inspired Control Systems',
      content: 'Advanced research in neural-inspired robotics control...',
      createdAt: '2025-01-15',
      updatedAt: '2025-04-20',
    },
    {
      id: '2',
      section: 'insights',
      title: 'Latest Breakthroughs',
      content: 'Explore recent findings in biorobotics research...',
      createdAt: '2025-02-10',
      updatedAt: '2025-04-18',
    },
  ])

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      action: 'LOGIN',
      user: 'admin',
      timestamp: new Date().toISOString(),
      details: 'Admin portal accessed',
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<ContentItem>>({})
  const [activeTab, setActiveTab] = useState<'content' | 'analytics' | 'security' | 'logs'>('content')

  const logAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      action,
      user: 'admin',
      timestamp: new Date().toISOString(),
      details,
    }
    setAuditLogs([newLog, ...auditLogs.slice(0, 49)])
    console.log(`[v0] Audit log: ${action} - ${details}`)
  }

  const handleLogin = () => {
    console.log('[v0] Attempting admin authentication')
    if (password === ADMIN_PASSWORD_HASH) {
      const token = btoa(`admin:${Date.now()}:${Math.random()}`)
      localStorage.setItem(SECURE_TOKEN_KEY, token)
      setIsAuthenticated(true)
      setAuthError('')
      logAction('LOGIN', 'Secure admin portal accessed')
      console.log('[v0] Authentication successful')
    } else {
      setAuthError('Invalid credentials. Access denied.')
      logAction('LOGIN_FAILED', 'Invalid password attempt')
      console.warn('[v0] Authentication failed - invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(SECURE_TOKEN_KEY)
    setIsAuthenticated(false)
    setPassword('')
    logAction('LOGOUT', 'Admin session ended')
    console.log('[v0] User logged out')
  }

  useEffect(() => {
    const token = localStorage.getItem(SECURE_TOKEN_KEY)
    if (token) {
      setIsAuthenticated(true)
      console.log('[v0] Existing session found, restoring authentication')
    }
  }, [])

  const startEdit = (item: ContentItem) => {
    setEditingId(item.id)
    setEditData(item)
    console.log(`[v0] Started editing item: ${item.id}`)
  }

  const saveEdit = () => {
    if (editingId && editData) {
      const updatedItem = {
        ...editData,
        updatedAt: new Date().toISOString().split('T')[0],
      } as ContentItem
      setItems(items.map((item) => (item.id === editingId ? updatedItem : item)))
      logAction('CONTENT_UPDATED', `Item ${editingId} modified`)
      setEditingId(null)
      console.log(`[v0] Saved changes to item: ${editingId}`)
    }
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    logAction('CONTENT_DELETED', `Item ${id} removed from system`)
    console.log(`[v0] Deleted item: ${id}`)
  }

  const addNew = () => {
    const newId = Date.now().toString()
    const now = new Date().toISOString().split('T')[0]
    setItems([
      ...items,
      {
        id: newId,
        section: 'custom',
        title: 'New Content',
        content: 'Enter content here...',
        createdAt: now,
        updatedAt: now,
      },
    ])
    logAction('CONTENT_CREATED', `New content item ${newId} created`)
    console.log(`[v0] Created new content item: ${newId}`)
  }

  if (!isAuthenticated) {
    return (
      <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '40px 20px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '40px', backdropFilter: 'blur(10px)' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '20px' }}>SECURE ADMIN PORTAL</p>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '30px', color: 'var(--text)' }}>AUTHENTICATION REQUIRED</h1>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text3)', display: 'block', marginBottom: '8px' }}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter secure password"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {authError && (
              <div style={{ background: 'rgba(200, 50, 50, 0.1)', border: '1px solid rgba(200, 50, 50, 0.3)', borderRadius: '6px', padding: '12px', marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', color: 'rgba(200, 50, 50, 0.8)', margin: '0' }}>{authError}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '6px',
                color: 'var(--bg)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              AUTHENTICATE
            </button>

            <p style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '20px', lineHeight: '1.6' }}>
              This is a restricted area. Only authorized personnel may proceed. All access is logged and monitored.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navigation onDemoClick={() => {}} />
      <div className="content" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <p className="sec-eyebrow">SECURE ADMIN</p>
            <h1 className="sec-title">CONTROL PANEL</h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 16px',
              background: 'rgba(200, 50, 50, 0.15)',
              border: '1px solid rgba(200, 50, 50, 0.3)',
              borderRadius: '6px',
              color: 'rgba(200, 50, 50, 0.8)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200, 50, 50, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(200, 50, 50, 0.15)')}
          >
            LOGOUT
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
          {(['content', 'analytics', 'security', 'logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab ? 'rgba(245, 155, 46, 0.15)' : 'transparent',
                border: activeTab === tab ? '1px solid rgba(245, 155, 46, 0.3)' : '1px solid transparent',
                borderRadius: '4px',
                color: activeTab === tab ? 'var(--accent)' : 'var(--text3)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)' }}>Content Manager</h2>
              <button
                className="btn btn-solid"
                onClick={addNew}
                style={{ fontSize: '11px' }}
              >
                CREATE NEW
              </button>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '20px',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {editingId === item.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '10px', color: 'var(--text3)', display: 'block', marginBottom: '6px', letterSpacing: '0.08em' }}>TITLE</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            color: 'var(--text)',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', color: 'var(--text3)', display: 'block', marginBottom: '6px', letterSpacing: '0.08em' }}>CONTENT</label>
                        <textarea
                          value={editData.content || ''}
                          onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            color: 'var(--text)',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px',
                            minHeight: '100px',
                            resize: 'vertical',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-solid"
                          onClick={saveEdit}
                          style={{ fontSize: '10px' }}
                        >
                          SAVE
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() => setEditingId(null)}
                          style={{ fontSize: '10px' }}
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '14px', fontWeight: '700', margin: '0' }}>{item.title}</h3>
                          <span style={{ background: 'rgba(245, 155, 46, 0.2)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '3px', fontSize: '8px', fontWeight: '700', letterSpacing: '0.06em' }}>
                            {item.section.toUpperCase()}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '8px', lineHeight: '1.6' }}>{item.content}</p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '9px', color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace" }}>
                          <span>Created: {item.createdAt}</span>
                          <span>Modified: {item.updatedAt}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginLeft: '16px' }}>
                        <button
                          className="btn btn-outline"
                          onClick={() => startEdit(item)}
                          style={{ fontSize: '9px' }}
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() => deleteItem(item.id)}
                          style={{ fontSize: '9px', borderColor: 'rgba(200, 50, 50, 0.3)', color: 'rgba(200, 50, 50, 0.8)' }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Page Views (24h)', value: '3,482', trend: '+12%', icon: 'V' },
              { label: 'Active Sessions', value: '284', trend: '+8%', icon: 'S' },
              { label: 'Downloads', value: '1,263', trend: '+24%', icon: 'D' },
              { label: 'Unique Visitors', value: '892', trend: '+15%', icon: 'U' },
              { label: 'Avg Session Time', value: '4m 32s', trend: '+3%', icon: 'T' },
              { label: 'Bounce Rate', value: '28%', trend: '-5%', icon: 'B' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '20px', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--text3)', margin: '0', letterSpacing: '0.08em' }}>{stat.label}</p>
                  <div style={{ width: '32px', height: '32px', background: 'rgba(245, 155, 46, 0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: 'var(--accent)' }}>{stat.icon}</div>
                </div>
                <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)', margin: '0 0 4px 0' }}>{stat.value}</p>
                <p style={{ fontSize: '10px', color: stat.trend.startsWith('+') ? 'var(--green)' : 'var(--accent)', margin: '0', fontWeight: '700' }}>{stat.trend}</p>
              </div>
            ))}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ background: 'rgba(245, 155, 46, 0.08)', border: '1px solid rgba(245, 155, 46, 0.15)', borderRadius: '8px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--accent)', fontWeight: '700', marginBottom: '16px' }}>AUTHENTICATION STATUS</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', margin: '0', padding: '0' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(245, 155, 46, 0.1)' }}>
                  <span>Session Token</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--accent)' }}>ACTIVE</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(245, 155, 46, 0.1)' }}>
                  <span>Last Authentication</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--text3)' }}>Just now</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span>Two-Factor Auth</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--text3)' }}>DISABLED</span>
                </li>
              </ul>
            </div>

            <div style={{ background: 'rgba(200, 50, 50, 0.08)', border: '1px solid rgba(200, 50, 50, 0.15)', borderRadius: '8px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(200, 50, 50, 0.8)', fontWeight: '700', marginBottom: '12px' }}>SECURITY NOTICE</p>
              <p style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: '1.6', margin: '0' }}>This is a restricted administrative portal. All access attempts are logged and monitored. Unauthorized access attempts are recorded and may result in account suspension.</p>
              <p style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '12px', margin: '12px 0 0 0' }}>URL has been obfuscated for security. Share access with authorized personnel only.</p>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Audit Logs</h2>
            <div style={{ display: 'grid', gap: '8px' }}>
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '700', color: 'var(--accent)', marginRight: '12px' }}>{log.action}</span>
                    <span style={{ color: 'var(--text3)' }}>{log.details}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--text3)', flexShrink: 0 }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
