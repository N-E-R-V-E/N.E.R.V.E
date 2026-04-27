import { NextRequest, NextResponse } from 'next/server'
import db, { initializeDatabase } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

initializeDatabase()

// GET /api/news - Get all published news
export async function GET() {
  try {
    const news = db
      .prepare('SELECT * FROM news WHERE published = 1 ORDER BY publishedAt DESC')
      .all()
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// POST /api/news - Create news (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, description, content, imageUrl, author } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content required' }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const stmt = db.prepare(
      `INSERT INTO news (title, slug, description, content, imageUrl, author, published)
       VALUES (?, ?, ?, ?, ?, ?, 1)`
    )
    const result = stmt.run(title, slug, description, content, imageUrl, author)

    const newArticle = db.prepare('SELECT * FROM news WHERE id = ?').get(result.lastInsertRowid)
    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}
