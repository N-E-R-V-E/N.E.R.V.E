import { NextRequest, NextResponse } from 'next/server'
import db, { initializeDatabase } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

initializeDatabase()

// GET /api/founders - Get all published founders
export async function GET() {
  try {
    const founders = db
      .prepare('SELECT * FROM founders WHERE published = 1 ORDER BY position ASC')
      .all()
    return NextResponse.json(founders)
  } catch (error) {
    console.error('Error fetching founders:', error)
    return NextResponse.json({ error: 'Failed to fetch founders' }, { status: 500 })
  }
}

// POST /api/founders - Create founder (admin only)
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

    const { name, role, bio, imageUrl, expertise, socialLinks } = await req.json()

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role required' }, { status: 400 })
    }

    const stmt = db.prepare(
      `INSERT INTO founders (name, role, bio, imageUrl, expertise, socialLinks, published)
       VALUES (?, ?, ?, ?, ?, ?, 1)`
    )
    const result = stmt.run(
      name,
      role,
      bio,
      imageUrl,
      JSON.stringify(expertise || []),
      JSON.stringify(socialLinks || {})
    )

    const newFounder = db.prepare('SELECT * FROM founders WHERE id = ?').get(result.lastInsertRowid)
    return NextResponse.json(newFounder, { status: 201 })
  } catch (error) {
    console.error('Error creating founder:', error)
    return NextResponse.json({ error: 'Failed to create founder' }, { status: 500 })
  }
}
