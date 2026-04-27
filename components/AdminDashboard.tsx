'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Edit2, Save, X, Eye, EyeOff } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  description: string
  content: string
  imageUrl?: string
  author?: string
  date: string
  featured?: boolean
}

interface Founder {
  id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  expertise: string[]
  socialLinks?: Record<string, string>
}

interface ContentSection {
  title: string
  description: string
  items: any[]
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'news' | 'founders' | 'hero' | 'settings'>('news')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // News state
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [newNewsItem, setNewNewsItem] = useState<Partial<NewsItem>>({})

  // Founders state
  const [founders, setFounders] = useState<Founder[]>([])
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null)
  const [newFounder, setNewFounder] = useState<Partial<Founder>>({})

  // Hero state
  const [heroContent, setHeroContent] = useState({
    tagline: 'Building BIOOS',
    title: 'N.E.R.V.E Bio Robotics Lab',
    subtitle: 'Biological Operating System for Robotics',
    ctaText: 'Explore',
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNews = localStorage.getItem('adminNewsItems')
    const savedFounders = localStorage.getItem('adminFounders')
    const savedHero = localStorage.getItem('adminHeroContent')
    const authToken = localStorage.getItem('adminAuthToken')

    if (savedNews) setNewsItems(JSON.parse(savedNews))
    if (savedFounders) setFounders(JSON.parse(savedFounders))
    if (savedHero) setHeroContent(JSON.parse(savedHero))
    if (authToken) setIsAuthenticated(true)
  }, [])

  // Save news to localStorage
  const saveNews = () => {
    localStorage.setItem('adminNewsItems', JSON.stringify(newsItems))
  }

  // Save founders to localStorage
  const saveFounders = () => {
    localStorage.setItem('adminFounders', JSON.stringify(founders))
  }

  // Save hero to localStorage
  const saveHero = () => {
    localStorage.setItem('adminHeroContent', JSON.stringify(heroContent))
  }

  // Authentication
  const handleLogin = () => {
    if (adminPassword === 'Anandhan@nerve') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthToken', 'true')
      setPasswordError('')
    } else {
      setPasswordError('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthToken')
  }

  // News management
  const addNewsItem = () => {
    if (!newNewsItem.title) return
    const item: NewsItem = {
      id: Date.now().toString(),
      title: newNewsItem.title || '',
      description: newNewsItem.description || '',
      content: newNewsItem.content || '',
      imageUrl: newNewsItem.imageUrl,
      author: newNewsItem.author,
      date: new Date().toISOString().split('T')[0],
      featured: false,
    }
    setNewsItems([item, ...newsItems])
    setNewNewsItem({})
    saveNews()
  }

  const updateNewsItem = () => {
    if (!editingNews) return
    setNewsItems(newsItems.map(item => item.id === editingNews.id ? editingNews : item))
    setEditingNews(null)
    saveNews()
  }

  const deleteNewsItem = (id: string) => {
    setNewsItems(newsItems.filter(item => item.id !== id))
    saveNews()
  }

  const toggleNewsFeatured = (id: string) => {
    setNewsItems(newsItems.map(item =>
      item.id === id ? { ...item, featured: !item.featured } : item
    ))
    saveNews()
  }

  // Founder management
  const addFounder = () => {
    if (!newFounder.name) return
    const founder: Founder = {
      id: Date.now().toString(),
      name: newFounder.name || '',
      role: newFounder.role || '',
      bio: newFounder.bio || '',
      imageUrl: newFounder.imageUrl,
      expertise: newFounder.expertise || [],
      socialLinks: newFounder.socialLinks || {},
    }
    setFounders([...founders, founder])
    setNewFounder({})
    saveFounders()
  }

  const updateFounder = () => {
    if (!editingFounder) return
    setFounders(founders.map(f => f.id === editingFounder.id ? editingFounder : f))
    setEditingFounder(null)
    saveFounders()
  }

  const deleteFounder = (id: string) => {
    setFounders(founders.filter(f => f.id !== id))
    saveFounders()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter admin password"
              />
            </div>
            {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
              Login
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
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          {(['news', 'founders', 'hero', 'settings'] as const).map((tab) => (
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
              {newsItems.map((item) => (
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
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-slate-400 text-sm">{item.date}</p>
                        </div>
                        <button
                          onClick={() => toggleNewsFeatured(item.id)}
                          className="p-2 hover:bg-slate-700 rounded transition"
                        >
                          {item.featured ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>
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
              ))}
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
              {founders.map((founder) => (
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
              ))}
            </div>
          </div>
        )}

        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
                <input
                  type="text"
                  value={heroContent.tagline}
                  onChange={(e) => setHeroContent({ ...heroContent, tagline: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
                <textarea
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CTA Text</label>
                <input
                  type="text"
                  value={heroContent.ctaText}
                  onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
              </div>
              <button
                onClick={saveHero}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
              >
                <Save size={18} /> Save Changes
              </button>
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
              <button
                onClick={() => {
                  if (confirm('Are you sure? This will clear all data.')) {
                    localStorage.removeItem('adminNewsItems')
                    localStorage.removeItem('adminFounders')
                    localStorage.removeItem('adminHeroContent')
                    setNewsItems([])
                    setFounders([])
                    alert('All data cleared')
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition"
              >
                Clear All Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
