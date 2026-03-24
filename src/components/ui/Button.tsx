import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react"
import clsx from "clsx"

type ButtonVariant = "primary" | "secondary"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  asChild?: boolean
}

export default function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const buttonClassName = clsx(
    "ui-button",
    variant === "primary" ? "ui-button-primary" : "ui-button-secondary",
    className
  )

  if (asChild) {
    if (!isValidElement(children)) {
      return null
    }

    const child = children as ReactElement<{ className?: string }>

    return cloneElement(child, {
      ...props,
      className: clsx(buttonClassName, child.props.className),
    })
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  )
}