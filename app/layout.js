import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'K S Sivaneshakumar | Biomedical AI Engineer',
  description: 'Award-winning portfolio of K S Sivaneshakumar — Published Researcher, AI/ML Engineer, and Full-Stack Developer. IEEE & Springer Author. GATE AIR 372.',
  keywords: 'biomedical engineering, AI, machine learning, deep learning, full-stack, IEEE, GATE',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ background: '#0B0F19', color: '#ffffff', overflowX: 'hidden' }}
      >
        {children}
      </body>
    </html>
  )
}
