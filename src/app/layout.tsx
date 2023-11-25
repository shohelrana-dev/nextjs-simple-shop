import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Providers from '@/app/providers'
import './globals.css'
import ShoppingCartModal from '@/components/ShoppingCartModal'
import { siteMetadata } from '@/lib/utils'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title!,
    template: '%s | Online shopping platform',
  },
  applicationName: siteMetadata.siteName,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl!),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          <ShoppingCartModal />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
