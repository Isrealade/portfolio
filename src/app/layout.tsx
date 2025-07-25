import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IsrealAde | DevOps/Cloud Engineer',
  description: 'DevOps/Cloud Engineer specializing in AWS, Azure, Kubernetes, Terraform, and CI/CD automation. Building resilient, secure, and scalable cloud environments.',
  keywords: ['DevOps', 'Cloud Engineer', 'AWS', 'Azure', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
  authors: [{ name: 'Isreal Adenekan' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Isreal Adenekan - DevOps Engineer',
    description: 'DevOps/Cloud Engineer specializing in cloud automation and infrastructure',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}