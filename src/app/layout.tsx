import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"

import "@/app/globals.css"
import CartDrawer from "@/components/rfq/CartDrawer"
import { siteConfig } from "@/content/site"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="ru" data-scroll-behavior="smooth">
        <body className={`${manrope.variable} min-h-screen`}>
          {children}
          <CartDrawer />
        </body>
      </html>
    </ViewTransitions>
  )
}
