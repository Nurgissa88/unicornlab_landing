"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useCartStore } from "@/lib/cartStore"
import type { RfqPayload } from "@/lib/types"
import Button from "@/components/ui/Button"
import { Input, Textarea } from "@/components/ui/Input"

const rfqSchema = z.object({
  fullName: z.string().min(2, "Введите имя"),
  company: z.string().optional(),
  email: z.email("Введите корректный email"),
  phone: z.string().optional(),
  comment: z.string().optional(),
})

type RfqFormData = z.infer<typeof rfqSchema>

interface RfqFormProps {
  mode?: "cart" | "general"
}

export default function RfqForm({ mode = "cart" }: RfqFormProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const isCartMode = mode === "cart"

  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RfqFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      comment: "",
    },
  })

  const onSubmit = async (values: RfqFormData) => {
    setSubmitError(null)

    const payload: RfqPayload = {
      customer: values,
      items: isCartMode ? items : [],
      source: mode,
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_RFQ_API_URL ?? "/api/rfq",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error("Не удалось отправить запрос")
      }

      reset()
      if (isCartMode) {
        clearCart()
      }
      setIsSuccess(true)
    } catch {
      setSubmitError("Не удалось отправить запрос. Попробуйте ещё раз.")
    }
  }

  if (isSuccess) {
    return (
      <div
        className={
          isCartMode
            ? "surface-card mt-5 p-5"
            : "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-soft)] p-5"
        }
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
          <div>
            <h3 className="text-base font-semibold">
              Запрос успешно отправлен
            </h3>
            <p className="mt-2 text-sm leading-6 muted-text">
              Мы получили ваши контактные данные
              {isCartMode ? " и выбранные позиции" : ""}. Дальше с вами
              свяжутся по коммерческому предложению.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isCartMode && items.length === 0) {
    return (
      <div className="surface-card mt-5 p-5">
        <h3 className="text-base font-semibold">Добавьте позиции в запрос</h3>
        <p className="mt-2 text-sm leading-6 muted-text">
          После выбора товаров здесь появится форма для отправки коммерческого
          предложения.
        </p>
      </div>
    )
  }

  return (
    <div className={isCartMode ? "mt-5" : ""}>
      <div className="mb-4">
        <h3 className="text-base font-semibold">Контактные данные</h3>
        <p className="mt-1 text-sm muted-text">
          {isCartMode
            ? "Отправим запрос вместе с выбранными позициями."
            : "Опишите задачу, позицию или расходные материалы, которые нужно подобрать."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("fullName")}
            type="text"
            placeholder="ФИО"
          />
          {errors.fullName ? (
            <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <Input
            {...register("company")}
            type="text"
            placeholder="Компания"
          />
          {errors.company ? (
            <p className="mt-2 text-sm text-red-600">{errors.company.message}</p>
          ) : null}
        </div>

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          {errors.email ? (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <Input
            {...register("phone")}
            type="text"
            placeholder="Телефон"
          />
          {errors.phone ? (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <Textarea
            {...register("comment")}
            placeholder={
              isCartMode
                ? "Комментарий к запросу"
                : "Что нужно подобрать или уточнить"
            }
          />
          {errors.comment ? (
            <p className="mt-2 text-sm text-red-600">{errors.comment.message}</p>
          ) : null}
        </div>

        {submitError ? (
          <p className="text-sm text-red-600">{submitError}</p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Отправка..."
            : isCartMode
              ? "Запросить КП"
              : "Отправить запрос"}
        </Button>
      </form>
    </div>
  )
}
