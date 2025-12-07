import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UZS FX Monitor',
  description: 'Live exchange rates dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

