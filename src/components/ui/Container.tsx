import type { ReactNode } from "react"
import clsx from "clsx"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={clsx("app-container", className)}>{children}</div>
}