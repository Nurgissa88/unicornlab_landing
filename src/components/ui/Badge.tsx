import type { HTMLAttributes, ReactNode } from "react"
import clsx from "clsx"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  className?: string
}

export default function Badge({
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={clsx("ui-badge", className)} {...props}>
      {children}
    </span>
  )
}