import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbDir = path.join(process.cwd(), 'data')
const dbPath = path.join(dbDir, 'app.db')

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

// Initialize database schema
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      imageUrl TEXT,
      author TEXT,
      featured BOOLEAN DEFAULT 0,
      published BOOLEAN DEFAULT 1,
      publishedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS founders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT,
      imageUrl TEXT,
      expertise TEXT,
      socialLinks TEXT,
      position INTEGER DEFAULT 0,
      published BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS workshops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date DATETIME,
      location TEXT,
      imageUrl TEXT,
      registrationUrl TEXT,
      published BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      imageUrl TEXT NOT NULL,
      category TEXT,
      position INTEGER DEFAULT 0,
      published BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS downloads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      fileUrl TEXT NOT NULL,
      fileType TEXT,
      category TEXT,
      position INTEGER DEFAULT 0,
      published BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS heroContent (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tagline TEXT,
      title TEXT,
      subtitle TEXT,
      ctaText TEXT,
      imageUrl TEXT,
      published BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
    CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
    CREATE INDEX IF NOT EXISTS idx_founders_published ON founders(published);
    CREATE INDEX IF NOT EXISTS idx_workshops_published ON workshops(published);
    CREATE INDEX IF NOT EXISTS idx_gallery_published ON gallery(published);
    CREATE INDEX IF NOT EXISTS idx_downloads_published ON downloads(published);
  `)
}

export default db
