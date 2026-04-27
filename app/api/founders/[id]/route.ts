import { NextRequest, NextResponse } from 'next/server'
import db, { initializeDatabase } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

initializeDatabase()

// GET /api/founders/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const founder = db.prepare('SELECT * FROM founders WHERE id = ?').get(params.id)
    if (!founder) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(founder)
  } catch (error) {
    console.error('Error fetching founder:', error)
    return NextResponse.json({ error: 'Failed to fetch founder' }, { status: 500 })
  }
}

// PUT /api/founders/[id] - Update founder (admin only)
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

    const { name, role, bio, imageUrl, expertise, socialLinks } = await req.json()

    const stmt = db.prepare(
      `UPDATE founders SET name = ?, role = ?, bio = ?, imageUrl = ?, expertise = ?, socialLinks = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    stmt.run(
      name,
      role,
      bio,
      imageUrl,
      JSON.stringify(expertise || []),
      JSON.stringify(socialLinks || {}),
      params.id
    )

    const updated = db.prepare('SELECT * FROM founders WHERE id = ?').get(params.id)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating founder:', error)
    return NextResponse.json({ error: 'Failed to update founder' }, { status: 500 })
  }
}

// DELETE /api/founders/[id] - Delete founder (admin only)
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

    db.prepare('DELETE FROM founders WHERE id = ?').run(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting founder:', error)
    return NextResponse.json({ error: 'Failed to delete founder' }, { status: 500 })
  }
}
