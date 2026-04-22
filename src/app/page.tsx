"use client"

import { Link } from "next-view-transitions"
import { motion } from "motion/react"

import Hero from "@/components/hero/Hero"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Section from "@/components/ui/Section"
import { siteConfig } from "@/content/site"
import CatalogFlowSection from "@/components/home/CatalogFlowSection"

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
<div className="xl:hidden">
        <Section className="pt-0">
          <motion.div
            className="mb-8 flex items-end justify-between gap-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                Каталог
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                Основные направления
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {siteConfig.categoryPreview.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.42,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className="surface-card surface-card-hover block p-7"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                    {category.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 muted-text">
                    {category.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--primary)]">
                      Перейти в каталог
                    </span>
                    <span className="text-lg text-[var(--primary)]">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>


        <Section className="pt-0">
          <motion.div
            className="section-panel px-8 py-8 md:px-10 md:py-10"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
          >
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                Почему с нами удобно
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                Структурированный каталог и единый запрос на КП
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {siteConfig.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="surface-card p-6"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 muted-text">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>
</div>

<div className="hidden xl:block">
  <CatalogFlowSection />
</div>

        <Section id="rfq" className="pt-0">
          <motion.div
            className="section-panel px-8 py-8 md:px-10 md:py-10"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Запрос КП
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  {siteConfig.cta.title}
                </h2>
                <p className="mt-4 text-base leading-7 muted-text">
                  {siteConfig.cta.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={siteConfig.cta.primary.href}
                  className="ui-button ui-button-primary"
                >
                  {siteConfig.cta.primary.label}
                </Link>
                <Link
                  href={siteConfig.cta.secondary.href}
                  className="ui-button ui-button-secondary"
                >
                  {siteConfig.cta.secondary.label}
                </Link>
              </div>
            </div>
          </motion.div>
        </Section>
      </main>

      <Footer />
    </>
  )
}