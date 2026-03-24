"use client"

import { Input } from "@/components/ui/Input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Поиск по названию, бренду или артикулу",
}: SearchBarProps) {
  return (
    <div className="w-full">
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}