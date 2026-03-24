import { Link } from "next-view-transitions"

import { siteConfig } from "@/content/site"
import Container from "@/components/ui/Container"

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white/80">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-[-0.02em]"
            >
              {siteConfig.shortName}
            </Link>
            <p className="mt-3 max-w-sm text-sm muted-text">
              {siteConfig.footer.text}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Навигация</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm muted-text">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Контакты</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm muted-text">
              <p>{siteConfig.company.name}</p>
              <a
                href={`mailto:${siteConfig.company.email}`}
                className="transition hover:text-[var(--foreground)]"
              >
                {siteConfig.company.email}
              </a>
              <a
                href={`tel:${siteConfig.company.phone.replace(/[^\d+]/g, "")}`}
                className="transition hover:text-[var(--foreground)]"
              >
                {siteConfig.company.phone}
              </a>
              <p>{siteConfig.company.address}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}