"use client"

import { useEffect, useRef } from "react"
import { Link } from "next-view-transitions"
import { motion } from "motion/react"
import { NeatGradient } from "@firecms/neat"

import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Section from "@/components/ui/Section"
import { siteConfig } from "@/content/site"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const gradient = new NeatGradient({
      ref: canvasRef.current,
      colors: [
        { color: "#0f766e", enabled: true },
        { color: "#38bdf8", enabled: true },
        { color: "#dff7f3", enabled: true },
        { color: "#cbdcf8", enabled: true },
        { color: "#f6f8fb", enabled: true },
      ],
      speed: 2.5,
      horizontalPressure: 3,
      verticalPressure: 3,
      waveFrequencyX: 2,
      waveFrequencyY: 2,
      waveAmplitude: 3,
      shadows: 0,
      highlights: 1,
      colorBlending: 4,
      backgroundColor: "#f6f8fb",
      backgroundAlpha: 1,
      resolution: 1,
    })

    return () => {
      gradient.destroy()
    }
  }, [])

  return (
    <Section>
      <div className="hero-grid section-panel relative overflow-hidden px-8 py-12 md:px-12 md:py-16">
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.50)_42%,rgba(255,255,255,0.72)_100%)]" />

        <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.10)_55%,transparent_72%)] blur-2xl" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.08)_55%,transparent_72%)] blur-2xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <Badge>{siteConfig.hero.badge}</Badge>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-5xl lg:text-6xl">
              {siteConfig.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 muted-text md:text-lg">
              {siteConfig.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={siteConfig.hero.primaryCta.href}>
                  {siteConfig.hero.primaryCta.label}
                </Link>
              </Button>

              <Button variant="secondary" asChild>
                <Link href={siteConfig.hero.secondaryCta.href}>
                  {siteConfig.hero.secondaryCta.label}
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
              {siteConfig.hero.highlights.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]"
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
                  className="group relative block overflow-hidden rounded-[var(--radius-lg)] border border-white/60 bg-white/78 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.10)_100%)]" />

                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] muted-text">
                      Категория
                    </p>

                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                      {category.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 muted-text">
                      {category.description}
                    </p>

                    <div className="mt-6 text-sm font-semibold text-[var(--primary)] transition group-hover:translate-x-0.5">
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