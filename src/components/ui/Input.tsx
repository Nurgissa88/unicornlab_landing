import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import clsx from "clsx"

interface BaseProps {
  className?: string
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export function Input({ className, ...props }: InputProps) {
  return <input className={clsx("ui-input", className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={clsx("ui-input ui-textarea", className)} {...props} />
}