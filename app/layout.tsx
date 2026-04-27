import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import CursorEffects from '@/components/CursorEffects'

export const metadata: Metadata = {
  title: 'N.E.R.V.E — Bio Robotics Lab',
  description: 'Building BIOOS — a biological operating system for robotics. Research in bio-inspired simulation, muscle modeling, and intelligent robotic systems.',
  keywords: ['bio robotics', 'BIOOS', 'neurosim', 'biological simulation', 'robotics', 'motor control'],
  authors: [{ name: 'Anandhan A' }],
  creator: 'N.E.R.V.E Bio Robotics Lab',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'N.E.R.V.E — Bio Robotics Lab',
    description: 'Building BIOOS — a biological operating system for robotics.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <ThemeProvider>
          <CursorEffects />
          <div className="cursor-dot" id="cursorDot" />
          <div className="cursor-ring" id="cursorRing" />
          <div className="scan-line" />
          <div className="toast" id="toast" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
