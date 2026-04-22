"use client"

// import { useEffect, useRef } from "react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { motion } from "motion/react"
// import { NeatGradient } from "@firecms/neat"

import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Section from "@/components/ui/Section"
import { siteConfig } from "@/content/site"

export default function Hero() {
  // Kept as a fallback in case we want to restore the procedural hero background.
  // const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // useEffect(() => {
  //   if (!canvasRef.current) return
  //
  //   const gradient = new NeatGradient({
  //     ref: canvasRef.current,
  //     colors: [
  //       { color: "#1F6FB7", enabled: true },
  //       { color: "#123A63", enabled: true },
  //       { color: "#4B6179", enabled: true },
  //       { color: "#EDF5FF", enabled: true },
  //       { color: "#FFFFFF", enabled: true },
  //     ],
  //     speed: 2.5,
  //     horizontalPressure: 3,
  //     verticalPressure: 3,
  //     waveFrequencyX: 2,
  //     waveFrequencyY: 2,
  //     waveAmplitude: 3,
  //     shadows: 0,
  //     highlights: 1,
  //     colorBlending: 4,
  //     backgroundColor: "#FFFFFF",
  //     backgroundAlpha: 1,
  //     resolution: 1,
  //   })
  //
  //   return () => {
  //     gradient.destroy()
  //   }
  // }, [])

  return (
    <Section>
      <div className="hero-grid relative overflow-hidden rounded-[var(--radius-xl)] border border-[rgba(216,229,243,0.38)] px-8 py-12 shadow-[var(--shadow-card)] md:px-12 md:py-16">
        {/* <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        /> */}

        <Image
          src="/hero-gradient.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover object-center"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(4,11,22,0.80)_8%,rgba(9,25,46,0.68)_38%,rgba(18,58,99,0.55)_62%,rgba(4,11,22,0.78)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.00)_18%,rgba(4,11,22,0.18)_100%)]" />

        <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(31,111,183,0.18)_0%,rgba(255,255,255,0.03)_55%,transparent_72%)] blur-2xl" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(237,245,255,0.12)_0%,rgba(31,111,183,0.10)_40%,transparent_72%)] blur-2xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <Badge className="border border-white/12 bg-white/8 text-[var(--accent-soft)] backdrop-blur-md">
              {siteConfig.hero.badge}
            </Badge>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
              {siteConfig.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[rgba(237,245,255,0.82)] md:text-lg">
              {siteConfig.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="border border-transparent shadow-[0_16px_32px_rgba(4,11,22,0.24)]"
              >
                <Link href={siteConfig.hero.primaryCta.href}>
                  {siteConfig.hero.primaryCta.label}
                </Link>
              </Button>

              <Button
                variant="secondary"
                asChild
                className="border-white/14 bg-white/8 text-white backdrop-blur-md hover:bg-white/14"
              >
                <Link href={siteConfig.hero.secondaryCta.href}>
                  {siteConfig.hero.secondaryCta.label}
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
              {siteConfig.hero.highlights.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-[rgba(237,245,255,0.78)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {siteConfig.categoryPreview.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, x: 20, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.18 + index * 0.08,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className="group relative block overflow-hidden rounded-[var(--radius-lg)] border border-white/12 bg-[rgba(255,255,255,0.08)] p-6 shadow-[0_18px_42px_rgba(4,11,22,0.18)] backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.12)] hover:shadow-[0_24px_54px_rgba(4,11,22,0.24)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_100%)]" />

                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[rgba(237,245,255,0.62)]">
                      Категория
                    </p>

                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">
                      {category.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[rgba(237,245,255,0.76)]">
                      {category.description}
                    </p>

                    <div className="mt-6 text-sm font-semibold text-[var(--accent-soft)] transition group-hover:translate-x-0.5">
                      Открыть раздел →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
