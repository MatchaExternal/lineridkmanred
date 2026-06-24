import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Anton } from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const display = Anton({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'REDLINER // MERC.OS',
  description:
    'REDLINER — Professional Mercenary Operations. Classified community terminal for the REDLINER tactical combat experience. Compete. Survive. Dominate.',
  generator: 'v0.app',
  keywords: ['REDLINER', 'Roblox', 'mercenary', 'MERC.OS', 'leaderboards', 'arsenal'],
  openGraph: {
    title: 'REDLINER // MERC.OS',
    description: 'Professional Mercenary Operations. Compete. Survive. Dominate.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistMono.variable} ${display.variable} bg-background`}>
      <body className="font-mono antialiased bg-background text-foreground crt-scanlines crt-vignette">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
