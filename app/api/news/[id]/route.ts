import { NextRequest, NextResponse } from 'next/server'
import db, { initializeDatabase } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

initializeDatabase()

// GET /api/news/[id] - Get single news article
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = db.prepare('SELECT * FROM news WHERE id = ?').get(params.id)
    if (!article) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

// PUT /api/news/[id] - Update news (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, description, content, imageUrl, author, featured } = await req.json()

    const stmt = db.prepare(
      `UPDATE news SET title = ?, description = ?, content = ?, imageUrl = ?, author = ?, featured = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    stmt.run(title, description, content, imageUrl, author, featured ? 1 : 0, params.id)

    const updated = db.prepare('SELECT * FROM news WHERE id = ?').get(params.id)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

// DELETE /api/news/[id] - Delete news (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    db.prepare('DELETE FROM news WHERE id = ?').run(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
