import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Section from "@/components/ui/Section"
import { siteConfig } from "@/content/site"

export default function ContactsPage() {
  return (
    <>
      <Header />

      <main>
        <Section>
          <div className="section-panel px-8 py-10 md:px-10 md:py-12">
            <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
              Контакты
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
              Свяжитесь с нами
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 muted-text">
              Напишите нам или отправьте запрос на коммерческое предложение
              через каталог. Мы поможем с подбором оборудования, реагентов и
              расходных материалов под ваши задачи.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                Основные контакты
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm muted-text">Компания</p>
                  <p className="mt-1 text-lg font-semibold">
                    {siteConfig.company.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm muted-text">Email</p>
                  <a
                    href={`mailto:${siteConfig.company.email}`}
                    className="mt-1 block text-lg font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]"
                  >
                    {siteConfig.company.email}
                  </a>
                </div>

                <div>
                  <p className="text-sm muted-text">Телефон</p>
                  <a
                    href={`tel:${siteConfig.company.phone.replace(/[^\d+]/g, "")}`}
                    className="mt-1 block text-lg font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]"
                  >
                    {siteConfig.company.phone}
                  </a>
                </div>

                <div>
                  <p className="text-sm muted-text">Адрес</p>
                  <p className="mt-1 text-lg font-semibold">
                    {siteConfig.company.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                Как с нами работать
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--primary)]">
                    01
                  </p>
                  <h2 className="mt-3 text-lg font-semibold">
                    Выберите позиции
                  </h2>
                  <p className="mt-2 text-sm leading-6 muted-text">
                    Откройте каталог и добавьте интересующие товары в запрос
                    КП.
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--primary)]">
                    02
                  </p>
                  <h2 className="mt-3 text-lg font-semibold">
                    Оставьте контакты
                  </h2>
                  <p className="mt-2 text-sm leading-6 muted-text">
                    Укажите ФИО, компанию и email, чтобы мы могли связаться с
                    вами.
                  </p>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--primary)]">
                    03
                  </p>
                  <h2 className="mt-3 text-lg font-semibold">Получите КП</h2>
                  <p className="mt-2 text-sm leading-6 muted-text">
                    Мы обработаем запрос и подготовим коммерческое предложение.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-5">
                <p className="text-sm muted-text">
                  Основной способ работы с сайтом — через каталог и панель
                  запроса коммерческого предложения. Для общих вопросов вы
                  также можете связаться с нами напрямую по email или телефону.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}