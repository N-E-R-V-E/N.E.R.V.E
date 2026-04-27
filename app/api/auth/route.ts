import { NextRequest, NextResponse } from 'next/server'
import db, { initializeDatabase } from '@/lib/db'
import { generateToken, hashPassword, comparePassword } from '@/lib/auth'

// Initialize database on first request
initializeDatabase()

export async function POST(req: NextRequest) {
  try {
    const { action, email, password } = await req.json()

    if (action === 'register') {
      // Check if user already exists
      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
      if (existing) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password)
      const stmt = db.prepare(
        'INSERT INTO users (email, password, role) VALUES (?, ?, ?)'
      )
      const result = stmt.run(email, hashedPassword, 'admin')

      const token = generateToken({
        id: result.lastInsertRowid as number,
        email,
        role: 'admin',
      })

      return NextResponse.json({ token, email })
    }

    if (action === 'login') {
      const user = db.prepare('SELECT id, email, password, role FROM users WHERE email = ?').get(email) as any
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const passwordMatch = await comparePassword(password, user.password)
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      })

      return NextResponse.json({ token, email: user.email, role: user.role })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
