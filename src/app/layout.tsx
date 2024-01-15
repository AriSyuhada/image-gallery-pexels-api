import { Navbar } from './components'
import './globals.css'
import type { Metadata } from 'next'

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Next Gallery',
  description: 'Image Gallery Website made of Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className='max-w-6xl mx-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
