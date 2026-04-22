import { Link } from "next-view-transitions"
import { notFound } from "next/navigation"

import ProductImage from "@/components/catalog/ProductImage"
import ProductDetailsReveal from "@/components/catalog/ProductDetailsReveal"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import AddToQuoteButton from "@/components/rfq/AddToQuoteButton"
import Badge from "@/components/ui/Badge"
import Section from "@/components/ui/Section"
import { categories } from "@/content/categories"
import { products } from "@/content/products"

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
        <ProductDetailsReveal>
          <Section>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div data-pd-visual className="surface-card p-6 md:p-8">
                <ProductImage
                  product={product}
                  aspectClassName="aspect-[4/3]"
                  showCategoryBadge
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>

              <div
                data-pd-info
                className="section-panel px-6 py-6 md:px-8 md:py-8"
              >
                <div data-pd-info-item>
                  <Link
                    href={`/catalog/${product.category}`}
                    className="text-sm font-medium text-[var(--primary)] transition hover:opacity-80"
                  >
                    ← Назад в раздел
                  </Link>
                </div>

                <p
                  data-pd-info-item
                  className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] muted-text"
                >
                  {product.brand} · {currentCategory.title}
                </p>

                <h1
                  data-pd-info-item
                  className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl"
                >
                  {product.title}
                </h1>

                <div
                  data-pd-info-item
                  className="mt-4 flex flex-wrap gap-3"
                >
                  {product.sku ? <Badge>Артикул: {product.sku}</Badge> : null}
                  {product.featured ? <Badge>Рекомендуемая позиция</Badge> : null}
                </div>

                <p
                  data-pd-info-item
                  className="mt-6 text-base leading-7 muted-text"
                >
                  {product.description}
                </p>

                <div
                  data-pd-info-item
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
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
              <div
                data-pd-specs
                className="surface-card p-6 md:p-8"
              >
                <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Характеристики
                </p>

                <div className="mt-6 space-y-4">
                  {product.attributes.map((attribute) => (
                    <div
                      key={`${product.id}-${attribute.label}`}
                      data-pd-spec-row
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

              <div
                id="documents"
                data-pd-docs
                className="surface-card p-6 md:p-8"
              >
                <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Документы
                </p>

                {product.documents && product.documents.length > 0 ? (
                  <div className="mt-6 space-y-3">
                    {product.documents.map((document) => (
                      <a
                        key={`${product.id}-${document.href}`}
                        data-pd-doc-row
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
        </ProductDetailsReveal>
      </main>

      <Footer />
    </>
  )
}
