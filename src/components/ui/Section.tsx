import type { ElementType, ReactNode } from "react"
import clsx from "clsx"

import Container from "@/components/ui/Container"

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  as?: ElementType
  id?: string
}

export default function Section({
  children,
  className,
  containerClassName,
  as: Component = "section",
  id,
}: SectionProps) {
  return (
    <Component id={id} className={clsx("section-shell", className)}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  )
}