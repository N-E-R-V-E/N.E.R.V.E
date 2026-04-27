'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Edit2, Save, X, Eye, EyeOff, LogOut } from 'lucide-react'

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

interface Founder {
  id: number
  name: string
  role: string
  bio: string
  imageUrl?: string
  expertise: string
  socialLinks: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'news' | 'founders' | 'settings'>('news')
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  // News state
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [newNewsItem, setNewNewsItem] = useState<Partial<NewsItem>>({})
  const [loadingNews, setLoadingNews] = useState(false)

  // Founders state
  const [founders, setFounders] = useState<Founder[]>([])
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null)
  const [newFounder, setNewFounder] = useState<Partial<Founder>>({})
  const [loadingFounders, setLoadingFounders] = useState(false)

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
      loadNews()
      loadFounders()
    }
  }, [])

  // Authentication
  const handleAuth = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isRegistering ? 'register' : 'login',
          email,
          password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setAuthError(data.error || 'Authentication failed')
        return
      }

      localStorage.setItem('adminToken', data.token)
      setToken(data.token)
      setAuthError('')
      setEmail('')
      setPassword('')
      loadNews()
      loadFounders()
    } catch (error) {
      setAuthError('Authentication error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setNewsItems([])
    setFounders([])
  }

  // News operations
  const loadNews = async () => {
    try {
      setLoadingNews(true)
      const response = await fetch('/api/news')
      const data = await response.json()
      setNewsItems(data)
    } catch (error) {
      console.error('Error loading news:', error)
    } finally {
      setLoadingNews(false)
    }
  }

  const addNewsItem = async () => {
    if (!newNewsItem.title || !newNewsItem.content) return

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newNewsItem),
      })

      if (response.ok) {
        setNewNewsItem({})
        loadNews()
      }
    } catch (error) {
      console.error('Error adding news:', error)
    }
  }

  const updateNewsItem = async () => {
    if (!editingNews) return

    try {
      const response = await fetch(`/api/news/${editingNews.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingNews),
      })

      if (response.ok) {
        setEditingNews(null)
        loadNews()
      }
    } catch (error) {
      console.error('Error updating news:', error)
    }
  }

  const deleteNewsItem = async (id: number) => {
    if (!confirm('Delete this article?')) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        loadNews()
      }
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  // Founders operations
  const loadFounders = async () => {
    try {
      setLoadingFounders(true)
      const response = await fetch('/api/founders')
      const data = await response.json()
      setFounders(data)
    } catch (error) {
      console.error('Error loading founders:', error)
    } finally {
      setLoadingFounders(false)
    }
  }

  const addFounder = async () => {
    if (!newFounder.name || !newFounder.role) return

    try {
      const response = await fetch('/api/founders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newFounder),
      })

      if (response.ok) {
        setNewFounder({})
        loadFounders()
      }
    } catch (error) {
      console.error('Error adding founder:', error)
    }
  }

  const updateFounder = async () => {
    if (!editingFounder) return

    try {
      const response = await fetch(`/api/founders/${editingFounder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingFounder),
      })

      if (response.ok) {
        setEditingFounder(null)
        loadFounders()
      }
    } catch (error) {
      console.error('Error updating founder:', error)
    }
  }

  const deleteFounder = async (id: number) => {
    if (!confirm('Delete this founder?')) return

    try {
      const response = await fetch(`/api/founders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        loadFounders()
      }
    } catch (error) {
      console.error('Error deleting founder:', error)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-blue-400 hover:text-blue-300 text-sm"
            >
              {isRegistering ? 'Have an account? Login' : 'No account? Register'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          {(['news', 'founders', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 font-medium transition capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Add New Article</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newNewsItem.title || ''}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newNewsItem.description || ''}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Content"
                  value={newNewsItem.content || ''}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, content: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 h-32"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={newNewsItem.author || ''}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, author: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newNewsItem.imageUrl || ''}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={addNewsItem}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add Article
                </button>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-4">
              {loadingNews ? (
                <p className="text-slate-400">Loading...</p>
              ) : newsItems.length === 0 ? (
                <p className="text-slate-400">No articles yet</p>
              ) : (
                newsItems.map((item) => (
                  <div key={item.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    {editingNews?.id === item.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingNews.title}
                          onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                        />
                        <textarea
                          value={editingNews.content}
                          onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white h-32"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={updateNewsItem}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
                          >
                            <Save size={18} /> Save
                          </button>
                          <button
                            onClick={() => setEditingNews(null)}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
                          >
                            <X size={18} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-slate-300 mb-4">{item.description}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingNews(item)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
                          >
                            <Edit2 size={18} /> Edit
                          </button>
                          <button
                            onClick={() => deleteNewsItem(item.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
                          >
                            <Trash2 size={18} /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Founders Tab */}
        {activeTab === 'founders' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Add New Founder</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newFounder.name || ''}
                  onChange={(e) => setNewFounder({ ...newFounder, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newFounder.role || ''}
                  onChange={(e) => setNewFounder({ ...newFounder, role: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Bio"
                  value={newFounder.bio || ''}
                  onChange={(e) => setNewFounder({ ...newFounder, bio: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 h-24"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newFounder.imageUrl || ''}
                  onChange={(e) => setNewFounder({ ...newFounder, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={addFounder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add Founder
                </button>
              </div>
            </div>

            {/* Founders List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loadingFounders ? (
                <p className="text-slate-400">Loading...</p>
              ) : founders.length === 0 ? (
                <p className="text-slate-400">No founders yet</p>
              ) : (
                founders.map((founder) => (
                  <div key={founder.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    {editingFounder?.id === founder.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingFounder.name}
                          onChange={(e) => setEditingFounder({ ...editingFounder, name: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                        />
                        <input
                          type="text"
                          value={editingFounder.role}
                          onChange={(e) => setEditingFounder({ ...editingFounder, role: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                        />
                        <textarea
                          value={editingFounder.bio}
                          onChange={(e) => setEditingFounder({ ...editingFounder, bio: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white h-24"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={updateFounder}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingFounder(null)}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-bold">{founder.name}</h3>
                        <p className="text-slate-400 text-sm mb-2">{founder.role}</p>
                        <p className="text-slate-300 text-sm mb-4">{founder.bio}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingFounder(founder)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteFounder(founder.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6">Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700 rounded">
                <p className="text-slate-300">Total News Articles: <span className="font-bold text-white">{newsItems.length}</span></p>
              </div>
              <div className="p-4 bg-slate-700 rounded">
                <p className="text-slate-300">Total Founders: <span className="font-bold text-white">{founders.length}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
