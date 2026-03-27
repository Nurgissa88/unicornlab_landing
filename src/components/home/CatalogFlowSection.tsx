"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Link } from "next-view-transitions"

import Section from "@/components/ui/Section"
import { siteConfig } from "@/content/site"

function TopCategoryCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-[28px] border border-[var(--border)] bg-white/90 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
    >
      <div className="flex min-h-[180px] flex-col">
        <h3 className="text-[clamp(1.75rem,2.2vw,2.3rem)] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
          {title}
        </h3>

        <p className="mt-4 max-w-[32ch] text-base leading-8 muted-text">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-8 text-[var(--primary)]">
          <span className="text-sm font-medium">Перейти в каталог</span>
          <span className="text-2xl transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  )
}

function BenefitCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-white/88 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.035)]">
      <h3 className="text-[clamp(1.45rem,1.6vw,2rem)] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
        {title}
      </h3>

      <p className="mt-5 text-base leading-8 muted-text">{description}</p>
    </div>
  )
}

function FlowSvg({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>
}) {
  const top = [
    "M 220 40 C 220 92, 320 104, 430 118 C 520 130, 590 150, 650 208",
    "M 700 40 C 700 96, 700 144, 700 208",
    "M 1180 40 C 1180 92, 1080 104, 970 118 C 880 130, 810 150, 750 208",
  ]

  const topGlow = [
    top[0],
    "M 700 208 C 700 144, 700 96, 700 40",
    top[2],
  ]

  const bottom = [
    "M 640 286 C 640 334, 560 344, 390 362 C 250 376, 165 416, 140 506",
    "M 685 286 C 685 336, 655 346, 585 366 C 520 384, 470 420, 455 506",
    "M 715 286 C 715 336, 745 346, 815 366 C 880 384, 930 420, 945 506",
    "M 760 286 C 760 334, 840 344, 1010 362 C 1150 376, 1235 416, 1260 506",
  ]

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "end 20%"],
  })

  const topPathLength = useTransform(scrollYProgress, [0, 0.42], [0, 1])
  const topOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.18, 0.42],
    [0, 0.2, 0.95, 0.95]
  )

  const bottomPathLength = useTransform(scrollYProgress, [0.34, 0.9], [0, 1])
  const bottomOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.42, 0.62, 0.9],
    [0, 0.08, 0.95, 0.95]
  )

  const allPaths = [...top, ...bottom]

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[170px] hidden h-[520px] xl:block">
      <svg
        viewBox="0 0 1400 520"
        className="h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="flowBase"
            x1="0"
            y1="0"
            x2="1400"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(56,189,248,0.16)" />
            <stop offset="50%" stopColor="rgba(15,118,110,0.18)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.14)" />
          </linearGradient>

          <linearGradient
            id="flowPulse"
            x1="0"
            y1="0"
            x2="1400"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(125,211,252,0)" />
            <stop offset="30%" stopColor="rgba(125,211,252,0.92)" />
            <stop offset="50%" stopColor="rgba(110,231,183,0.95)" />
            <stop offset="70%" stopColor="rgba(125,211,252,0.92)" />
            <stop offset="100%" stopColor="rgba(125,211,252,0)" />
          </linearGradient>

          <linearGradient
            id="flowScrollPulse"
            x1="0"
            y1="0"
            x2="1400"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(186,230,253,0.88)" />
            <stop offset="40%" stopColor="rgba(125,211,252,1)" />
            <stop offset="60%" stopColor="rgba(110,231,183,1)" />
            <stop offset="100%" stopColor="rgba(110,231,183,0.92)" />
          </linearGradient>

          <filter id="flowGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="flowGlowStrong" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {allPaths.map((d, i) => (
          <motion.path
            key={`base-${i}`}
            d={d}
            stroke="url(#flowBase)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}

        {topGlow.map((d, i) => (
          <motion.path
            key={`auto-pulse-top-${i}`}
            d={d}
            stroke="url(#flowPulse)"
            strokeWidth={i === 1 ? 12 : 8}
            strokeLinecap="round"
            strokeDasharray={i === 1 ? "220 900" : "300 1200"}
            filter="url(#flowGlow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: i === 1 ? 1 : 0.55 }}
            viewport={{ once: false, amount: 0.2 }}
            animate={{ strokeDashoffset: [1400, 0, -1400] }}
            transition={{
              duration: i === 1 ? 4.2 : 5.2,
              delay: i * 0.22,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {bottom.map((d, i) => (
          <motion.path
            key={`auto-pulse-bottom-${i}`}
            d={d}
            stroke="url(#flowPulse)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="300 1200"
            filter="url(#flowGlow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.55 }}
            viewport={{ once: false, amount: 0.2 }}
            animate={{ strokeDashoffset: [1400, 0, -1400] }}
            transition={{
              duration: 5.2,
              delay: (i + 3) * 0.22,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {topGlow.map((d, i) => (
          <motion.path
            key={`scroll-top-${i}`}
            d={d}
            stroke="url(#flowScrollPulse)"
            strokeWidth={i === 1 ? 12 : 11}
            strokeLinecap="round"
            pathLength={topPathLength}
            style={{ opacity: topOpacity }}
            filter="url(#flowGlowStrong)"
          />
        ))}

        {bottom.map((d, i) => (
          <motion.path
            key={`scroll-bottom-${i}`}
            d={d}
            stroke="url(#flowScrollPulse)"
            strokeWidth="11"
            strokeLinecap="round"
            pathLength={bottomPathLength}
            style={{ opacity: bottomOpacity }}
            filter="url(#flowGlowStrong)"
          />
        ))}
      </svg>
    </div>
  )
}

export default function CatalogFlowSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start 85%", "end 20%"],
})

const centerGlowScale = useTransform(scrollYProgress, [0, 0.42], [0, 1])
const centerGlowOpacity = useTransform(
  scrollYProgress,
  [0, 0.06, 0.18, 0.42],
  [0, 0.35, 1, 1]
)

  const topCards = [
    {
      title: "Оборудование",
      description:
        "Аналитические приборы, лабораторные системы и вспомогательное оснащение.",
      href: "/catalog/equipment",
    },
    {
      title: "Реагенты",
      description:
        "Наборы, буферы, химические и биологические реагенты для лабораторных задач.",
      href: "/catalog/reagents",
    },
    {
      title: "Расходные материалы",
      description:
        "Пластик, комплектующие, аксессуары и запасные элементы.",
      href: "/catalog/consumables",
    },
  ]

  return (
    <Section id="about" className="pt-0">
      <div className="section-panel relative overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.05),transparent_35%),radial-gradient(circle_at_bottom,rgba(15,118,110,0.05),transparent_35%)]" />

        <div ref={sectionRef} className="relative">
          <div className="relative z-10 grid gap-6 xl:grid-cols-3">
            {topCards.map((card, index) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <TopCategoryCard {...card} />
              </motion.div>
            ))}
          </div>

          <FlowSvg targetRef={sectionRef} />
<div className="pointer-events-none absolute left-1/2 top-[252px] z-[5] hidden -translate-x-1/2 xl:block">
  <div className="relative h-[118px] w-[14px]">
    <div className="absolute inset-x-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[rgba(15,118,110,0.18)]" />

    <motion.div
      className="absolute inset-x-1/2 top-0 h-[54px] w-[8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(186,230,253,0.0)_0%,rgba(125,211,252,0.95)_35%,rgba(110,231,183,0.95)_100%)] blur-[6px]"
      animate={{
        y: [-54, 118],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "linear",
      }}
    />

<motion.div
  className="absolute inset-x-1/2 top-0 h-full w-[12px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(186,230,253,1)_0%,rgba(125,211,252,1)_42%,rgba(110,231,183,1)_100%)] blur-[2px]"
  style={{
    scaleY: centerGlowScale,
    opacity: centerGlowOpacity,
    originY: 0,
  }}
/>
  </div>
</div>
          <div className="relative z-10 mt-[28px] xl:mt-[40px]">
            <motion.div
              className="mx-auto w-full max-w-[320px]"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="rounded-[24px] border border-[var(--border)] bg-white/92 px-7 py-5 text-center shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] muted-text">
                  Почему с нами удобно
                </p>

                <h2 className="mx-auto mt-3 max-w-[16ch] text-[clamp(1.2rem,1.55vw,1.9rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--foreground)] text-balance">
                  Структурированный каталог и единый запрос на КП
                </h2>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 mt-[84px] xl:mt-[130px] grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <BenefitCard
                  title={benefit.title}
                  description={benefit.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}