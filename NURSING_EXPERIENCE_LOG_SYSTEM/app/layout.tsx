import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Theme } from '@radix-ui/themes';
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NU Nurse Log',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          {children}
          {/* <SpeedInsights/> */}
        </Theme>
      </body>
    </html>
  )
}
