import { notFound } from "next/navigation"

import CatalogPage from "@/components/catalog/CatalogPage"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { categories } from "@/content/categories"
import { products } from "@/content/products"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params

  const currentCategory = categories.find((item) => item.slug === category)

  if (!currentCategory) {
    notFound()
  }

  const categoryProducts = products.filter(
    (product) => product.category === category
  )

  return (
    <>
      <Header />
      <main>
        <CatalogPage
          currentCategory={currentCategory}
          products={categoryProducts}
        />
      </main>
      <Footer />
    </>
  )
}