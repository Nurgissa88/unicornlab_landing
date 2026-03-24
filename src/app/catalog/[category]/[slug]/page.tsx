import { Link } from "next-view-transitions"
import { notFound } from "next/navigation"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import AddToQuoteButton from "@/components/rfq/AddToQuoteButton"
import Badge from "@/components/ui/Badge"
import Section from "@/components/ui/Section"
import { categories } from "@/content/categories"
import { products } from "@/content/products"

function ProductDetailsVisual({ category }: { category: string }) {
  if (category === "equipment") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#eef6ff_0%,#f8fbff_55%,#eefaf8_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_28%)]" />
        <div className="relative flex h-44 w-56 items-center justify-center rounded-[28px] border border-white/70 bg-white/80 shadow-[0_22px_50px_rgba(15,23,42,0.10)] backdrop-blur-sm">
          <div className="absolute left-5 top-5 h-3 w-3 rounded-full bg-[var(--primary)]/70" />
          <div className="absolute right-5 top-5 h-2.5 w-16 rounded-full bg-slate-200" />
          <div className="h-24 w-36 rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#e8eef7_100%)] shadow-inner" />
        </div>
        <div className="absolute bottom-6 left-6 rounded-full border border-white/80 bg-white/80 px-4 py-1.5 text-sm font-semibold text-[var(--primary)] shadow-sm">
          Equipment
        </div>
      </div>
    )
  }

  if (category === "reagents") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f3fbfa_0%,#eef7ff_50%,#f7fcfb_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(15,118,110,0.14),transparent_18%),radial-gradient(circle_at_70%_40%,rgba(56,189,248,0.14),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(16,185,129,0.10),transparent_20%)]" />
        <div className="relative flex gap-5">
          <div className="h-36 w-16 rounded-full border border-white/80 bg-white/75 shadow-[0_18px_36px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
          <div className="mt-8 h-28 w-16 rounded-full border border-white/80 bg-white/70 shadow-[0_18px_36px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
          <div className="h-40 w-16 rounded-full border border-white/80 bg-white/80 shadow-[0_18px_36px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-6 left-6 rounded-full border border-white/80 bg-white/80 px-4 py-1.5 text-sm font-semibold text-[var(--primary)] shadow-sm">
          Reagents
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f7f9fc_0%,#eef4fb_55%,#f4fbf8_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.10),transparent_24%)]" />
      <div className="relative grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-14 w-14 rounded-[14px] border border-white/80 bg-white/80 shadow-[0_12px_28px_rgba(15,23,42,0.07)] backdrop-blur-sm"
          />
        ))}
      </div>
      <div className="absolute bottom-6 left-6 rounded-full border border-white/80 bg-white/80 px-4 py-1.5 text-sm font-semibold text-[var(--primary)] shadow-sm">
        Consumables
      </div>
    </div>
  )
}

interface ProductDetailsPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }))
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { category, slug } = await params

  const currentCategory = categories.find((item) => item.slug === category)
  const product = products.find(
    (item) => item.category === category && item.slug === slug
  )

  if (!currentCategory || !product) {
    notFound()
  }

  return (
    <>
      <Header />

      <main>
        <Section>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface-card p-6 md:p-8">
              <ProductDetailsVisual category={product.category} />
            </div>

            <div className="section-panel px-6 py-6 md:px-8 md:py-8">
              <Link
                href={`/catalog/${product.category}`}
                className="text-sm font-medium text-[var(--primary)] transition hover:opacity-80"
              >
                ← Назад в раздел
              </Link>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] muted-text">
                {product.brand} · {currentCategory.title}
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                {product.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                <Badge>Артикул: {product.sku}</Badge>
                {product.featured ? <Badge>Рекомендуемая позиция</Badge> : null}
              </div>

              <p className="mt-6 text-base leading-7 muted-text">
                {product.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AddToQuoteButton product={product} />
                <Link
                  href="#documents"
                  className="ui-button ui-button-secondary"
                >
                  Документы
                </Link>
              </div>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="surface-card p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                Характеристики
              </p>

              <div className="mt-6 space-y-4">
                {product.attributes.map((attribute) => (
                  <div
                    key={`${product.id}-${attribute.label}`}
                    className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-start sm:justify-between"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="text-sm muted-text">
                      {attribute.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--foreground)] sm:text-right">
                      {attribute.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div id="documents" className="surface-card p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                Документы
              </p>

              {product.documents && product.documents.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {product.documents.map((document) => (
                    <a
                      key={`${product.id}-${document.href}`}
                      href={document.href}
                      className="flex items-center justify-between rounded-[var(--radius-md)] border px-4 py-4 text-sm font-medium transition hover:bg-[var(--surface-soft)]"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <span>{document.label}</span>
                      <span className="text-[var(--primary)]">Открыть</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm leading-6 muted-text">
                  Для этой позиции документы пока не добавлены.
                </p>
              )}
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}