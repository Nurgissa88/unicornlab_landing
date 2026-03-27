"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ProductDetailsRevealProps {
  children: React.ReactNode
}

export default function ProductDetailsReveal({
  children,
}: ProductDetailsRevealProps) {
  const scope = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const heroVisual = scope.current?.querySelector<HTMLElement>("[data-pd-visual]")
      const heroInfo = scope.current?.querySelector<HTMLElement>("[data-pd-info]")
      const specCard = scope.current?.querySelector<HTMLElement>("[data-pd-specs]")
      const docsCard = scope.current?.querySelector<HTMLElement>("[data-pd-docs]")

      if (heroVisual) {
        gsap.fromTo(
          heroVisual,
          {
            autoAlpha: 0,
            x: -64,
            scale: 0.985,
          },
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 1.75,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
          }
        )
      }

      if (heroInfo) {
        const heroInfoChildren = gsap.utils.toArray<HTMLElement>("[data-pd-info-item]")

        gsap.fromTo(
          heroInfo,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.2,
          }
        )

        if (heroInfoChildren.length) {
          gsap.fromTo(
            heroInfoChildren,
            {
              autoAlpha: 0,
              y: 18,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
            }
          )
        }
      }

      if (specCard) {
        gsap.fromTo(
          specCard,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: specCard,
              start: "top 85%",
              once: true,
            },
          }
        )

        const specRows = gsap.utils.toArray<HTMLElement>("[data-pd-spec-row]")
        if (specRows.length) {
          gsap.fromTo(
            specRows,
            {
              autoAlpha: 0,
              y: 16,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: {
                trigger: specCard,
                start: "top 82%",
                once: true,
              },
            }
          )
        }
      }

      if (docsCard) {
        gsap.fromTo(
          docsCard,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: docsCard,
              start: "top 85%",
              once: true,
            },
          }
        )

        const docRows = gsap.utils.toArray<HTMLElement>("[data-pd-doc-row]")
        if (docRows.length) {
          gsap.fromTo(
            docRows,
            {
              autoAlpha: 0,
              y: 14,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: {
                trigger: docsCard,
                start: "top 82%",
                once: true,
              },
            }
          )
        }
      }
    },
    { scope }
  )

  return <div ref={scope}>{children}</div>
}