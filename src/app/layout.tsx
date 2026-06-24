import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import Script from "next/script"
import { ViewTransitions } from "next-view-transitions"

import "@/app/globals.css"
import TypographyGuard from "@/components/layout/TypographyGuard"
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
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110114594', 'ym');

              ym(110114594, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `}
          </Script>
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/110114594"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
          <TypographyGuard />
          {children}
          <CartDrawer />
        </body>
      </html>
    </ViewTransitions>
  )
}
